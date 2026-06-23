import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductDetail({ product, onBack }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const price = product.on_sale ? product.discount_price : product.price;

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addToCart({ ...product, price, original_price: product.price });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-8">
      <button onClick={onBack} className="text-sm text-gray-500 hover:underline mb-6 block">
        ← Voltar para produtos
      </button>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-2xl"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          {product.on_sale ? (
            <p className="text-2xl font-semibold mb-1">
              <span className="text-gray-400 line-through mr-2">R$ {product.price.toFixed(2)}</span>
              <span className="text-red-500">R$ {product.discount_price.toFixed(2)} / {product.unit}</span>
            </p>
          ) : (
            <p className="text-[#426B1F] text-2xl font-semibold mb-1">
              R$ {product.price.toFixed(2)} / {product.unit}
            </p>
          )}
          <p className="text-gray-500 text-sm mb-3">Cultivado em {product.origin}</p>

          {product.description && (
            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
          )}

          <div className="flex gap-4 mb-6 text-sm text-gray-500">
            <span>🌿 Orgânico</span>
            <span>❤️ Rico em vitaminas</span>
            <span>💧 Natural</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="border rounded-xl px-4 py-2 text-lg"
            >
              -
            </button>
            <span className="text-lg font-medium">{qty} {product.unit}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="border rounded-xl px-4 py-2 text-lg"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="w-full bg-[#426B1F] text-white py-3 rounded-xl text-lg hover:bg-[#355718] transition"
          >
            Adicionar ao carrinho — R$ {(price * qty).toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}