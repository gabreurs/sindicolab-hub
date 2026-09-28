# Identidade completa dos tenants

## Resultado
- O administrador envia logos, favicon e banner pelo próprio painel, sem precisar descobrir ou colar links.
- Cada Academy controla fundo, superfícies, textos, destaque, fontes e versões clara/escura.
- O painel `/empresa` usa a marca do tenant atual; o `/admin` global continua SíndicoLab.
- O tema escolhido acompanha o usuário entre Academy e `/empresa`, em celular e computador.

## Implementação
1. Trocar os campos de endereço de imagem por áreas de upload com prévia, progresso, troca e remoção, usando o armazenamento `brand` já existente.
2. Exibir “Inherit (padrão da plataforma)” com clareza; liberar a lista ampliada de fontes somente quando o tenant for a CASA.
3. Corrigir a persistência do modo claro, escuro ou automático e manter o seletor acessível no cabeçalho da Academy, inclusive para usuários logados e no celular.
4. Fazer o `/empresa` receber logo, tipografia e paleta do tenant, sem contaminar o console global `/admin`.
5. Remover o traço inferior dos cabeçalhos e garantir que superfícies derivadas mantenham contraste conforme a cor de fundo escolhida.
6. Atualizar a CASA para amarelo `#FFCD00`, grafite `#1D1D1B` e branco `#FFFFFF`, mantendo variantes legíveis nos dois temas.
7. Atualizar o SQL incremental da CASA e validar Academy e `/empresa` em desktop e celular.

## Detalhes técnicos
- Os arquivos serão enviados ao bucket público `brand`, separados pela organização e pelo tipo de imagem.
- As fontes continuarão limitadas a uma lista segura; nenhuma folha de estilo arbitrária será aceita.
- A preferência visual continuará no navegador do usuário e será restaurada ao abrir qualquer tela do ecossistema Academy.
