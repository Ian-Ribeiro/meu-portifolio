"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("Email de verificação enviado! Por favor, verifique sua caixa de entrada.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Ocorreu um erro ao assinar a newsletter.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Erro de conexão. Tente novamente mais tarde.");
    }
  };

  return (
    <section id="newsletter" className="py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-3xl mx-auto glass rounded-3xl p-8 md:p-12 text-center border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <Mail className="w-12 h-12 text-blue-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Assine minha Newsletter
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto text-lg">
            Receba atualizações sobre novos projetos, artigos e dicas de desenvolvimento diretamente na sua caixa de entrada.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              disabled={status === "loading" || status === "success"}
              className="flex-grow px-5 py-3 rounded-full bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="px-8 py-3 rounded-full bg-primary hover:bg-primary-hover text-white font-medium transition-all shadow-lg hover:shadow-primary/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Inscrever-se"
              )}
            </button>
          </form>

          {/* Feedback Messages */}
          {status === "success" && (
            <div className="mt-6 flex items-center justify-center text-green-400 gap-2 animate-fade-in">
              <CheckCircle2 className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}
          {status === "error" && (
            <div className="mt-6 flex items-center justify-center text-red-400 gap-2 animate-fade-in">
              <AlertCircle className="w-5 h-5" />
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
