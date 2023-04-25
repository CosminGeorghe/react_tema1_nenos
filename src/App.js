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

  const [inputValue, setInputValue] = useState("");
  const count = useRef(0);

  useEffect(() => {
    count.current = count.current + 1;
  });

  return (
    <>
      <messageContext.Provider value={lastComponentMessage}>
        <App2 />;
      </messageContext.Provider>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <h1>Render Count: {count.current}</h1>
    </>
  );
}

function App2() {
  return <App3 />;
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
