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
import Inventory from "./pages/Inventory";

export default function App() {
  return (
  <>
    <AppBar />
    <Routes>
      <Route >
          <Route path="/" element={
            <div className="App">
              <PalletPage />
            </div>
          } />
          <Route path="/third-party" element={
            <div className="App">
                <ThirdParty/>
            </div>
            } />
            <Route path="/inventory" element={
              <div className="App">
                  <Inventory/>
              </div>
              } />
      </Route>
    </Routes>
  </>
  );
}
//export default App;
