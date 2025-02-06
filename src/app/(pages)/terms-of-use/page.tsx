import Head from "next/head";

export default function TermsOfUse() {
  return (
    <div className="container">
      <Head>
        <title>Termos de Uso</title>
      </Head>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center">Termos de Uso</h1>
        <p>
          Bem-vindo! Ao utilizar nossos serviços, você concorda com os seguintes
          termos.
        </p>

        <section>
          <h2 className="text-2xl font-semibold">1. Uso do Serviço</h2>
          <p>
            Nosso serviço permite que você crie um pedido personalizado através
            de um QR Code. Os planos pagos garantem acesso aos recursos
            adicionais conforme descrito na página de preços.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. Validade dos Links</h2>
          <p>
            O plano gratuito tem validade de 24h. O plano Romântico e o Surpresa
            oferecem um link de acesso prolongado, podendo ser removido caso o
            serviço se torne inviável. Manteremos os usuários informados caso
            haja qualquer mudança.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3. Pagamento e Reembolso</h2>
          <p>
            O pagamento dos planos é único e não recorrente. Não realizamos
            reembolsos após a geração do QR Code.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. Alterações nos Termos</h2>
          <p>
            Podemos atualizar estes termos conforme necessário. Notificaremos os
            usuários sobre mudanças importantes.
          </p>
        </section>

        <footer className="text-center text-sm text-gray-500">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </footer>
      </main>
    </div>
  );
}
