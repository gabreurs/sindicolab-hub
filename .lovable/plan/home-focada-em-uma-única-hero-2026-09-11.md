# Home focada em uma única hero

## Objetivo
Transformar a página inicial em uma única experiência de alto impacto, clara e leve, mantendo o header atual e apenas o rodapé abaixo da primeira dobra.

## O que será construído
- Uma hero única, responsiva e imersiva, ocupando a área principal da tela sem criar uma grade visual confusa.
- O condomínio como elemento visual central, com profundidade e movimento sutil, sem efeitos pesados que prejudiquem o scroll.
- Título e texto em português com hierarquia forte e leitura imediata.
- Um conjunto compacto de acessos para todos os destinos principais: Newsletter, Portal, Materiais, Cursos, Eventos/Quem Somos, Encontrar Síndico e Patrocínios.
- Destaque claro para a ação principal, com os demais destinos organizados como uma navegação elegante dentro da própria hero.
- Rodapé existente preservado logo após a hero.

## Preservado
- Header atual, busca, menu hambúrguer e mega menu.
- Animação de abertura da marca e busca global.
- Rotas e links existentes.
- Identidade visual, logotipo e tokens do projeto.

## Removido da HOME
- Grade “O que você procura hoje?”.
- Faixa de cursos separada.
- Cards e seções institucionais abaixo da primeira dobra: AccessCards, QuemSomos, ValuePillars e Sponsors.

## Responsividade e desempenho
- Desktop, notebook, tablet e celulares de 320–430px sem sobreposição ou rolagem horizontal.
- Altura baseada em `svh`, com conteúdo adaptável quando a tela for baixa.
- Movimento limitado a transformações leves e compatível com redução de movimento.
- Imagens locais otimizadas e sem filtros de alto custo.

## Validação
- Conferir visualmente em 1920×1080, 1366×768, 768px e 375px.
- Testar todos os acessos, busca, menu, newsletter e scroll até o rodapé.
- Gerar build de produção após a validação.
