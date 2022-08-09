// **импорты
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Stories from "../Stories/Stories";
import Footer from "../Footer/Footer";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  // **стейты

  // DOM
  return (
    <BrowserRouter>
      <Header />
      <main className="content">
        <Routes>
          <Route exact path="/" element={<Main/>}></Route>
          <Route path="/stories:id" element={<Stories/>}></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

// **экспорт
export default App;
