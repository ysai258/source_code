import * as React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";
import './App.css';
import AppBar from './pages/AppBar';
import PalletPage from "./pages/PalletPage";
import ThirdParty from "./pages/ThirdParty";

export default function App() {
  return (
      <Routes>
        <Route >
          <Route path="/" element={

            <div className="App">
              <AppBar />
              <PalletPage />
            </div>
          } />
          <Route path="/third-party" element={

            <div className="App">
                <ThirdParty/>
            </div>
            } />
          </Route>
      </Routes>
    
  );
}
//export default App;
