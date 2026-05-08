const LOCK_ATTR = "data-scroll-lock-y";

const activeLocks = new Set<string>();

export function clearNativeScrollLock() {
  const html = document.documentElement;
  const body = document.body;
  const y = Number(body.getAttribute(LOCK_ATTR) ?? "0");

  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  body.style.overflow = "";
  html.style.overscrollBehavior = "";
  html.classList.remove("no-scroll", "lenis-stopped");
  body.classList.remove("no-scroll");
  body.removeAttribute(LOCK_ATTR);

  activeLocks.clear();
  if (y > 0) window.scrollTo(0, y);
}

export function lockNativeScroll(key: string) {
  const body = document.body;
  const html = document.documentElement;

  if (activeLocks.size === 0) {
    const y = window.scrollY;
    body.setAttribute(LOCK_ATTR, String(y));
    body.style.position = "fixed";
    body.style.top = `-${y}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    html.classList.add("no-scroll");
    body.classList.add("no-scroll");
  }

  activeLocks.add(key);
}

export function unlockNativeScroll(key: string) {
  activeLocks.delete(key);
  if (activeLocks.size === 0) clearNativeScrollLock();
}