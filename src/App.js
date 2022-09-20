// import logo from './logo.svg';
import './App.css';
import { UserContextProvider } from './context/user';
import { Home } from "./Pages";

function App() {
  return (
    <UserContextProvider>
    <div className="App">
          <Home />
    </div>
    </UserContextProvider>
    
    
  );
}

export default App;
