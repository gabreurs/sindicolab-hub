/**
 * PORTA DOS ACESSOS DE DEMONSTRAÇÃO.
 *
 * Os acessos de teste da Academy existem só enquanto o banco não está
 * conectado. Em produção eles ficam FECHADOS: a lista não aparece na tela de
 * entrar e o login demo é recusado — ninguém entra na plataforma com uma conta
 * de exemplo em um site publicado.
 *
 * Para demonstrar em um build publicado (apresentação, homologação), gerar o
 * build com VITE_ENABLE_DEMO_ACCESS=true. Sem essa variável, produção fica
 * fechada por padrão.
 */
export const DEMO_ACCESS_ENABLED: boolean =
  import.meta.env.DEV || import.meta.env.VITE_ENABLE_DEMO_ACCESS === "true";

/** Mensagem única exibida quando o acesso ainda não está aberto. */
export const DEMO_ACCESS_CLOSED_MESSAGE =
  "O acesso à Academy será liberado quando as contas reais forem ativadas.";
