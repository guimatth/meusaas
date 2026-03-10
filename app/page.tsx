export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-100">
        <span className="text-xl font-bold text-indigo-600">MGuissoCompany</span>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#features" className="hover:text-gray-900 transition">Features</a>
          <a href="#pricing" className="hover:text-gray-900 transition">Pricing</a>
        </div>
        <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
          Começar grátis
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-8 py-28 bg-gradient-to-b from-indigo-50 to-white">
        <span className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4">
          Novidade 2025
        </span>
        <h1 className="text-5xl font-extrabold leading-tight max-w-2xl mb-6">
          A ferramenta que vai mudar o jeito que você trabalha
        </h1>
        <p className="text-lg text-gray-500 max-w-xl mb-10">
          Descreva aqui em uma frase o problema que você resolve. Simples, rápido e sem complicação.
        </p>
        <div className="flex gap-4">
          <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Começar grátis
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:border-gray-500 transition">
            Ver demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Tudo que você precisa</h2>
        <p className="text-center text-gray-500 mb-16">Sem complexidade. Sem curva de aprendizado.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Rápido", desc: "Performance otimizada para você não perder tempo." },
            { icon: "🔒", title: "Seguro", desc: "Seus dados protegidos com criptografia de ponta a ponta." },
            { icon: "🤖", title: "Com IA", desc: "Inteligência artificial integrada para automatizar tarefas." },
          ].map((f) => (
            <div key={f.title} className="bg-gray-50 rounded-2xl p-8 hover:shadow-md transition">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-gray-50 px-8 py-24">
        <h2 className="text-3xl font-bold text-center mb-4">Planos simples</h2>
        <p className="text-center text-gray-500 mb-16">Sem surpresas na fatura.</p>
        <div className="flex flex-col md:flex-row gap-8 max-w-3xl mx-auto">

          {/* Free */}
          <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-200">
            <h3 className="text-lg font-semibold mb-1">Free</h3>
            <p className="text-4xl font-extrabold mb-6">R$0<span className="text-base font-normal text-gray-400">/mês</span></p>
            <ul className="text-sm text-gray-500 space-y-3 mb-8">
              <li>✅ 10 usos por mês</li>
              <li>✅ Acesso básico</li>
              <li>❌ IA desativada</li>
            </ul>
            <button className="w-full border border-gray-300 py-2 rounded-lg text-sm font-semibold hover:border-gray-500 transition">
              Começar grátis
            </button>
          </div>

          {/* Pro */}
          <div className="flex-1 bg-indigo-600 text-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-lg font-semibold mb-1">Pro</h3>
            <p className="text-4xl font-extrabold mb-6">R$49<span className="text-base font-normal opacity-60">/mês</span></p>
            <ul className="text-sm opacity-80 space-y-3 mb-8">
              <li>✅ Usos ilimitados</li>
              <li>✅ Acesso completo</li>
              <li>✅ IA ativada</li>
            </ul>
            <button className="w-full bg-white text-indigo-600 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition">
              Assinar Pro
            </button>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-10 text-sm text-gray-400 border-t border-gray-100">
        © 2025 MGuissoCompany. Feito com Next.js e Tailwind.
      </footer>

    </main>
  );
}