# Marry Me - Aplicação de Convites de Casamento

Aplicação Next.js para criar convites de casamento personalizados.

## Configuração

### Variáveis de Ambiente

Antes de executar o projeto, você precisa configurar as seguintes variáveis de ambiente:

1. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# YouTube API Key (obrigatório para a busca de músicas)
YOUTUBE_API_KEY=sua_chave_de_api_do_youtube
```

### Como obter uma chave de API do YouTube

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto
3. Na barra lateral, clique em "APIs e serviços" > "Biblioteca"
4. Pesquise por "YouTube Data API v3" e ative-a para seu projeto
5. Em seguida, vá para "APIs e serviços" > "Credenciais"
6. Clique em "Criar credenciais" > "Chave de API"
7. Copie a chave gerada e adicione-a ao seu arquivo .env.local

## Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# W-Marry-Me

## Configuração do Spotify API

Para que a funcionalidade de busca de músicas funcione corretamente, você precisa criar um aplicativo no Spotify Developer Dashboard e configurar as credenciais:

1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/)
2. Faça login com sua conta do Spotify
3. Clique em "Create an App"
4. Preencha o formulário com o nome e descrição do seu aplicativo
5. Após criar o aplicativo, você verá o Client ID e Client Secret
6. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=seu_client_id_aqui
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui
```

7. Reinicie o servidor de desenvolvimento
