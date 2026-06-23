import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

const CUPONS = {
  URI10: 0.10,
  VERDE20: 0.20,
  FRESH15: 0.15,
};

export default function Basket({ user, onRequireLogin }) {
  const { cart, removeFromCart, updateQty, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cupomInput, setCupomInput] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
  const [cupomErro, setCupomErro] = useState("");

  const subtotalOriginal = cart.reduce(
    (sum, item) => sum + (item.original_price ?? item.price) * item.qty, 0
  );
  const descontoPromocao = subtotalOriginal - total;
  const descontoCupom = cupomAplicado ? total * CUPONS[cupomAplicado] : 0;
  const frete = (total - descontoCupom) >= 200 ? 0 : 25;
  const totalFinal = total - descontoCupom + frete;

  function aplicarCupom() {
    const code = cupomInput.trim().toUpperCase();
    if (CUPONS[code]) {
      setCupomAplicado(code);
      setCupomErro("");
    } else {
      setCupomErro("Cupom inválido.");
      setCupomAplicado(null);
    }
  }

  function removerCupom() {
    setCupomAplicado(null);
    setCupomInput("");
    setCupomErro("");
  }

  async function handleCheckout() {
    if (!user) {
      onRequireLogin();
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("orders").insert({
      user_id: user.id,
      items: cart,
      total: totalFinal,
    });

    if (error) {
      console.error(error);
      alert("Erro ao finalizar pedido. Tente novamente.");
    } else {
      clearCart();
      setSuccess(true);
    }
    setLoading(false);
  }

  if (success) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold mb-2">Pedido realizado!</h1>
        <p className="text-gray-500">Seu pedido foi confirmado com sucesso. Você pode acompanhar em "Meu perfil".</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Carrinho</h1>
      <p className="text-gray-500 text-sm mb-6">{cart.length} {cart.length === 1 ? "item" : "itens"}</p>

      {cart.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 flex flex-col gap-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl p-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-[#426B1F] font-semibold">R$ {item.price.toFixed(2)} / {item.unit}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="border rounded px-2">-</button>
                    <span>{item.qty} {item.unit}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="border rounded px-2">+</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">R$ {(item.price * item.qty).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-400 text-sm mt-1">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-72">
            <div className="bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl p-6">
              <h2 className="font-semibold text-lg mb-4">Resumo do pedido</h2>

              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>R$ {subtotalOriginal.toFixed(2)}</span>
              </div>
              {descontoPromocao > 0 && (
                <div className="flex justify-between text-sm mb-2 text-red-500">
                  <span>Desconto promoção</span>
                  <span>- R$ {descontoPromocao.toFixed(2)}</span>
                </div>
              )}
              {descontoCupom > 0 && (
                <div className="flex justify-between text-sm mb-2 text-red-500">
                  <span>Cupom ({cupomAplicado})</span>
                  <span>- R$ {descontoCupom.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mb-4">
                <span>Frete {frete === 0 && <span className="text-[#426B1F]">(grátis!)</span>}</span>
                <span>{frete === 0 ? "R$ 0,00" : "R$ 25,00"}</span>
              </div>

              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Cupom de desconto</p>
                {cupomAplicado ? (
                  <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                    <span className="text-sm text-green-700 font-medium">{cupomAplicado} aplicado!</span>
                    <button onClick={removerCupom} className="text-red-400 text-xs hover:underline">Remover</button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Código do cupom"
                      value={cupomInput}
                      onChange={(e) => setCupomInput(e.target.value)}
                      className="flex-1 border border-[#E6E6E6] rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#426B1F]"
                    />
                    <button
                      onClick={aplicarCupom}
                      className="bg-[#426B1F] text-white px-3 rounded-xl text-sm hover:bg-[#355718] transition"
                    >
                      Aplicar
                    </button>
                  </div>
                )}
                {cupomErro && <p className="text-red-500 text-xs mt-1">{cupomErro}</p>}
                {!cupomAplicado && <p className="text-xs text-gray-400 mt-1">Tente: URI10, VERDE20, FRESH15</p>}
              </div>

              <hr className="my-3" />
              <div className="flex justify-between font-semibold text-lg mb-4">
                <span>Total</span>
                <span>R$ {totalFinal.toFixed(2)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#426B1F] text-white py-3 rounded-xl hover:bg-[#355718] transition disabled:opacity-50"
              >
                {loading ? "Processando..." : "Finalizar pedido →"}
              </button>
              {!user && (
                <p className="text-xs text-gray-400 mt-2 text-center">Você precisa estar logado para finalizar.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}