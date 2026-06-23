import { useCart } from "../context/CartContext";

export default function ProductCard({ product, onSelect }) {
  const { addToCart } = useCart();
  const price = product.on_sale ? product.discount_price : product.price;

  return (
    <div className="bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl p-4 relative">
      {product.on_sale && (
        <span className="absolute top-6 left-6 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          Promoção
        </span>
      )}
      <img
        src={product.image}
        alt={product.name}
        className="w-full aspect-square object-cover rounded-xl cursor-pointer"
        onClick={() => onSelect(product)}
      />
      <div className="pt-4">
        <h3
          className="font-medium cursor-pointer hover:underline"
          onClick={() => onSelect(product)}
        >
          {product.name}
        </h3>
        {product.on_sale ? (
          <p className="font-semibold">
            <span className="text-gray-400 line-through mr-2">R$ {product.price.toFixed(2)}</span>
            <span className="text-red-500">R$ {product.discount_price.toFixed(2)} / {product.unit}</span>
          </p>
        ) : (
          <p className="text-[#426B1F] font-semibold">R$ {product.price.toFixed(2)} / {product.unit}</p>
        )}
        <p className="text-sm text-gray-500">Cultivado em {product.origin}</p>
        <button
          onClick={() => addToCart({ ...product, price, original_price: product.price })}
          className="mt-3 w-full bg-[#426B1F] text-white py-2 rounded-xl text-sm hover:bg-[#355718] transition"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}