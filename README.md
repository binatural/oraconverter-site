# oraconverter-site

Site institucional do **ORACONVERTER**, conversor de unidades e moedas para iOS.

Serve a página institucional, a política de privacidade, os termos de uso e o
suporte público do app.

## Rotas

| Caminho        | O que faz                                  |
| -------------- | ------------------------------------------ |
| `/`            | Página institucional                       |
| `/privacy`     | Política de privacidade (URL canônica)     |
| `/support`     | Suporte e perguntas frequentes             |
| `/terms`       | Termos de uso                              |
| `/privacidade` | Alias em português para `/privacy`         |
| `/suporte`     | Alias em português para `/support`         |
| `/termos`      | Alias em português para `/terms`           |

## Estrutura

```
index.html     página institucional
privacy.html   política de privacidade
support.html   suporte e perguntas frequentes
terms.html     termos de uso
site.css       estilos compartilhados
vercel.json    rotas e cabeçalhos de segurança
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
