/**
 * Sponsors — grade estável de logos reais dos parceiros/apoiadores.
 * Mantém o título original; substitui placeholders por assets oficiais.
 */
import atlasLogo from "@/assets/parceiros/atlas-schindler.png.asset.json";
import bbzLogo from "@/assets/parceiros/bbz.png.asset.json";
import condohubyLogo from "@/assets/parceiros/condohuby.png.asset.json";
import focusLogo from "@/assets/parceiros/focus-media.png.asset.json";
import mlgLogo from "@/assets/parceiros/mlg.png.asset.json";
import damasLogo from "@/assets/parceiros/damas-reis-limpeza.jpeg.asset.json";

type Partner = {
  name: string;
  src: string;
  /** fundo neutro para logos com brancos/pretos internos que sumiriam */
  tone?: "light" | "dark";
};

const partners: Partner[] = [
  { name: "Atlas Schindler", src: atlasLogo.url, tone: "dark" },
  { name: "BBZ", src: bbzLogo.url, tone: "light" },
  { name: "CondoHuby", src: condohubyLogo.url, tone: "dark" },
  { name: "Focus Media", src: focusLogo.url, tone: "light" },
  { name: "MLG Pinturas & Construções", src: mlgLogo.url, tone: "light" },
  { name: "Damas e Reis da Limpeza — Diluidores", src: damasLogo.url, tone: "dark" },
];

export function Sponsors() {
  return (
    <section
      className="py-16 md:py-28 border-y border-border/70 bg-surface relative overflow-hidden"
      aria-labelledby="sponsors-h"
    >
      <div className="container-x mb-10 md:mb-12 grid md:grid-cols-12 gap-6 items-end">
        <div className="md:col-span-7">
          <p className="text-[12px] text-ink-soft mb-3">Apoiadores e parceiros</p>
          <h2
            id="sponsors-h"
            className="font-display text-2xl md:text-4xl text-ink max-w-2xl text-balance tracking-[-0.03em]"
          >
            Marcas que constroem o mercado condominial junto com o SíndicoLab.
          </h2>
        </div>
        <p className="md:col-span-5 text-sm text-ink-soft md:text-right max-w-md md:ml-auto leading-relaxed">
          Administradoras, fornecedores e parceiros institucionais que apoiam o
          ecossistema condominial brasileiro.
        </p>
      </div>

      <div className="container-x">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 items-stretch">
          {partners.map((p) => (
            <li key={p.name}>
              <PartnerTile partner={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PartnerTile({ partner }: { partner: Partner }) {
  const bg =
    partner.tone === "dark"
      ? "bg-[#0f172a]"
      : "bg-background";
  return (
    <div
      className={`group relative flex items-center justify-center h-24 md:h-28 rounded-2xl border border-border ${bg} px-4 py-4 transition-all hover:border-border-strong hover:shadow-card`}
      aria-label={partner.name}
    >
      <img
        src={partner.src}
        alt={partner.name}
        loading="lazy"
        decoding="async"
        className="max-h-full max-w-full w-auto h-auto object-contain"
        style={{ maxHeight: "72%" }}
      />
    </div>
  );
}
