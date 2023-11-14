import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { GlobalRoutes } from "./components/Routes/GlobalRoutes";
import { KitchenRoutes } from "./components/Routes/KitchenRoutes";
import { LoginRoutes } from "./components/Routes/LoginRoutes";
import { Main } from "./pages/Main";
import { Login } from "./pages/Login";



export function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Home Routes */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Home Routes */}
        <Route element={<GlobalRoutes />}>
          <Route path="/home" element={<Main />} exact />
          <Route path="/orders" element={<Main orders />} exact />
        </Route>

        <Route element={<KitchenRoutes />}>
          <Route path="/kitchen" element={<Main kitchen />} exact />
        </Route>

        {/* Auth Rotes */}
        <Route element={<LoginRoutes />}>
          <Route path="/login" element={<Login />} exact />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
