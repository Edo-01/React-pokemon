import Vista from "./components/Vista";
import VistaDesktop from "./components/VistaDesktop";
import { useState, useEffect } from "react";

function App() {
  const [viewPort, setViewPort] = useState(window.innerWidth);

  useEffect(() => {
    function aggiornaSize() {
      setViewPort(window.innerWidth);
    }
    window.addEventListener("resize", aggiornaSize);
    return () => {
      window.removeEventListener("resize", aggiornaSize);
    };
  }, [viewPort]);

  if (viewPort > 700) {
    return (
      <>
        <VistaDesktop />
      </>
    );
  } else {
    return (
      <>
        <Vista />
      </>
    );
  }
}

export default App;
