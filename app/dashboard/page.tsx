"use client";

import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";

function DashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams.get("success")) setMessage("✅ Assinatura realizada com sucesso!");
    if (searchParams.get("canceled")) setMessage("❌ Pagamento cancelado.");
  }, [searchParams]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    setLoading(false);
  }

  async function handleChat() {
    if (!input.trim()) return;
    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setChatLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) {
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: `❌ ${data.error}` }]);
      setChatLoading(false);
      return;
    }

    // Lê o streaming
    const reader = res.body?.getReader();
    const decoder = new TextDecoder();
    let assistantMessage = "";
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      assistantMessage += decoder.decode(value);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: assistantMessage };
        return updated;
      });
    }

    setChatLoading(false);
  }

  if (status === "loading") return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  if (status === "unauthenticated") {
    window.location.href = "/";
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100">
        <span className="text-xl font-bold text-indigo-600">MeuSaaS</span>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Olá, {session?.user?.name}</span>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-red-500 hover:text-red-700 transition">
            Sair
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-4">Bem-vindo à sua área exclusiva.</p>

        {message && (
          <div className="mb-8 p-4 bg-white rounded-xl border border-gray-200 text-sm">{message}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Plano atual</p>
            <p className="text-3xl font-bold">Free</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <p className="text-sm text-gray-400 mb-1">Membro desde</p>
            <p className="text-3xl font-bold">2025</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <button onClick={handleUpgrade} disabled={loading} className="w-full h-full bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
              {loading ? "Redirecionando..." : "⚡ Assinar Pro"}
            </button>
          </div>
        </div>

        {/* CHAT */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="font-semibold">Chat com IA</h2>
            <p className="text-xs text-gray-400">Powered by Claude</p>
          </div>

          <div className="h-96 overflow-y-auto p-6 flex flex-col gap-4">
            {messages.length === 0 && (
              <p className="text-gray-400 text-sm text-center mt-8">Faça uma pergunta para começar...</p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-lg px-4 py-3 rounded-2xl text-sm ${m.role === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-800"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {chatLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-4 py-3 rounded-2xl text-sm text-gray-400">Digitando...</div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="px-6 py-4 border-t border-gray-100 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChat()}
              placeholder="Digite sua mensagem..."
              className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-indigo-400"
            />
            <button onClick={handleChat} disabled={chatLoading} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition disabled:opacity-50">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}>
      <DashboardContent />
    </Suspense>
  );
}