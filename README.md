# Radar Eleitoral Brasil

Painel web estático, responsivo, em português, para acompanhar a divulgação oficial da apuração presidencial.

## Arquivos
- `index.html`: site completo (HTML, CSS e JavaScript em um único arquivo).
- `README.md`: estas instruções.

## Publicar gratuitamente no GitHub Pages
1. Entre em https://github.com e crie um repositório novo chamado `radar-eleitoral-brasil`.
2. Marque o repositório como **Public** e crie-o sem README/licença adicionais (ou mantenha os arquivos que já houver).
3. No repositório, use **Add file → Upload files**.
4. Envie `index.html` e `README.md` deste pacote. O arquivo principal precisa se chamar exatamente `index.html`.
5. Clique em **Commit changes**.
6. Abra **Settings → Pages**.
7. Em **Build and deployment**, selecione **Deploy from a branch**; escolha `main` e `/ (root)`; clique em **Save**.
8. Aguarde a publicação. O endereço costuma ser `https://SEU-USUARIO.github.io/radar-eleitoral-brasil/`.

## Importante sobre a integração TSE
- O site consulta o JSON presidencial do segundo turno em `resultados.tse.jus.br`, usando a estrutura documentada para 2026. O código de eleição e o caminho de arquivo devem ser confirmados na configuração oficial do TSE no momento da apuração.
- O navegador pode bloquear a consulta direta por política CORS ou a estrutura dos arquivos pode ser atualizada. Se isso ocorrer, o painel mostrará erro; não inventará nem simulará números.
- Se o navegador bloquear a consulta direta, a solução confiável é adicionar um pequeno proxy/backend (por exemplo, Cloudflare Worker ou GitHub Actions). Isso requer configurar e testar esse componente; GitHub Pages sozinho não executa código servidor.
- A interface usa botões de seleção por estado em vez de um mapa geográfico real nesta primeira versão. Os dados estaduais são consultados sob demanda. A lista de municípios não está implementada nesta versão.
- Os números são dados públicos e podem mudar durante a totalização. O painel não é afiliado ao TSE; confirme sempre no portal oficial: https://resultados.tse.jus.br/
- A atualização automática consulta a cada 30 segundos apenas enquanto a página estiver aberta e visível. O intervalo é conservador para reduzir requisições. Não significa que o TSE publique novos dados nesse ritmo.
- Fotos externas podem não carregar se o provedor de imagens estiver indisponível; os identificadores numéricos permanecem como fallback visual.

## Segurança e neutralidade
O projeto não pede login, não coleta dados pessoais e não inclui tokens ou credenciais. As cores vermelho e azul são escolhas visuais para diferenciar os candidatos, não recomendações políticas.
