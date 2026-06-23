import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Basket from "./pages/Basket";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Promotions from "./pages/Promotions";
import LoginModal from "./components/LoginModal";

function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  function handleSelectProduct(product) {
    setSelectedProduct(product);
    setPage("product");
  }

  function handleBack() {
    setSelectedProduct(null);
    setPage("shop");
  }

  function handleNavigate(target) {
    if (target === "login") {
      setShowLogin(true);
    } else if (target === "profile" && !user) {
      setShowLogin(true);
    } else {
      setPage(target);
    }
  }

  return (
    <div>
      <Navbar onNavigate={handleNavigate} page={page} user={user} />
      {page === "home" && <Home onNavigate={handleNavigate} />}
      {page === "shop" && <Shop onSelectProduct={handleSelectProduct} />}
      {page === "basket" && <Basket user={user} onRequireLogin={() => setShowLogin(true)} />}
      {page === "product" && <ProductDetail product={selectedProduct} onBack={handleBack} />}
      {page === "about" && <About />}
      {page === "profile" && <Profile user={user} />}
      {page === "promotions" && <Promotions onSelectProduct={handleSelectProduct} />}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  );
}

export default App;