import { useState } from "react";
import { useCart } from "../context/CartContext";
import { supabase } from "../lib/supabase";

export default function Navbar({ onNavigate, page, user }) {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  async function handleLogout() {
    await supabase.auth.signOut();
    handleNav("shop");
  }

  function handleNav(target) {
    onNavigate(target);
    setMenuOpen(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    if (search.trim()) {
      onNavigate("shop");
      onNavigate({ page: "shop", search: search.trim() });
    }
  }

  return (
    <nav className="px-4 md:px-8 py-4 border-b">
      <div className="flex justify-between items-center gap-4">
        <h1
          onClick={() => handleNav("home")}
          className="text-xl font-semibold text-[#426B1F] cursor-pointer flex-shrink-0"
        >
          World Peas
        </h1>

        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-sm">
          <input
            type="text"
            placeholder="Buscar produtos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-[#E6E6E6] rounded-xl px-4 py-1.5 text-sm focus:outline-none focus:border-[#426B1F]"
          />
        </form>

        <div className="hidden md:flex gap-6 items-center text-sm">
          <a onClick={() => handleNav("shop")} className="hover:underline cursor-pointer">Loja</a>
          <a onClick={() => handleNav("promotions")} className="hover:underline cursor-pointer">Novidades</a>
          <a onClick={() => handleNav("about")} className="hover:underline cursor-pointer">Quem somos</a>
          {user ? (
            <>
              <a onClick={() => handleNav("profile")} className="hover:underline cursor-pointer">Meu perfil</a>
              <button onClick={handleLogout} className="hover:underline text-red-500">Sair</button>
            </>
          ) : (
            <a onClick={() => handleNav("login")} className="hover:underline cursor-pointer">Entrar</a>
          )}
          <button
            onClick={() => handleNav("basket")}
            className="bg-[#426B1F] text-white px-4 py-2 rounded"
          >
            Carrinho ({totalItems})
          </button>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => handleNav("basket")}
            className="bg-[#426B1F] text-white px-3 py-1.5 rounded text-sm"
          >
            Carrinho ({totalItems})
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl leading-none">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex md:hidden flex-col gap-4 mt-4 text-sm pb-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 border border-[#E6E6E6] rounded-xl px-4 py-1.5 text-sm focus:outline-none focus:border-[#426B1F]"
            />
            <button type="submit" className="bg-[#426B1F] text-white px-3 rounded-xl text-sm">Buscar</button>
          </form>
          <a onClick={() => handleNav("shop")} className="cursor-pointer">Loja</a>
          <a onClick={() => handleNav("promotions")} className="cursor-pointer">Novidades</a>
          <a onClick={() => handleNav("about")} className="cursor-pointer">Quem somos</a>
          {user ? (
            <>
              <a onClick={() => handleNav("profile")} className="cursor-pointer">Meu perfil</a>
              <button onClick={handleLogout} className="text-left text-red-500">Sair</button>
            </>
          ) : (
            <a onClick={() => handleNav("login")} className="cursor-pointer">Entrar</a>
          )}
        </div>
      )}
    </nav>
  );
}