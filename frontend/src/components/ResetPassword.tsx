"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      await authService.updatePassword(password);
      setMessage("Senha alterada com sucesso! Redirecionando...");
      setTimeout(() => router.push("/"), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao alterar senha');
    }

    setLoading(false);
  };


return (
  <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 rounded-xl shadow-2xl bg-white">
    <h2 className="text-3xl font-bold mb-6 text-center">Redefinir Senha</h2>

    {message && <p className="text-green-600 mb-4">{message}</p>}
    {error && <p className="text-red-600 mb-4">{error}</p>}

    <div className="mb-4">
      <input
        type="password"
        placeholder="Nova senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>
    <div className="mb-4">
      <input
        type="password"
        placeholder="Confirmar nova senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
    </div>

    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 text-white py-3 rounded-md"
    >
      {loading ? "Alterando..." : "Alterar Senha"}
    </button>
  </form>
);

}