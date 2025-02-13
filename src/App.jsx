import { useState } from "react";
import "./App.css";

import { Layout, Nav } from "./components";
import Router from "./Router";

function App() {
  return (
    <>
      <Nav />
      <Layout>
        <Router />
      </Layout>
    </>
  );
}

export default App;
