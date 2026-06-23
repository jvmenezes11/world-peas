import { useRef } from "react";

const farmerImages = [
  "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?w=600",
  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600",
  "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600",
  "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600",
  "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600",
  "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600",
];

export default function Home({ onNavigate }) {
  const scrollRef = useRef(null);

  function scroll(direction) {
    if (scrollRef.current) {
      const amount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  }

  return (
    <div>
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-serif leading-tight mb-8">
          Somos <em>agricultores</em>, <em>fornecedores</em> e <em>consumidores</em> de alimentos cultivados organicamente.
        </h1>
        <button
          onClick={() => onNavigate("shop")}
          className="bg-[#426B1F] text-white px-6 py-3 rounded hover:bg-[#355718] transition"
        >
          Ver produtos
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-16">
        <h2 className="text-sm uppercase tracking-wide text-gray-500 font-semibold mb-4">Nossos produtores</h2>

        <div className="relative">
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {farmerImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="Agricultor familiar colhendo"
                className="w-72 aspect-square object-cover rounded-2xl flex-shrink-0"
              />
            ))}
          </div>

          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-[#E6E6E6] rounded-full w-10 h-10 items-center justify-center shadow hover:bg-gray-50"
          >
            ←
          </button>
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white border border-[#E6E6E6] rounded-full w-10 h-10 items-center justify-center shadow hover:bg-gray-50"
          >
            →
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          <span className="font-semibold">Origem: Brasil</span> — produtores que cultivam com cuidado, e que, esperamos, são bem remunerados pelo seu trabalho.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-8 pb-20 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="font-semibold text-sm uppercase tracking-wide text-gray-500">O que acreditamos</h2>
        </div>
        <div className="md:col-span-3 flex flex-col gap-4 text-gray-700 leading-relaxed">
          <p>Acreditamos em produtos. Produtos saborosos. Produtos como:</p>
          <p>Tomates. Pimentas. Limões. Cenouras. Pepinos. Alcachofras. Couve-flor. Repolho. Cebolas roxas. Berinjelas. Aspargos. Rabanetes. Brócolis. Couve. Cebolinhas. Gengibre. Cerejas. Framboesas. Coentro. Salsa. Endro.</p>
          <p>O que estamos esquecendo?</p>
          <p>Ah! Cebolas. Abacates. Alface. Rúcula. Abobrinhas. Abóboras. Batata-doce. Jaca. Manga. Abacaxi. Tomates cereja. Beterrabas. Acelga. Milho. Endívia.</p>
        </div>
      </div>
    </div>
  );
}