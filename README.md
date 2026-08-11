# oraconverter-site

Site institucional do **ORACONVERTER**, conversor de unidades e moedas para iOS.

Hoje serve a **política de privacidade** do app, exigida pela App Store e pelo
Google AdMob.

## Rotas

| Caminho        | O que faz                                  |
| -------------- | ------------------------------------------ |
| `/privacy`     | Política de privacidade (URL canônica)     |
| `/privacidade` | Mesma página, alias em português           |
| `/`            | Redireciona para `/privacy` (307)          |

O redirecionamento da raiz é **temporário (307)**, não permanente (308), de
propósito: navegadores não guardam 307 em cache eterno, então a raiz continua
livre para receber uma landing page do app no futuro sem que ninguém fique
preso no redirecionamento antigo.

## Estrutura

```
privacy.html   política de privacidade (site estático, sem build)
vercel.json    redirects, rewrites e cabeçalhos de segurança
```

Não há dependências nem etapa de build: é HTML e CSS puros, num único arquivo.
Fontes e ícones são do sistema ou embutidos, então a página não faz nenhuma
requisição externa.

## Publicar

O deploy é automático: qualquer push na branch `main` publica em produção
pela integração com a Vercel.

## Manutenção

Ao alterar o que o app trata de dados, atualize:

1. O texto da seção correspondente em `privacy.html`
2. A data em **Vigente desde**, no topo do arquivo
3. O `PrivacyInfo.xcprivacy` do app iOS, se a mudança envolver novas APIs

A URL `https://oraconverter.vkim.com.br/privacy` está cadastrada no AdMob e
precisa ser informada também no App Store Connect. Se mudar de endereço,
atualize nos dois lugares.
