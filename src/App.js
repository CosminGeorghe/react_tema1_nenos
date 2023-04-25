import {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemmo,
  useCallback,
  useContext,
} from "react";
import { createContext } from "react";

const messageContext = createContext();

function App() {
  const [lastComponentMessage, setLastComponentMessage] = useState(
    "Hello from last component"
  );

  return (
    <messageContext.Provider value={lastComponentMessage}>
       <App2/>;
    </messageContext.Provider>
  );
}

function App2() {
  return <App3/>;
}

function App3() {
  const lastComponentMessage = useContext(messageContext);
  return (
    <>
      <h2>{lastComponentMessage}</h2>
    </>
  );
}

export default App;
