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
import Login from "./pages/Login";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Auth from "./pages/Auth";
import { Profile } from "./pages/Profile";

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
            <Route path="/login" element={
            <div className="App">
                <Auth/>
            </div>
            } />
            <Route path="/profile" element={
            <div className="App">
                <Profile/>
            </div>
            } />
      </Route>
    </Routes>
  </>
  );
}
//export default App;
