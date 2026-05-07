import { motion } from "framer-motion";
import { ArrowUpRight, Building2, GraduationCap, Download, Radio } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "./Reveal";
import quero1Img from "@/assets/quero1sindico.jpg";
import cursosImg from "@/assets/cursos.jpg";
import materiaisImg from "@/assets/materiais.jpg";
import canalImg from "@/assets/canal.jpg";

export function Portas() {
  return (
    <section id="portas" className="py-20 md:py-32 bg-surface">
      <div className="container-x">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                Portas de entrada
              </div>
              <h2 className="mt-3 font-display text-4xl md:text-6xl text-ink leading-[1.05] text-balance">
                Escolha por onde entrar no ecossistema.
              </h2>
            </div>
            <p className="text-ink-soft max-w-sm">
              Quatro frentes complementares. Um único canal organizando tudo.
            </p>
          </div>
        </Reveal>

        {/* Hero card — Quero1Síndico (protagonist) */}
        <Reveal>
          <a
            href="https://quero1sindico.com/"
            target="_blank"
            rel="noreferrer"
            className="group relative block rounded-[2rem] overflow-hidden bg-ink text-background shadow-lift"
          >
            <div className="grid lg:grid-cols-2">
              <div className="relative h-72 lg:h-[520px] overflow-hidden">
                <motion.img
                  src={quero1Img}
                  alt="Quero1Síndico"
                  width={1200}
                  height={1400}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute top-6 left-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand text-brand-foreground text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/90" />
                  Produto principal
                </div>
              </div>

              <div className="p-8 md:p-14 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-background/70 text-sm">
                  <Building2 className="w-4 h-4" /> Quero1Síndico
                </div>
                <h3 className="mt-4 font-display text-4xl md:text-5xl leading-[1.05] text-balance">
                  O produto que transforma{" "}
                  <span className="italic text-brand-soft">interesse em ação</span>.
                </h3>
                <p className="mt-5 text-background/75 text-lg max-w-md">
                  Conecta condomínios, moradores e conselheiros a síndicos profissionais —
                  principalmente em momentos de decisão como assembleias e trocas de gestão.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-brand text-brand-foreground font-medium group-hover:brightness-110 transition">
                    Conhecer o produto
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-background/20 text-background/90 hover:bg-background/10 transition">
                    Como funciona
                  </span>
                </div>
              </div>
            </div>
          </a>
        </Reveal>

        {/* Secondary cards */}
        <Stagger className="grid md:grid-cols-3 gap-5 mt-6">
          <PortaCard
            href="https://sindicolab.com/play/"
            tag="Cursos & Play"
            title="Cursos e conteúdos"
            desc="Formação, repertório e desenvolvimento para síndicos e profissionais do mercado condominial."
            cta="Explorar cursos"
            img={cursosImg}
            icon={<GraduationCap className="w-5 h-5" />}
            id="cursos"
          />
          <PortaCard
            href="https://downloads.sindicolab.com/"
            tag="Materiais"
            title="Materiais e downloads"
            desc="Guias, materiais ricos e conteúdos de apoio para aprofundar o relacionamento com o ecossistema."
            cta="Baixar materiais"
            img={materiaisImg}
            icon={<Download className="w-5 h-5" />}
            id="materiais"
          />
          <PortaCard
            href="https://sindicolab.com/"
            tag="Canal SíndicoLab"
            title="O canal SíndicoLab"
            desc="Conteúdo, autoridade e relacionamento para fortalecer a presença do projeto no mercado condominial."
            cta="Conhecer o canal"
            img={canalImg}
            icon={<Radio className="w-5 h-5" />}
            id="canal"
          />
        </Stagger>
      </div>
    </section>
  );
}

function PortaCard({
  href, tag, title, desc, cta, img, icon, id,
}: {
  href: string; tag: string; title: string; desc: string; cta: string;
  img: string; icon: React.ReactNode; id: string;
}) {
  return (
    <StaggerItem>
      <a
        id={id}
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group relative flex flex-col h-full rounded-3xl overflow-hidden bg-card border border-border hover:border-border-strong shadow-soft hover:shadow-card transition-all duration-500"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={img}
            alt={title}
            width={1200}
            height={900}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/90 backdrop-blur text-ink text-xs font-medium">
            {icon} {tag}
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-display text-2xl text-ink leading-tight">{title}</h3>
          <p className="mt-3 text-ink-soft text-sm flex-1">{desc}</p>
          <div className="mt-5 inline-flex items-center gap-1.5 text-ink font-medium text-sm group-hover:text-brand transition-colors">
            {cta}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </a>
    </StaggerItem>
  );
}
