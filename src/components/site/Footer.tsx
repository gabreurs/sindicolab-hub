import { Heart, ArrowUpRight } from "lucide-react";
import { InstagramIcon as Instagram, YoutubeIcon as Youtube, LinkedinIcon as Linkedin } from "@/components/icons/SocialIcons";
import { Link } from "@tanstack/react-router";
import { BrandMark } from "./BrandMark";
import marqoLogo from "@/assets/logo-marqo.svg";
import { EXTERNAL_LINKS, whatsappRafaelUrl } from "@/config/external-links";



const cols = [
  {
    label: "SíndicoLab",
    items: [
      { label: "Quem somos", href: "/quem-somos" },
      { label: "Portal", href: "/portal" },
      { label: "Academy", href: "/academy" },
      { label: "Materiais", href: "/materiais" },
      { label: "Eventos", href: "/eventos" },
      { label: "Patrocínios", href: "/patrocinios" },
      { label: "Contato", href: "mailto:contato@sindicolab.com", external: true },
    ],
  },
  {
    label: "Quero1Síndico",
    items: [
      { label: "Encontrar síndico profissional", href: "https://quero1sindico.com/", external: true },
      { label: "Como funciona", href: "https://quero1sindico.com/como-funciona", external: true },
      { label: "Cadastrar síndico", href: "https://quero1sindico.com/cadastro", external: true },
      { label: "Para condomínios", href: "https://quero1sindico.com/", external: true },
      { label: "Para conselheiros", href: "https://quero1sindico.com/", external: true },
    ],
  },
  {
    label: "Portal",
    items: [
      { label: "Gestão condominial", href: "/portal#gestao" },
      { label: "Segurança condominial", href: "/portal#seguranca" },
      { label: "Tecnologia", href: "/portal#tecnologia" },
      { label: "Jurídico", href: "/portal#juridico" },
      { label: "ESG condominial", href: "/portal#esg" },
      { label: "Equipe condominial", href: "/portal#equipe" },
    ],
  },
  {
    label: "Materiais",
    items: [
      { label: "Modelos de documentos", href: "/materiais" },
      { label: "Checklists", href: "/materiais" },
      { label: "Guias para síndicos", href: "/materiais" },
      { label: "Materiais para assembleia", href: "/materiais" },
      { label: "Downloads gratuitos", href: "/materiais" },
    ],
  },
  {
    label: "Cursos",
    items: [
      { label: "SíndicoLab Academy", href: "/academy" },
      { label: "Cursos para síndicos", href: "/academy" },
      { label: "Treinamento para equipe", href: "/academy" },
      { label: "Inteligência condominial", href: "/academy" },
    ],
  },
  {
    label: "Relacionamento",
    items: [
      { label: "Patrocinar experiências", href: "/patrocinios" },
      { label: "Baixar mídia kit", href: "/patrocinios" },
      { label: "Falar com a equipe", href: "mailto:contato@sindicolab.com", external: true },
      { label: "WhatsApp", href: whatsappRafaelUrl(), external: true },
      { label: "Grupo no WhatsApp", href: EXTERNAL_LINKS.WHATSAPP_GROUP, external: true },
      { label: "Instagram", href: EXTERNAL_LINKS.INSTAGRAM, external: true },
      { label: "YouTube", href: EXTERNAL_LINKS.YOUTUBE, external: true },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const result = await captureNewsletterEmail(email);
    setBusy(false);
    if (!result.ok) {
      setError("Digite um e-mail válido para continuar.");
      return;
    }
    // A assinatura é concluída no Substack.
    window.open(result.redirectTo, "_blank", "noopener,noreferrer");
  }

  return (
    <footer id="newsletter" className="relative bg-ink text-background pt-20 md:pt-28 pb-10 overflow-hidden scroll-mt-[var(--header-h)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[60rem] h-[60rem] rounded-full bg-brand/15 blur-3xl pointer-events-none" />

      <div className="container-x relative">
        {/* Newsletter */}
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-background/10">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex"><BrandMark size={32} tone="light" /></Link>
            <h3 className="mt-6 font-display text-3xl md:text-4xl tracking-[-0.03em] leading-[1.05] max-w-md">
              Fique por dentro do mercado condominial.
            </h3>
            <p className="mt-3 text-sm text-background/70 max-w-md leading-relaxed">
              Receba conteúdos, materiais e novidades do SíndicoLab toda semana.
            </p>
          </div>
          <form
            onSubmit={handleSubscribe}
            className="lg:col-span-7 grid sm:grid-cols-5 gap-3 self-end"
          >
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome"
              className="sm:col-span-2 px-4 py-3 rounded-full bg-background/10 border border-background/15 text-sm placeholder:text-background/45 focus:outline-none focus:border-cyan transition"
            />
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu e-mail"
              className="sm:col-span-2 px-4 py-3 rounded-full bg-background/10 border border-background/15 text-sm placeholder:text-background/45 focus:outline-none focus:border-cyan transition"
            />
            <button type="submit" className="btn-primary justify-center" style={{ background: "oklch(0.78 0.14 220)", color: "var(--ink)" }}>
              {busy ? "Abrindo…" : "Assinar newsletter"}
            </button>
            {error && (
              <p role="alert" className="sm:col-span-5 -mt-1 px-4 text-xs text-red-300">
                {error}
              </p>
            )}
            <p className="sm:col-span-5 px-4 text-[11px] leading-relaxed text-background/45">
              A confirmação da assinatura acontece no Substack do SíndicoLab.
            </p>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 md:gap-8 pt-14">
          {cols.map((c) => (
            <div key={c.label}>
              <div className="text-[11px] tracking-tight text-background/45 mb-4">
                {c.label}
              </div>
              <ul className="space-y-2.5 text-sm">
                {c.items.map((it) => (
                  <li key={it.label}>
                    {it.external ? (
                      <a href={it.href} target={it.href.startsWith("mailto:") ? undefined : "_blank"} rel="noreferrer" className="text-background/75 hover:text-cyan transition-colors inline-flex items-center gap-1">
                        {it.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-0.5 group-hover:opacity-100 transition" />
                      </a>
                    ) : it.href.includes("#") ? (
                      <a href={it.href} className="text-background/75 hover:text-cyan transition-colors">
                        {it.label}
                      </a>
                    ) : (
                      <Link to={it.href} className="text-background/75 hover:text-cyan transition-colors">
                        {it.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-6 border-t border-background/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-background/55">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {new Date().getFullYear()} SíndicoLab. Todos os direitos reservados.</span>
            <a href="/politica-de-privacidade" className="hover:text-background transition">Privacidade</a>
            <a href="/termos" className="hover:text-background transition">Termos</a>
            <button
              type="button"
              onClick={() => {
                try { window.__sindicoLabReplayIntro?.(); } catch {}
              }}
              className="hover:text-background transition opacity-60 hover:opacity-100"
              aria-label="Reexecutar intro de marca"
            >
              Rever intro
            </button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a href={EXTERNAL_LINKS.INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid place-items-center w-8 h-8 rounded-full border border-background/15 hover:bg-background hover:text-ink transition"><Instagram className="w-3.5 h-3.5" /></a>
              <a href={EXTERNAL_LINKS.YOUTUBE} target="_blank" rel="noreferrer" aria-label="YouTube" className="grid place-items-center w-8 h-8 rounded-full border border-background/15 hover:bg-background hover:text-ink transition"><Youtube className="w-3.5 h-3.5" /></a>
              <a href="https://linkedin.com/company/sindicolab" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid place-items-center w-8 h-8 rounded-full border border-background/15 hover:bg-background hover:text-ink transition"><Linkedin className="w-3.5 h-3.5" /></a>
            </div>
            <a
              href="https://studiomarqo.com.br"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-background transition-colors"
            >
              Feito com
              <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500 group-hover:scale-110 transition-transform" />
              por <img src={marqoLogo} alt="Studio Marqo" className="h-3.5 w-auto opacity-80 group-hover:opacity-100 transition" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
