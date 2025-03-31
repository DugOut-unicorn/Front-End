import { useState } from "react";
import dugout from "./assets/main_logo.png";
import "./App.css";
import LoginMemberShip from "./pages/Loginpage/components/LoginMemberShip";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <h1>Dugout</h1>
      <img src={dugout} width={100} height={100}></img>
      <div className="card">
        <button onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
      </div> */}
      
      <LoginMemberShip/>
    </>
  );
}

export default App;
