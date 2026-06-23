export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <h1 className="text-4xl font-bold mb-6">Quem somos</h1>

      <div className="flex gap-12 mb-16">
        <div className="w-1/2">
          <p className="text-lg text-gray-600 leading-relaxed mb-4">
            Somos <em>agricultores, fornecedores</em> e <em>consumidores</em> de alimentos orgânicos cultivados com cuidado e respeito pela natureza.
          </p>
          <p className="text-gray-600 leading-relaxed">
            O World Peas nasceu da vontade de conectar pequenos produtores rurais brasileiros diretamente com quem valoriza uma alimentação saudável e sustentável. Acreditamos que comida boa começa na terra.
          </p>
        </div>
        <div className="w-1/2 bg-[#FAFAF5] rounded-2xl p-8 border border-[#E6E6E6]">
          <h2 className="font-semibold text-lg mb-4">O que acreditamos</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Acreditamos em produção orgânica, comércio justo e transparência. Cada produto no nosso marketplace tem origem rastreável — você sabe exatamente de onde vem o que coloca no prato.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="text-center">
          <div className="text-4xl mb-3">🌱</div>
          <h3 className="font-semibold mb-2">100% Orgânico</h3>
          <p className="text-sm text-gray-500">Todos os produtos são cultivados sem agrotóxicos e com práticas sustentáveis.</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">🚜</div>
          <h3 className="font-semibold mb-2">Direto do produtor</h3>
          <p className="text-sm text-gray-500">Conectamos você diretamente com pequenos agricultores de todo o Brasil.</p>
        </div>
        <div className="text-center">
          <div className="text-4xl mb-3">❤️</div>
          <h3 className="font-semibold mb-2">Feito com carinho</h3>
          <p className="text-sm text-gray-500">Cada entrega é preparada com cuidado para chegar fresquinha na sua casa.</p>
        </div>
      </div>
    </div>
  );
}