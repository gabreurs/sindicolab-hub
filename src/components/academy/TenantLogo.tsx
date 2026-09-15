import { useTenant } from "@/lib/tenant/TenantProvider";
import { useTheme } from "@/lib/theme/ThemeProvider";
import { BrandMark } from "@/components/site/BrandMark";

/**
 * Marca da organização na Academy.
 *
 * SíndicoLab (tenant plataforma) usa SEMPRE o logotipo oficial do site — nunca
 * placeholder, nunca bolinha, nunca só o nome. Outros tenants usam o logo
 * cadastrado em `organization_branding`; a variante é escolhida pela SUPERFÍCIE
 * (`onDark` força leitura em fundo escuro), caso contrário seguimos o tema
 * resolvido. Nunca recolorimos o asset: se a variante necessária não existe,
 * usamos a outra sobre uma placa neutra. O fallback genérico existe apenas para
 * organizações que ainda não configuraram marca.
 */
export function TenantLogo({ className = "", onDark = false }: { className?: string; onDark?: boolean }) {
  const { tenant } = useTenant();
  const { resolved } = useTheme();
  const name = tenant?.organization?.name ?? "SíndicoLab";
  const darkSurface = onDark || resolved === "dark";

  // Tenant plataforma → identidade SíndicoLab, sempre.
  if (!tenant || tenant.organization.is_platform || tenant.organization.slug === "sindicolab") {
    return (
      <BrandMark
        size={26}
        variant={darkSurface ? "white-blue" : "black-blue"}
        className={className}
      />
    );
  }

  const forDark = tenant.branding?.logo_dark_url;
  const forLight = tenant.branding?.logo_light_url;
  const preferred = darkSurface ? forDark : forLight;
  const fallback = darkSurface ? forLight : forDark;

  if (preferred) return <img src={preferred} alt={name} className={`h-7 w-auto max-w-[120px] object-contain sm:max-w-[180px] ${className}`} />;
  if (fallback) {
    return (
      <span
        className="inline-flex items-center rounded-lg px-2.5 py-1.5"
        style={{ background: darkSurface ? "#FFFFFF" : "#101014" }}
      >
        <img src={fallback} alt={name} className={`h-5 w-auto max-w-[112px] object-contain sm:max-w-[170px] ${className}`} />
      </span>
    );
  }
  return (
    <span className="inline-flex min-w-0 items-center gap-2">
      <span className="h-6 w-6 rounded-md" style={{ background: "var(--tenant-accent)" }} aria-hidden />
      <span className="max-w-[96px] truncate font-display text-[17px] leading-none sm:max-w-[160px]" style={{ color: "var(--ax-text)", letterSpacing: "-0.03em" }}>
        {name}
      </span>
    </span>
  );
}
