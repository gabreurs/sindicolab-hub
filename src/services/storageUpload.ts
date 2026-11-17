import { supabase, IS_MOCK_DATA } from "@/integrations/supabase/client";

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result ?? ""));
    r.onerror = () => reject(r.error);
    r.readAsDataURL(file);
  });

/** Envia o arquivo ao Storage e devolve o link público. Sem banco, usa prévia local. */
export async function uploadPublicFile(bucket: "covers" | "materials", file: File): Promise<string> {
  if (IS_MOCK_DATA) return readAsDataUrl(file);
  const ext = (file.name.split(".").pop() || "bin").toLowerCase().replace(/[^a-z0-9]/g, "");
  const path = `${new Date().getFullYear()}/${crypto.randomUUID()}.${ext}`;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storage = (supabase as any).storage;
  const { error } = await storage.from(bucket).upload(path, file, {
    contentType: file.type || undefined,
    upsert: false,
  });
  if (error) throw new Error(error.message || "Falha no envio do arquivo.");
  return storage.from(bucket).getPublicUrl(path).data.publicUrl as string;
}
