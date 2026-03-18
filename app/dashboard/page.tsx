"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, useSearchParams, redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") redirect("/");
    if (searchParams.get("success")) setMessage("✅ Assinatura realizada com sucesso!");
    if (searchParams.get("canceled")) setMessage("❌ Pagamento cancelado.");
  }, [status, searchParams]);

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  }

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <main className="min-h-screen bg-gray-50">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100">
        <span className="text-xl font-bold text-indigo-600">MeuSaaS</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, {session?.user?.name}</span>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="text-sm text-red-500 hover:text-red-700 transition"
          >
            Sair
          </button>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-4">Bem-vindo à sua área exclusiva.</p>

        {message && (
          <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200 text-sm">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Usos este mês</p>
            <p className="text-3xl font-bold">3</p>
            <p className="text-xs text-gray-400 mt-1">de 10 no plano Free</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Plano atual</p>
            <p className="text-3xl font-bold">Free</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Membro desde</p>
            <p className="text-3xl font-bold">2025</p>
          </div>
        </div>

        {/* UPGRADE */}
        <div className="bg-indigo-600 text-white rounded-2xl p-8">
          <h2 className="text-xl font-bold mb-2">Faça upgrade para o Pro</h2>
          <p className="opacity-80 text-sm mb-6">Usos ilimitados, IA ativada e acesso completo por R$49/mês.</p>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition disabled:opacity-50"
          >
            {loading ? "Redirecionando..." : "Assinar Pro →"}
          </button>
        </div>

      </div>
    </main>
  );
}