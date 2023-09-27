import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
  } from "react-router-dom";
import { GlobalRoutes } from "./components/Routes/GlobalRoutes";
import { KitchenRoutes } from "./components/Routes/KitchenRoutes";
import { LoginRoutes} from "./components/Routes/LoginRoutes";

import { Home } from "./pages/Home/Home";
import { Kitchen } from "./pages/Kitchen/Kitchen";
import { Login } from "./pages/Login/Login";
import { OrdersPage } from "./pages/OrdersPage/OrdersPage";


  export function AppRoutes() {
    return (
      <Router>
        <Routes>

          {/* Home Routes */}
            <Route path ="/" element= {<Navigate to="/home" replace/>}/>
          {/* Home Routes */}
          <Route element={<GlobalRoutes/>}>
            <Route path ="/home" element={<Home/>} exact/>            
            <Route path ="/orders" element={<OrdersPage/>} exact/>
          </Route>  

          <Route element={<KitchenRoutes/>}>
            <Route path ="/kitchen" element={<Kitchen/>} exact/>            
          </Route>  

          {/* Auth Rotes */}            
          <Route element={<LoginRoutes/>}>
            <Route path ="/login" element={<Login/>} exact/>
          </Route>  
        <Route path="*" element={<Navigate to="/home" replace/>}/>
        </Routes>
        </Router>
    );
    }
