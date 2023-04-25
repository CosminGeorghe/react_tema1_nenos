import {
  useState,
  useEffect,
  useRef,
  useReducer,
  useMemo,
  useCallback,
  useContext,
} from "react";
import { createContext } from "react";

const messageContext = createContext();

function App() {
  const [count2, setCount2] = useState(0);
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback(() => {
    setTodos((t) => [...t, "New Todo"]);
  }, [todos]);

  const [lastComponentMessage, setLastComponentMessage] = useState(
    "Hello from last component"
  );

  const increment = () => {
    setCount2((c) => c + 1);
  };

  const expensiveCalculation = (num) => {
    console.log("Calculating...");
    for (let i = 0; i < 1000000000; i++) {
      num += 1;
    }
    return num;
  };

  const calculation = useMemo(() => expensiveCalculation(count2), [count2]);

  const [inputValue, setInputValue] = useState("");
  const count1 = useRef(0);

  const changeInputValue = (value) => {
    setInputValue(value);
  };

  useEffect(() => {
    count1.current = count1.current + 1;
  });



  return (
    <>
      <messageContext.Provider value={lastComponentMessage}>
        <App2 />;
      </messageContext.Provider>
      <>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <h1>Render Count: {count1.current}</h1>
        <Todos todos={todos} addTodo={addTodo} />
      </>
      <div>
        Count: {count2}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
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
