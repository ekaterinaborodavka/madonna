import Header from "./components/Header/Header";
import Marquee from "./components/Marquee/Marquee";

import "./App.css";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

function App() {

  return (
    <>
      <Header />
      <Marquee text="DJ MADONNA " repeat={20} />
      <Main />
      <Marquee text="DJ MADONNA " repeat={20} />
      <Footer />
    </>
  );
}

export default App;
