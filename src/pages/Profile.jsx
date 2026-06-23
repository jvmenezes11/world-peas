import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Profile({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error(error);
      else setOrders(data);
      setLoading(false);
    }
    if (user) fetchOrders();
  }, [user]);

  async function handleCancel(orderId) {
    const { error } = await supabase
      .from("orders")
      .update({ status: "cancelado" })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      alert("Erro ao cancelar pedido. Tente novamente.");
      return;
    }

    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "cancelado" } : o))
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-1">Meu perfil</h1>
      <p className="text-gray-500 mb-8">{user.email}</p>

      <h2 className="text-xl font-semibold mb-4">Meus pedidos</h2>

      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">Você ainda não fez nenhum pedido.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const subtotalFinal = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
            const subtotalOriginal = order.items.reduce(
              (sum, item) => sum + (item.original_price ?? item.price) * item.qty,
              0
            );
            const desconto = subtotalOriginal - subtotalFinal;
            const frete = Number(order.total) - subtotalFinal;
            const cancelado = order.status === "cancelado";

            return (
              <div
                key={order.id}
                className={`bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl p-4 ${cancelado ? "opacity-60" : ""}`}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString("pt-BR")}
                    </span>
                    {cancelado && (
                      <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                        Cancelado
                      </span>
                    )}
                  </div>
                  <span className="font-semibold text-[#426B1F]">R$ {Number(order.total).toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-1 mb-3">
                  {order.items.map((item, i) => (
                    <p key={i} className="text-sm text-gray-600">
                      {item.qty}x {item.name} — R$ {(item.price * item.qty).toFixed(2)}
                    </p>
                  ))}
                </div>

                <hr className="mb-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>R$ {subtotalOriginal.toFixed(2)}</span>
                </div>
                {desconto > 0 && (
                  <div className="flex justify-between text-sm text-red-500">
                    <span>Desconto</span>
                    <span>- R$ {desconto.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Frete</span>
                  <span>R$ {frete.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold mb-2">
                  <span>Total</span>
                  <span>R$ {Number(order.total).toFixed(2)}</span>
                </div>

                {!cancelado && (
                  <button
                    onClick={() => handleCancel(order.id)}
                    className="text-sm text-red-500 hover:underline"
                  >
                    Cancelar pedido
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}