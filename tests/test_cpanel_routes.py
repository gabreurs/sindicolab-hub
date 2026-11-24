"""Run with Apache on PATH: python3 -m unittest discover -s tests."""
import os
from pathlib import Path
import shutil
import socket
import subprocess
import tempfile
import time
import unittest
import urllib.request


class CpanelRoutesTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        executable = shutil.which("httpd")
        if not executable:
            raise RuntimeError("Apache httpd must be on PATH to run this integration test")
        cls.temp = tempfile.TemporaryDirectory(prefix="cpanel-routes-")
        root = Path(cls.temp.name)
        root.chmod(0o755)
        cls.web = root / "public_html"
        cls.web.mkdir()
        (cls.web / "portal").mkdir()
        (cls.web / "index.html").write_text("SINDICOLAB_SPA")
        (cls.web / "portal" / "cover.jpg").write_bytes(b"REAL_COVER")
        shutil.copyfile(Path(__file__).resolve().parents[1] / "public/.htaccess", cls.web / ".htaccess")
        with socket.socket() as sock:
            sock.bind(("127.0.0.1", 0))
            cls.port = sock.getsockname()[1]
        apache = Path(executable).resolve().parents[1]
        modules = ["mpm_event", "unixd", "authz_core", "dir", "rewrite", "mime"]
        config = root / "httpd.conf"
        config.write_text(f'ServerRoot "{apache}"\n' +
            "\n".join(f'LoadModule {m}_module "{apache}/modules/mod_{m}.so"' for m in modules) +
            f'\nListen 127.0.0.1:{cls.port}\nServerName localhost\n' +
            ("User #65534\nGroup #65534\n" if os.geteuid() == 0 else "") +
            f'PidFile "{root}/httpd.pid"\nErrorLog "{root}/error.log"\n' +
            f'DocumentRoot "{cls.web}"\n<Directory "{cls.web}">\nAllowOverride All\nRequire all granted\n</Directory>\n')
        cls.server = subprocess.Popen([executable, "-f", str(config), "-DFOREGROUND"], stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        for _ in range(100):
            try:
                with socket.create_connection(("127.0.0.1", cls.port), timeout=.2):
                    return
            except OSError:
                if cls.server.poll() is not None:
                    raise RuntimeError(cls.server.stderr.read().decode())
                time.sleep(.05)
        raise RuntimeError("Apache did not start")

    @classmethod
    def tearDownClass(cls):
        cls.server.terminate()
        cls.server.wait(timeout=10)
        cls.temp.cleanup()

    def get(self, route):
        request = urllib.request.Request(f"http://127.0.0.1:{self.port}{route}", headers={"X-Forwarded-Proto": "https"})
        with urllib.request.urlopen(request) as response:
            return response.status, response.read(), response.url

    def test_portal_without_slash_serves_spa_not_directory(self):
        status, body, url = self.get("/portal")
        self.assertEqual(status, 200)
        self.assertEqual(body, b"SINDICOLAB_SPA")
        self.assertTrue(url.endswith("/portal"))

    def test_portal_with_slash_serves_spa(self):
        self.assertEqual(self.get("/portal/")[:2], (200, b"SINDICOLAB_SPA"))

    def test_real_portal_image_is_preserved(self):
        self.assertEqual(self.get("/portal/cover.jpg")[:2], (200, b"REAL_COVER"))

    def test_other_application_routes_still_work(self):
        for route in ["/", "/admin", "/empresa", "/academy", "/portal/noticia/focus-media"]:
            with self.subTest(route=route):
                self.assertEqual(self.get(route)[:2], (200, b"SINDICOLAB_SPA"))


if __name__ == "__main__":
    unittest.main()