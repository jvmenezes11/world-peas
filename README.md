# 🌿 World Peas — Marketplace de Frutas e Verduras

Marketplace de produtos orgânicos desenvolvido como Trabalho Individual da disciplina de Programação Web — URI 2026/1.

## 🚀 Tecnologias Utilizadas

### Front-end
- **React** (com Vite) — biblioteca para construção da interface
- **Tailwind CSS** — estilização com classes utilitárias
- **JavaScript (JSX)** — linguagem dos componentes

### Back-end / Banco de Dados
- **Supabase** — plataforma Backend as a Service com:
  - **PostgreSQL** — banco de dados relacional
  - **Supabase Auth** — autenticação de usuários (login/cadastro)
  - **API REST automática** — gerada a partir das tabelas
  - **Row Level Security (RLS)** — segurança por usuário

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- Conta no Supabase (já configurada)

### Passo a passo

1. Clone o repositório:
```bash
git clone https://github.com/jvmenezes11/world-peas.git
cd world-peas
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente — crie um arquivo `.env` na raiz:
VITE_SUPABASE_URL=https://tvpnsbwhcwtzdpfsjfof.supabase.co

VITE_SUPABASE_ANON_KEY=sua_chave_anon_aqui

4. Rode o projeto:
```bash
npm run dev
```

5. Acesse no navegador: `http://localhost:5173`

## 🗄️ Estrutura do Banco de Dados

### Tabela `products`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | int8 | Identificador único |
| name | text | Nome do produto |
| price | float4 | Preço original |
| unit | text | Unidade (kg, molho, unidade) |
| origin | text | Cidade de origem |
| image | text | URL da imagem |
| description | text | Descrição e benefícios |
| on_sale | boolean | Se está em promoção |
| discount_price | float4 | Preço com desconto |

### Tabela `orders`
| Coluna | Tipo | Descrição |
|--------|------|-----------|
| id | int8 | Identificador único |
| user_id | uuid | Referência ao usuário autenticado |
| items | jsonb | Produtos do pedido (JSON) |
| total | numeric | Valor total do pedido |
| status | text | Status (pendente/cancelado) |
| created_at | timestamp | Data do pedido |

## 🔌 Rotas da API (Supabase REST)

O Supabase gera automaticamente uma API REST para cada tabela. A URL base é:
https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1

### Produtos

#### GET /products — Listar todos os produtos
GET https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1/products

Headers:

apikey: sua_chave_anon

Authorization: Bearer sua_chave_anon
Resposta:
```json
[
  {
    "id": 1,
    "name": "Tomate Heirloom",
    "price": 5.99,
    "unit": "kg",
    "origin": "Petrolina, PE",
    "image": "https://...",
    "description": "Rico em licopeno...",
    "on_sale": true,
    "discount_price": 4.49
  }
]
```

#### GET /products?id=eq.1 — Detalhe do produto
GET https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1/products?id=eq.1

Headers:

apikey: sua_chave_anon

Authorization: Bearer sua_chave_anon

#### GET /products?name=ilike.*tomate* — Buscar produto por nome
GET https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1/products?name=ilike.*tomate*

Headers:

apikey: sua_chave_anon

Authorization: Bearer sua_chave_anon

#### GET /products?on_sale=eq.true — Listar promoções
GET https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1/products?on_sale=eq.true

### Pedidos (autenticado)

#### GET /orders — Listar pedidos do usuário logado
GET https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1/orders

Headers:

apikey: sua_chave_anon

Authorization: Bearer token_do_usuario

#### POST /orders — Criar pedido
POST https://tvpnsbwhcwtzdpfsjfof.supabase.co/rest/v1/orders

Headers:

apikey: sua_chave_anon

Authorization: Bearer token_do_usuario

Content-Type: application/json

Body:

{

"user_id": "uuid-do-usuario",

"items": [{"id":1,"name":"Tomate Heirloom","price":4.49,"qty":2}],

"total": 12.97,

"status": "pendente"

}

## 🎯 Funcionalidades

- ✅ Home com banner e carrossel de produtores
- ✅ Catálogo de produtos com busca em tempo real
- ✅ Ordenação (Padrão/A-Z) e visualização (Grade/Lista)
- ✅ Página de detalhes do produto com descrição e benefícios
- ✅ Carrinho com subtotal, desconto, frete simulado e cupom
- ✅ Sistema de promoções com preço cortado
- ✅ Cupons de desconto (URI10, VERDE20, FRESH15)
- ✅ Frete grátis para pedidos acima de R$ 200
- ✅ Autenticação (cadastro e login de usuários)
- ✅ Checkout funcional com pedido salvo no banco
- ✅ Histórico de pedidos com opção de cancelamento
- ✅ Layout responsivo (mobile/desktop)

## 🎟️ Cupons Disponíveis

| Código | Desconto |
|--------|----------|
| URI10 | 10% |
| VERDE20 | 20% |
| FRESH15 | 15% |

## 👨‍💻 Autor

João Menezes — RA: 108859 — URI 2026/1