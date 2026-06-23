import { useCart } from "../context/CartContext";

export default function ProductListItem({ product, onSelect }) {
  const { addToCart } = useCart();
  const price = product.on_sale ? product.discount_price : product.price;

  return (
    <div className="flex items-center gap-4 bg-[#FAFAF5] border border-[#E6E6E6] rounded-2xl p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 object-cover rounded-xl cursor-pointer"
        onClick={() => onSelect(product)}
      />
      <div className="flex-1">
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
      </div>
      <button
        onClick={() => addToCart({ ...product, price, original_price: product.price })}
        className="bg-[#426B1F] text-white px-4 py-2 rounded-xl text-sm hover:bg-[#355718] transition"
      >
        Adicionar
      </button>
    </div>
  );
}