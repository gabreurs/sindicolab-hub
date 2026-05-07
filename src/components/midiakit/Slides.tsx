import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { DeckSlide, item, itemFade, itemScale } from "./DeckSlide";
import { LogoCondoHuby, LogoSindicoLab, PatternHuby } from "./Brand";
import { SlideCTA } from "./SlideCTA";
import { CONTACTS, waLink, mediaKitUrl } from "@/lib/midia-kit";

import imgWorkshopIA from "@/assets/midia-kit/img-workshop-ia.jpg";
import imgKart from "@/assets/midia-kit/img-kart.jpg";
import imgTematicos from "@/assets/midia-kit/img-tematicos.jpg";
import imgCurso from "@/assets/midia-kit/img-curso.jpg";
import imgVegas from "@/assets/midia-kit/img-vegas.jpg";
import imgVoz from "@/assets/midia-kit/img-voz-setor.jpg";

const TOTAL = 10;

/* 01 — HERO */
export const SlideHero = () => (
  <DeckSlide id="s1" index={1} total={TOTAL} tone="dark">
    <PatternHuby className="pointer-events-none absolute -right-24 -top-16 hidden h-[420px] w-auto opacity-[0.07] md:block md:-right-20 md:h-[640px]" />
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center pt-28 pb-10 md:pt-32 md:pb-20">
      <motion.div variants={itemFade} className="flex items-center gap-4">
        <LogoSindicoLab className="h-5 w-auto md:h-6" />
        <span className="opacity-30">×</span>
        <LogoCondoHuby className="h-5 w-auto md:h-6" />
      </motion.div>
      <div className="mt-8 grid gap-10 lg:mt-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="lg:col-span-8">
          <motion.p variants={item} className="font-mono text-[11px] tracking-tight opacity-55">
            — Mídia kit · Patrocínio
          </motion.p>
          <motion.h1
            variants={item}
            className="mt-7 max-w-[18ch] text-[clamp(1.9rem,3.8vw,3.4rem)] mk-display"
          >
            Sua marca próxima dos <span className="mk-text-lav">decisores</span> do mercado condominial.
          </motion.h1>
          <motion.p variants={item} className="mt-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            Patrocine experiências presenciais que conectam empresas, síndicos, gestores e profissionais
            do setor em momentos de conteúdo, relacionamento e confiança.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <a href={waLink(CONTACTS[0].whatsapp)} target="_blank" rel="noreferrer" className="mk-btn-solid">
              Quero patrocinar
            </a>
            <a href="#s5" className="mk-btn-ghost">Ver formatos</a>
          </motion.div>
          <motion.ul variants={item} className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm opacity-65">
            {["Workshops", "Cursos", "Experiências", "Networking"].map((c, i) => (
              <li key={c} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-current opacity-50" />}
                {c}
              </li>
            ))}
          </motion.ul>
        </div>
        <motion.div variants={itemScale} className="relative hidden lg:col-span-4 lg:block">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[340px] overflow-hidden rounded-[24px] border border-white/10 bg-[hsl(var(--mk-purple))]/30 p-7 backdrop-blur-sm">
            <p className="font-mono text-[10px] tracking-tight opacity-60">Agenda 2025</p>
            <div className="mt-6 space-y-5">
              {[["+100","síndicos por workshop"],["12+","encontros por ano"],["05","formatos de patrocínio"]].map(([k,v]) => (
                <div key={k} className="border-t border-white/10 pt-4">
                  <p className="text-3xl font-medium tracking-tight">{k}</p>
                  <p className="mt-1 text-xs opacity-65">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
    <motion.div variants={itemFade} className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 opacity-55 md:flex">
      <span className="font-mono text-[10px] tracking-tight">Role para começar</span>
      <ArrowDown className="h-4 w-4" />
    </motion.div>
  </DeckSlide>
);

/* 02 — CONTEXTO */
export const SlideContext = () => (
  <DeckSlide id="s2" index={2} total={TOTAL} tone="light">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <motion.p variants={item} className="font-mono text-[11px] tracking-tight text-[hsl(var(--mk-muted))]">— 02 · Contexto</motion.p>
      <motion.h2 variants={item} className="mt-7 max-w-4xl text-[clamp(1.6rem,3.2vw,2.6rem)] mk-display">
        O mercado condominial é movido por <span className="mk-text-purple">confiança.</span>
      </motion.h2>
      <motion.p variants={item} className="mt-8 max-w-2xl text-base leading-relaxed text-[hsl(var(--mk-muted))] md:text-xl">
        Síndicos, gestores e administradoras não decidem apenas por anúncio. Eles decidem por
        repertório, indicação, presença e relacionamento.
      </motion.p>
      <motion.div variants={item} className="mt-12 grid gap-6 border-t border-[hsl(var(--mk-line))] pt-10 md:mt-14 md:grid-cols-12 md:gap-10">
        <p className="font-mono text-[11px] tracking-tight text-[hsl(var(--mk-muted))] md:col-span-3">A diferença</p>
        <p className="text-lg leading-relaxed md:col-span-9 md:text-2xl">
          Aqui, sua marca não disputa atenção em um feed.{" "}
          <span className="mk-text-purple">Ela participa de uma conversa real.</span>
        </p>
      </motion.div>
    </div>
  </DeckSlide>
);

/* 03 — INICIATIVA */
export const SlideInitiative = () => (
  <DeckSlide id="s3" index={3} total={TOTAL} tone="lavender">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <motion.p variants={item} className="font-mono text-[11px] tracking-tight mk-text-purple">— 03 · A iniciativa</motion.p>
          <motion.h2 variants={item} className="mt-7 text-[clamp(1.5rem,2.9vw,2.3rem)] mk-display">
            Uma agenda de experiências para aproximar marcas e o setor.
          </motion.h2>
          <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
            O CondoHuby reúne workshops, cursos, encontros exclusivos e experiências presenciais
            para criar pontos de contato reais entre marcas, síndicos e gestores condominiais.
          </motion.p>
          <motion.div variants={item} className="mt-8"><SlideCTA href="#s5">Conhecer formatos</SlideCTA></motion.div>
        </div>
        <div className="lg:col-span-5">
          <ul className="grid gap-2.5">
            {[["Conteúdo técnico","Aprofundamento e atualização"],["Relacionamento presencial","Conversas em ambiente curado"],["Experiências externas","Convivência fora do trabalho"],["Networking qualificado","Decisores no mesmo lugar"]].map(([t,d],i) => (
              <motion.li key={t} variants={item} custom={i} className="flex items-start gap-5 border-t border-[hsl(var(--mk-fg))]/10 py-4 last:border-b">
                <span className="font-mono text-[10px] tracking-tight text-[hsl(var(--mk-muted))] pt-1">0{i+1}</span>
                <div>
                  <p className="text-base font-medium">{t}</p>
                  <p className="mt-0.5 text-sm text-[hsl(var(--mk-muted))]">{d}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </DeckSlide>
);

/* 04 — PÚBLICO */
const AUDIENCE = ["Síndicos profissionais","Síndicos moradores","Gestores condominiais","Administradoras","Prestadores estratégicos","Profissionais do setor"];
export const SlideAudience = () => (
  <DeckSlide id="s4" index={4} total={TOTAL} tone="light">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <motion.p variants={item} className="font-mono text-[11px] tracking-tight text-[hsl(var(--mk-muted))]">— 04 · Público</motion.p>
      <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end md:gap-12">
        <motion.h2 variants={item} className="text-[clamp(1.6rem,3vw,2.5rem)] mk-display md:col-span-7">Quem sua marca alcança</motion.h2>
        <motion.p variants={item} className="text-base leading-relaxed text-[hsl(var(--mk-muted))] md:col-span-5">
          Profissionais conectados à rotina, operação e tomada de decisão em condomínios.
        </motion.p>
      </div>
      <motion.div variants={item} className="mt-10 flex flex-wrap gap-2.5 md:mt-14">
        {AUDIENCE.map((a,i) => (
          <motion.span key={a} variants={item} custom={i} className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--mk-fg))]/15 bg-[hsl(var(--mk-bg))] px-4 py-2 text-sm transition-colors hover:border-[hsl(var(--mk-fg))]/40 hover:bg-[hsl(var(--mk-lavender))] md:px-5 md:py-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--mk-purple))]" />{a}
          </motion.span>
        ))}
      </motion.div>
      <motion.div variants={item} className="mt-12 grid gap-6 border-t border-[hsl(var(--mk-line))] pt-10 md:mt-16 md:grid-cols-12 md:gap-10">
        <p className="font-mono text-[11px] tracking-tight text-[hsl(var(--mk-muted))] md:col-span-3">Em uma frase</p>
        <p className="text-lg leading-relaxed md:col-span-9 md:text-2xl">
          Não é audiência fria. <span className="mk-text-purple">É relacionamento em contexto.</span>
        </p>
      </motion.div>
    </div>
  </DeckSlide>
);

/* 05 — FORMATOS */
const FORMATS = ["Workshops de IA","Experiências externas","Workshops temáticos","Curso Premium Síndicos Elite","Uma Noite em Las Vegas"];
export const SlideFormats = () => (
  <DeckSlide id="s5" index={5} total={TOTAL} tone="dark">
    <PatternHuby className="pointer-events-none absolute -left-16 bottom-10 hidden h-[280px] w-auto opacity-[0.06] md:block md:-left-10 md:h-[460px]" />
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <motion.p variants={item} className="font-mono text-[11px] tracking-tight opacity-55">— 05 · Formatos</motion.p>
      <motion.h2 variants={item} className="mt-7 max-w-4xl text-[clamp(1.6rem,3vw,2.5rem)] mk-display">Formatos para sua marca participar</motion.h2>
      <motion.p variants={item} className="mt-5 max-w-2xl text-base leading-relaxed opacity-65 md:text-lg">
        Da capacitação técnica às experiências externas, cada formato cria um tipo diferente de
        presença e aproximação com o público condominial.
      </motion.p>
      <ul className="mt-10 divide-y divide-white/10 border-y border-white/10 md:mt-12">
        {FORMATS.map((f,i) => (
          <motion.li key={f} variants={item} custom={i} className="group flex items-center gap-5 py-4 transition-colors md:gap-10 md:py-6">
            <span className="font-mono text-xs opacity-45 md:text-sm">{String(i+1).padStart(2,"0")}</span>
            <span className="text-base font-medium transition-colors group-hover:mk-text-lav md:text-2xl">{f}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div variants={item} className="mt-8 md:mt-10"><SlideCTA href="#s6" variant="ghost-dark">Ver oportunidades</SlideCTA></motion.div>
    </div>
  </DeckSlide>
);

/* 06 — Capacitação */
const TECHNICAL = [
  { n:"01", title:"Workshops de IA", desc:"Encontros intimistas com até 8 síndicos em 3h sobre IA, produtividade e aplicação prática na gestão condominial.", img:imgWorkshopIA },
  { n:"03", title:"Workshops temáticos", desc:"Encontros para até 100 síndicos sobre carros elétricos, NR-01, economia de água e energia.", img:imgTematicos },
  { n:"04", title:"Curso Premium Síndicos Elite", desc:"Curso anual para até 100 síndicos com grandes referências da sindicatura profissional.", img:imgCurso },
];
export const SlideTechnical = () => (
  <DeckSlide id="s6" index={6} total={TOTAL} tone="light">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <motion.p variants={item} className="font-mono text-[11px] tracking-tight text-[hsl(var(--mk-muted))]">— 06 · Capacitação</motion.p>
      <motion.h2 variants={item} className="mt-7 max-w-3xl text-[clamp(1.5rem,2.8vw,2.2rem)] mk-display">
        Capacitação, conteúdo e <span className="mk-text-purple">autoridade</span>.
      </motion.h2>
      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3">
        {TECHNICAL.map((c,i) => (
          <motion.article key={c.title} variants={item} custom={i} className="group flex flex-col overflow-hidden rounded-2xl bg-white transition-all duration-500 hover:shadow-[0_24px_48px_-28px_hsl(var(--mk-fg)/0.18)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-[hsl(var(--mk-lavender))]">
              <img src={c.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <p className="font-mono text-[10px] tracking-tight text-[hsl(var(--mk-muted))]">{c.n}</p>
              <h3 className="mt-2 text-lg font-medium leading-snug md:text-xl">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[hsl(var(--mk-muted))]">{c.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div variants={item} className="mt-8 md:mt-10">
        <SlideCTA href={waLink(CONTACTS[0].whatsapp,"Olá! Quero patrocinar as capacitações CondoHuby.")}>Patrocinar capacitações</SlideCTA>
      </motion.div>
    </div>
  </DeckSlide>
);

/* 07 — Experiências */
export const SlideExperiences = () => (
  <DeckSlide id="s7" index={7} total={TOTAL} tone="lavender">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <motion.p variants={item} className="font-mono text-[11px] tracking-tight mk-text-purple">— 07 · Convivência</motion.p>
      <motion.h2 variants={item} className="mt-7 max-w-4xl text-[clamp(1.5rem,2.9vw,2.3rem)] mk-display">
        Relacionamento fora do ambiente tradicional.
      </motion.h2>
      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
        {[
          { n:"02", title:"Experiências externas", desc:"Tiro, kart e paintball com grupos de até 20 síndicos em momentos de convivência fora do ambiente corporativo.", img:imgKart },
          { n:"05", title:"Uma Noite em Las Vegas", desc:"Evento especial e não recorrente para até 70 síndicos em uma experiência temática de lazer e relacionamento.", img:imgVegas },
        ].map((c,i) => (
          <motion.article key={c.title} variants={item} custom={i} className="group overflow-hidden rounded-3xl bg-[hsl(var(--mk-bg))]">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={c.img} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            </div>
            <div className="p-5 md:p-6">
              <p className="font-mono text-[10px] tracking-tight text-[hsl(var(--mk-muted))]">{c.n}</p>
              <h3 className="mt-2 text-xl font-medium md:text-2xl">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--mk-muted))]">{c.desc}</p>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div variants={item} className="mt-8 flex flex-wrap items-center justify-between gap-5 md:mt-10 md:gap-6">
        <p className="max-w-md text-base opacity-70 md:text-lg">
          <span className="mk-text-purple">Ambientes mais leves</span> criam conversas mais naturais.
        </p>
        <SlideCTA href={waLink(CONTACTS[0].whatsapp,"Olá! Quero patrocinar as experiências CondoHuby.")}>Patrocinar experiências</SlideCTA>
      </motion.div>
    </div>
  </DeckSlide>
);

/* 08 — Valor */
const BENEFITS = ["Associação com inovação","Contato direto com decisores","Fortalecimento institucional","Presença em momentos de alta atenção","Relacionamento com público segmentado","Oportunidade de novos negócios"];
export const SlideValue = () => (
  <DeckSlide id="s8" index={8} total={TOTAL} tone="light">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <motion.p variants={item} className="font-mono text-[11px] tracking-tight text-[hsl(var(--mk-muted))]">— 08 · Valor</motion.p>
          <motion.h2 variants={item} className="mt-7 text-[clamp(1.5rem,2.8vw,2.2rem)] mk-display">
            Presença que vira <span className="mk-text-purple">relacionamento.</span>
          </motion.h2>
          <motion.p variants={item} className="mt-6 max-w-md text-base leading-relaxed text-[hsl(var(--mk-muted))]">
            Patrocinar uma experiência CondoHuby é inserir sua marca em momentos de atenção
            qualificada, onde conversas, indicações e novas conexões acontecem naturalmente.
          </motion.p>
          <motion.div variants={item} className="mt-8 hidden overflow-hidden rounded-2xl lg:block">
            <img src={imgVoz} alt="Sua voz liderando as conversas do setor" className="h-56 w-full object-cover" loading="lazy" />
          </motion.div>
        </div>
        <ul className="lg:col-span-7">
          {BENEFITS.map((b,i) => (
            <motion.li key={b} variants={item} custom={i} className="group flex items-baseline gap-5 border-t border-[hsl(var(--mk-line))] py-4 last:border-b md:gap-6 md:py-6">
              <span className="font-mono text-xs text-[hsl(var(--mk-muted))] md:text-sm">{String(i+1).padStart(2,"0")}</span>
              <span className="flex-1 text-base font-medium transition-colors group-hover:mk-text-purple md:text-xl">{b}</span>
            </motion.li>
          ))}
          <motion.div variants={item} className="mt-8"><SlideCTA href="#s10">Falar com a equipe</SlideCTA></motion.div>
        </ul>
      </div>
    </div>
  </DeckSlide>
);

/* 09 — Ativações */
const ACTIVATIONS: [string,string][] = [
  ["Exposição de marca","Logo em materiais, comunicação visual e divulgação."],
  ["Fala institucional","Apresentação breve ou participação contextualizada no encontro."],
  ["Relacionamento presencial","Contato direto com síndicos e gestores em coffee, intervalos e networking."],
  ["Materiais e brindes","Distribuição de materiais, folders, brindes e experiências de marca."],
  ["Conteúdo patrocinado","Participação em temas estratégicos relacionados à solução da marca."],
  ["Presença digital","Divulgação em canais digitais, página do evento e materiais de apoio."],
];
export const SlideActivations = () => (
  <DeckSlide id="s9" index={9} total={TOTAL} tone="lavender">
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <motion.p variants={item} className="font-mono text-[11px] tracking-tight mk-text-purple">— 09 · Ativações</motion.p>
      <div className="mt-6 grid gap-8 md:mt-8 md:grid-cols-12 md:items-end md:gap-12">
        <motion.h2 variants={item} className="text-[clamp(1.5rem,2.8vw,2.2rem)] mk-display md:col-span-7">Como sua marca pode aparecer</motion.h2>
        <motion.p variants={item} className="text-base leading-relaxed opacity-70 md:col-span-5">
          As ativações se adaptam ao formato do encontro, criando presença antes, durante e depois.
        </motion.p>
      </div>
      <div className="mt-10 grid gap-px overflow-hidden rounded-2xl bg-[hsl(var(--mk-fg))]/10 md:mt-12 md:grid-cols-3">
        {ACTIVATIONS.map(([t,d],i) => (
          <motion.div key={t} variants={item} custom={i} className="bg-[hsl(var(--mk-bg))] p-5 transition-colors hover:bg-[hsl(var(--mk-lavender))]/60 md:p-6">
            <p className="font-mono text-[10px] tracking-tight text-[hsl(var(--mk-muted))]">{String(i+1).padStart(2,"0")}</p>
            <h3 className="mt-2 text-base font-medium md:text-lg">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--mk-muted))]">{d}</p>
          </motion.div>
        ))}
      </div>
      <motion.div variants={item} className="mt-8 md:mt-10">
        <SlideCTA href={waLink(CONTACTS[0].whatsapp,"Olá! Quero montar uma ativação com o CondoHuby.")}>Montar ativação</SlideCTA>
      </motion.div>
    </div>
  </DeckSlide>
);

/* 10 — Contato */
export const SlideContact = () => (
  <DeckSlide id="s10" index={10} total={TOTAL} tone="dark">
    <PatternHuby className="pointer-events-none absolute -right-20 -bottom-10 hidden h-[320px] w-auto opacity-[0.07] md:block md:-right-10 md:h-[520px]" />
    <div className="mk-container relative z-10 flex flex-1 flex-col justify-center py-16 md:py-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <motion.p variants={item} className="font-mono text-[11px] tracking-tight opacity-55">— 10 · Vamos conversar</motion.p>
          <motion.h2 variants={item} className="mt-7 text-[clamp(1.7rem,3.2vw,2.7rem)] mk-display">
            Vamos encontrar o melhor formato para <span className="mk-text-lav">sua marca.</span>
          </motion.h2>
          <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed opacity-70 md:text-lg">
            Fale com a equipe ou baixe o mídia kit completo para compartilhar internamente.
          </motion.p>
          <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3">
            <a href={waLink(CONTACTS[0].whatsapp)} target="_blank" rel="noreferrer" className="mk-btn-solid">Falar com a equipe</a>
            <a href={mediaKitUrl} target="_blank" rel="noopener noreferrer" className="mk-btn-ghost">
              <Download className="h-4 w-4" /> Baixar Mídia Kit
            </a>
          </motion.div>
        </div>
        <div className="lg:col-span-5">
          <ul className="space-y-3">
            {CONTACTS.map((c) => (
              <li key={c.phone} className="rounded-2xl border border-white/15 p-5">
                <p className="font-mono text-[10px] tracking-tight opacity-60">WhatsApp</p>
                <p className="mt-1 text-lg font-medium">{c.name} {c.surname}</p>
                <p className="text-sm opacity-70">{c.phone}</p>
                <a href={waLink(c.whatsapp)} target="_blank" rel="noreferrer" className="mt-3 inline-flex text-xs underline opacity-80 hover:opacity-100">
                  Abrir conversa →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </DeckSlide>
);
