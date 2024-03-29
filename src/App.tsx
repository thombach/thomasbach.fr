import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./components/Router";

function App() {
  return (
    <>
      <Header />
      <main className="sm:mt-32 mt-16">
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default App;
