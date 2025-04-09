import { Routes, Route, Outlet } from "react-router-dom";
import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { ImageBar } from "../Components/ImageBar";
import { ProductCards } from "../Components/ProductCards";
import { SearchPage } from "../Components/SearchPage";
import { CartPage } from "../Components/CartPage";
import { useState } from "react";
import { Usertransaction } from "../Components/Usertransaction";
import { Footer } from "../Components/Footer";
import { CategoryNav } from "../Components/CategoryNav";
import { SearchPageJS } from "../Components/SearchPageJS";
function UserHomePage() {
  const [categoryRefs, setCategoryRefs] = useState({}); // Store category references

  return (
    <>
      <ImageBar />
      <CategoryNav categoryRefs={categoryRefs} />
      <ProductCards setCategoryRefs={setCategoryRefs} />
      <Footer />
    </>
  );
}

function UserLayout() {
  const [value, setValue] = useState(false);
  
  return (
    <>
      <Header updateValue={setValue} />
      <Sidebar value={value} onClose={() => setValue(false)} />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserHomePage />} />
        {/* <Route path="/search" element={<SearchPage />} /> */}
        <Route path="/search" element={<SearchPageJS />} />

        <Route path="cart" element={<CartPage />} />
        <Route path="/history" element={<Usertransaction />} />
      </Route>
    </Routes>
  );
}

export default App;
