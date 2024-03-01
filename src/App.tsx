import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./components/Router";

function App() {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default App;
