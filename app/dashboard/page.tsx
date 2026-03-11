import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/");
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100">
        <span className="text-xl font-bold text-indigo-600">MeuSaaS</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Olá, {session.user?.name}
          </span>
          <a
            href="/api/auth/signout"
            className="text-sm text-red-500 hover:text-red-700 transition"
          >
            Sair
          </a>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-12">Bem-vindo à sua área exclusiva.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Usos este mês</p>
            <p className="text-3xl font-bold">3</p>
            <p className="text-xs text-gray-400 mt-1">de 10 no plano Free</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Plano atual</p>
            <p className="text-3xl font-bold">Free</p>
            <a href="#" className="text-xs text-indigo-500 mt-1 block hover:underline">
              Fazer upgrade →
            </a>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Membro desde</p>
            <p className="text-3xl font-bold">2025</p>
          </div>
        </div>
      </div>

    </main>
  );
}