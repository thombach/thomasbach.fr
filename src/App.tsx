import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Router from "./components/Router";

function App() {
  return (
    <>
      <div className="px-8 sm:px-16 bg-white border-x-[1px] border-b-[1px] border-slate-100 border-solid">
        <Header />
        <main className="sm:mt-32 mt-16">
          <Router />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
