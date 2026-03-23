
import "./App.css";
import Navigation from "./components/menu/Menu";

import Footer from "./layouts/footer";
// import Exercice8 from "./exercices/Exercice8";
//import SearchElement from "./exercices/Exercice8";


export default function App() {
  // const [searchElement, setSearchElement] = useState<string>("");

  return (
    <>
      <div >
        <Navigation />
      </div>


      <Footer />
    </>
  );
}
