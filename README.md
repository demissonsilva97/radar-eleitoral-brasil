# Radar Eleitoral Brasil

Painel estático, responsivo e em português para acompanhar a divulgação oficial da apuração presidencial do segundo turno das Eleições 2026.

## O que inclui

- Retratos dos dois candidatos em destaque, com Lula em vermelho e Flávio Bolsonaro em azul.
- Painel estatístico com votos, percentuais, diferença entre candidatos, seções totalizadas, eleitorado, comparecimento, abstenções, votos brancos e nulos.
- Gráficos comparativos que usam apenas números recebidos do arquivo oficial do TSE.
- Consulta automática a cada 30 segundos enquanto a página estiver aberta e visível; botão para atualizar manualmente.
- Antes das 17h de Brasília em 25/10/2026, a página mostra o aviso de espera. Depois, exige um carimbo de dados no horário de divulgação, para não apresentar o arquivo zerado anterior à apuração como resultado ao vivo.
- Link para conferência direta no portal oficial do TSE e mensagens de erro em caso de falha de rede/CORS. Não há números simulados ou estimados.

## Arquivos

- `index.html`: página completa, com CSS e JavaScript no próprio arquivo.
- `README.md`: estas instruções.

## Publicar gratuitamente no GitHub Pages

1. Crie um repositório público, por exemplo `radar-eleitoral-brasil`.
2. Envie `index.html` e `README.md` para a raiz do repositório.
3. No GitHub, abra **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**, selecione `main` e `/ (root)`, e salve.
5. Aguarde o GitHub publicar o site; o endereço costuma ser `https://SEU-USUARIO.github.io/radar-eleitoral-brasil/`.

## Fonte oficial

O painel consulta este arquivo público de resultado presidencial do segundo turno:

`https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json`

Documentação técnica do TSE: https://www.tse.jus.br/eleicoes/informacoes-tecnicas-sobre-a-divulgacao-de-resultados

Portal oficial de resultados: https://resultados.tse.jus.br/oficial/app/index.html

## Importante

- O painel é independente e não é afiliado ao TSE.
- A divulgação oficial dos resultados presidenciais do segundo turno está prevista a partir das 17h de Brasília em 25 de outubro de 2026.
- O GitHub Pages é estático e não executa um servidor próprio. Se o navegador bloquear o acesso direto ao arquivo do TSE por CORS, o painel avisará e oferecerá o link oficial; para garantir acesso em todos os navegadores será necessário um proxy/backend confiável.
- As fotografias são carregadas de fontes externas e dependem da disponibilidade desses provedores.
- A atualização de 30 segundos significa que o painel consulta esse intervalo; não significa que o TSE gere um novo arquivo a cada 30 segundos.
