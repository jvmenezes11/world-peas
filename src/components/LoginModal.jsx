import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function LoginModal({ onClose }) {
  const [mode, setMode] = useState("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
      else onClose();
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setError("Conta criada! Verifique seu e-mail para confirmar.");
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {mode === "signin" ? "Bem-vindo de volta" : "Criar conta"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">×</button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-[#E6E6E6] rounded-xl px-4 py-2 focus:outline-none focus:border-[#426B1F]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E6E6E6] rounded-xl px-4 py-2 focus:outline-none focus:border-[#426B1F]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#426B1F] text-white py-2.5 rounded-xl hover:bg-[#355718] transition disabled:opacity-50"
          >
            {loading ? "Carregando..." : mode === "signin" ? "Entrar" : "Criar conta"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === "signin" ? (
            <>
              Não possui uma conta?{" "}
              <button onClick={() => setMode("signup")} className="text-[#426B1F] font-medium hover:underline">
                Cadastre-se
              </button>
            </>
          ) : (
            <>
              Já tem uma conta?{" "}
              <button onClick={() => setMode("signin")} className="text-[#426B1F] font-medium hover:underline">
                Entrar
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}