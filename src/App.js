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

  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

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
      <Todos todos={todos} addTodo={addTodo} />
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

const Todos = ({ todos, addTodo }) => {
  console.log("child render");
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
};

export default App;
