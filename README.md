# Site institucional REM SOFT

Site institucional multipágina da **REM SOFT**, empresa de soluções em software. Feito em HTML, CSS e JavaScript puros, sem build e sem dependências.

## Páginas

| Página | Arquivo |
|---|---|
| Início | `index.html` |
| Quem somos | `quem-somos.html` |
| Produtos | `produtos.html` |
| Cases de sucesso | `cases.html` |
| Blog | `blog.html` |
| Contato | `contato.html` |
| Chat | `chat-page.html` |

Cada página tem o seu próprio par `*-styles.css` e `*-script.js`, e todas compartilham `styles.css` e `script.js` (cabeçalho com efeito de rolagem e menu mobile).

## Como rodar

Abra o `index.html` no navegador, ou sirva a pasta por HTTP:

```bash
npx serve .
```

## Observações

- A página de chat é uma interface feita no front-end. O código não chama nenhuma API externa.
- As fontes ficam em `fonts/`, então o site não depende de CDN para a tipografia.

Faz parte do conjunto de repositórios da REM SOFT, junto com as landing pages `LP-*`, `Flepic-iPaas` e `PortalDenuncia-Reformulado`.
