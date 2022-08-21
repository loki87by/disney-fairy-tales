import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Stories from "../Stories/Stories";
import Footer from "../Footer/Footer";
import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [headerText, setHeaderText] = useState("Волшебные сказки");

  React.useEffect(() => {
    window.addEventListener("popstate", () => {
      setHeaderText("Волшебные сказки");
    });
    return () => {
      window.removeEventListener("popstate", () => {
        setHeaderText("Волшебные сказки");
      });
    };
  }, []);

  return (
    <BrowserRouter>
      <Header headerText={headerText} />
      <main className="content">
        <Routes>
          <Route
            exact
            path="/"
            element={<Main setHeaderText={setHeaderText} />}
          ></Route>
          <Route
            path="/stories:id"
            element={<Stories setHeaderText={setHeaderText} />}
          ></Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
