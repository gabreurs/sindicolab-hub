import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import quero1Img from "@/assets/quero1sindico.jpg";
import cursosImg from "@/assets/cursos.jpg";
import materiaisImg from "@/assets/materiais.jpg";
import ecoImg from "@/assets/ecosystem.jpg";

type Bloco = {
  eyebrow: string; title: string; desc: string; cta: string; href: string; img: string; accent?: boolean;
};

const blocos: Bloco[] = [
  {
    eyebrow: "Decisão",
    title: "Quero1Síndico conecta decisão e escolha.",
    desc: "Ajuda moradores e conselheiros a conhecer síndicos profissionais antes da assembleia — com clareza, contexto e comparação real.",
    cta: "Visitar Quero1Síndico",
    href: "https://quero1sindico.com/",
    img: quero1Img,
    accent: true,
  },
  {
    eyebrow: "Formação",
    title: "Cursos fortalecem o mercado.",
    desc: "A formação aumenta autoridade, relacionamento e repertório do ecossistema. Quem aprende, decide melhor — e atende melhor.",
    cta: "Explorar cursos",
    href: "https://sindicolab.com/play/",
    img: cursosImg,
  },
  {
    eyebrow: "Jornada",
    title: "Materiais ampliam a jornada.",
    desc: "Funcionam como porta de entrada, nutrição e apoio. Cada material é um passo a mais dentro do ecossistema SíndicoLab.",
    cta: "Baixar materiais",
    href: "https://downloads.sindicolab.com/",
    img: materiaisImg,
  },
  {
    eyebrow: "Plataforma",
    title: "O canal SíndicoLab organiza tudo.",
    desc: "O site deixa de ser institucional e vira uma plataforma de navegação entre produtos, conteúdos e oportunidades reais do mercado.",
    cta: "Conhecer o canal",
    href: "https://sindicolab.com/",
    img: ecoImg,
  },
];

export function Blocos() {
  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container-x flex flex-col gap-16 md:gap-28">
        {blocos.map((b, i) => (
          <Reveal key={b.title}>
            <div className={`grid lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
              i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
            }`}>
              <div className="lg:col-span-7">
                <motion.div
                  initial={{ scale: 1.06 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lift"
                >
                  <img
                    src={b.img}
                    alt={b.title}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {b.accent && (
                    <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full bg-brand text-brand-foreground text-xs font-semibold uppercase tracking-wider">
                      Produto principal
                    </div>
                  )}
                </motion.div>
              </div>
              <div className="lg:col-span-5">
                <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold">
                  {b.eyebrow}
                </div>
                <h3 className="mt-3 font-display text-3xl md:text-5xl text-ink leading-[1.05] text-balance">
                  {b.title}
                </h3>
                <p className="mt-5 text-ink-soft text-lg max-w-lg">{b.desc}</p>
                <a
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-background font-medium hover:bg-brand transition-colors"
                >
                  {b.cta}
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
