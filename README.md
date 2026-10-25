# Radar Eleitoral Brasil

Painel estático, responsivo e em português para acompanhar a divulgação oficial da apuração presidencial do segundo turno das Eleições 2026.

## O que inclui

- Interface priorizada para classificação nacional, sem cartões com retratos em grande formato; o ranking mantém apenas miniaturas compactas. Lula aparece em vermelho e Flávio Bolsonaro em azul.
- Ranking nacional dinâmico: as posições são reordenadas automaticamente pelo total de votos da parcial oficial. O candidato que lidera recebe um cartão de destaque com foto maior e selo de líder; se a liderança mudar, o destaque acompanha automaticamente a nova liderança. Em caso de empate, ambos recebem ênfase equivalente. Acima do ranking, um resumo mostra percentual de apuração, seções totalizadas e total de seções.
- Aba lateral com mapa interativo do Brasil. Ao abrir o mapa, a página consulta arquivos estaduais do TSE; estados com liderança válida ficam vermelhos ou azuis, e clicar em uma UF abre os votos, percentuais e a liderança estadual. Há também uma lista de siglas para facilitar a seleção de estados pequenos.
- Modo telão/tela cheia para manter o ranking nacional em destaque; o modo visual também funciona caso o navegador não autorize a API de tela cheia.
- Painel estatístico com votos, percentuais, diferença entre candidatos, seções totalizadas, eleitorado, comparecimento, abstenções, votos brancos e nulos.
- Gráficos comparativos que usam apenas números recebidos dos arquivos oficiais do TSE.
- Consulta nacional automática a cada 30 segundos enquanto a página estiver aberta e visível; botão para atualizar manualmente.
- Consulta estadual quando a aba do mapa é aberta e a cada 2 minutos enquanto ela permanecer aberta.
- Mensagens claras quando faltarem dados; nenhum voto ou vencedor é inventado.

## Arquivos

- `index.html`: site completo, com CSS e JavaScript no próprio arquivo.
- `proxy-worker.js`: proxy CORS opcional e somente leitura para o caso de o navegador bloquear as consultas diretas.
- `README.md`: instruções de publicação e configuração.

## Publicar o site gratuitamente no GitHub Pages

1. Envie `index.html` e `README.md` para a raiz do repositório.
2. No GitHub, abra **Settings → Pages**.
3. Em **Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/ (root)`, e salve.
4. Aguarde o GitHub publicar o site; o endereço costuma ser `https://SEU-USUARIO.github.io/radar-eleitoral-brasil/`.

## Fonte oficial e caminhos por estado

- Apuração nacional: `https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json`
- Arquivo estadual: `https://resultados.tse.jus.br/oficial/ele2026/6258/dados/{uf}/{uf}-c0001-e006258-u.json` (UF em minúsculas).
- Contornos das UFs: [GeoJSON de estados brasileiros](https://github.com/henriquemalvar/br-geojson), distribuído pelo jsDelivr e enriquecido com metadados do IBGE.
- Documentação técnica do TSE: https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados
- Portal oficial: https://resultados.tse.jus.br/oficial/app/index.html

## CORS: opção recomendada se as consultas falharem

O GitHub Pages é estático e não consegue funcionar como um servidor proxy. Se o navegador bloquear o acesso direto aos arquivos do TSE por CORS, o ranking e os dados estaduais podem não atualizar. O pacote inclui `proxy-worker.js`, que só permite leitura dos JSONs públicos do TSE para presidente no 2º turno de 2026 e do arquivo geográfico do mapa.

Para ativar o proxy gratuito:

1. Crie uma conta gratuita no Cloudflare e abra **Workers & Pages**.
2. Crie um Worker e cole o conteúdo de `proxy-worker.js`; salve e publique.
3. Copie a URL pública que o Cloudflare atribuiu ao Worker (termina geralmente em `.workers.dev`).
4. No `index.html`, encontre `const TSE_PROXY_BASE = '';` e substitua as aspas vazias pela URL do Worker, por exemplo `const TSE_PROXY_BASE = 'https://seu-worker.seu-subdominio.workers.dev';`.
5. Envie o `index.html` atualizado ao GitHub Pages. Não é necessário colocar credenciais no site.

Esse proxy é opcional: o painel tenta acessar os dados diretamente quando `TSE_PROXY_BASE` fica vazio. O proxy não cria nem modifica resultados, apenas repassa arquivos públicos aprovados pela lista de permissões.

## Limites e segurança

- O painel é independente e não é afiliado ao TSE.
- O intervalo de consulta não significa que o TSE gere um novo arquivo a cada 30 segundos.
- O mapa consulta os estados com concorrência limitada e só os colore quando há uma parcial estadual válida. Estados sem resposta ficam neutros.
- A consulta estadual percorre até 27 UFs quando a lateral do mapa é aberta; o ciclo de atualização repete a consulta a cada 2 minutos enquanto a lateral estiver aberta.
- As fotografias são carregadas de fontes externas e dependem da disponibilidade desses provedores.
