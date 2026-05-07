import logoCondoHubySrc from "@/assets/midia-kit/brand/logo-condohuby.svg";
import logoSindicoLabSrc from "@/assets/midia-kit/brand/logo-sindicolab.svg";
import patternHubySrc from "@/assets/midia-kit/brand/pattern-huby.svg";

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const LogoCondoHuby = (props: ImgProps) => (
  <img src={logoCondoHubySrc} alt="CondoHuby" {...props} />
);
export const LogoSindicoLab = (props: ImgProps) => (
  <img src={logoSindicoLabSrc} alt="SíndicoLab" {...props} />
);
export const PatternHuby = (props: ImgProps) => (
  <img src={patternHubySrc} alt="" aria-hidden {...props} />
);
