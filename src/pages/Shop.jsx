import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ProductCard from "../components/ProductCard";
import ProductListItem from "../components/ProductListItem";

export default function Shop({ onSelectProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortMode, setSortMode] = useState("default");
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
      if (error) console.error(error);
      else setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.origin.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortMode === "az") return a.name.localeCompare(b.name);
      return a.id - b.id;
    });

  return (
    <div className="max-w-6xl mx-auto px-8 py-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-2">
        <h1 className="text-3xl font-bold">Produtos</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setSortMode("default")}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              sortMode === "default" ? "bg-[#426B1F] text-white" : "border"
            }`}
          >
            Padrão
          </button>
          <button
            onClick={() => setSortMode("az")}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              sortMode === "az" ? "bg-[#426B1F] text-white" : "border"
            }`}
          >
            A-Z
          </button>
          <button
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              viewMode === "list" ? "bg-[#426B1F] text-white" : "border"
            }`}
          >
            Lista
          </button>
        </div>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar por nome, origem ou descrição..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-[#E6E6E6] rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:border-[#426B1F]"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        )}
      </div>

      <p className="text-gray-500 text-sm mb-6">
        {search
          ? `${filteredProducts.length} resultado(s) para "${search}"`
          : "Frescos — 21 de Agosto de 2023"}
      </p>
      <hr className="mb-6" />

      {loading ? (
        <p className="text-gray-500">Carregando produtos...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-gray-500">Nenhum produto encontrado para "{search}".</p>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filteredProducts.map((p) => (
            <ProductListItem key={p.id} product={p} onSelect={onSelectProduct} />
          ))}
        </div>
      )}
    </div>
  );
}