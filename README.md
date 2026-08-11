# oraconverter-site

Site institucional do **ORACONVERTER**, conversor de unidades e moedas para iOS.

Hoje serve a **política de privacidade** do app, exigida pela App Store e pelo
Google AdMob.

- Produção: https://oraconverter.vkim.com.br
- Também acessível em `/privacidade` e `/privacy`

## Estrutura

```
index.html    política de privacidade (site estático, sem build)
vercel.json   rewrites e cabeçalhos de segurança
```

Não há dependências nem etapa de build: é HTML e CSS puros, num único arquivo.
Fontes e ícones são do sistema ou embutidos, então a página não faz nenhuma
requisição externa.

## Publicar

O deploy é automático: qualquer push na branch `main` publica em produção
pela integração com a Vercel.

## Manutenção

Ao alterar o que o app trata de dados, atualize:

1. O texto da seção correspondente em `index.html`
2. A data em **Vigente desde**, no topo do arquivo
3. O `PrivacyInfo.xcprivacy` do app iOS, se a mudança envolver novas APIs
