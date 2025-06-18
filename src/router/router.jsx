import { Route, Routes } from "react-router-dom";
import Home from "../components/Home.jsx";
import Login from "../components/Login.jsx";
import ShopList from "../components/ShopList.jsx";
import OutletList from "../components/OutletList.jsx";
import Cart from "../components/Cart.jsx";

function Router(props) {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/shop-list" element={<ShopList />} />
            <Route path="/outlet-list" element={<OutletList />} />
            <Route path="/cart" element={<Cart />} />
        </Routes>
    )
}

export default Router;