import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";

export default function Promotions({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPromotions() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("on_sale", true);

      if (error) console.error(error);
      else setProducts(data);
      setLoading(false);
    }
    fetchPromotions();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <h1 className="text-3xl font-bold mb-2">Novidades & Promoções</h1>
      <p className="text-gray-500 text-sm mb-6">Ofertas especiais por tempo limitado</p>
      <hr className="mb-6" />
      {loading ? (
        <p className="text-gray-500">Carregando...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">Nenhuma promoção disponível no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
}