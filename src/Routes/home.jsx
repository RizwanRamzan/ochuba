import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Protfolio from "../Pages/Portfolio";
import Wallet from "../Pages/Wallet";

const HomeAuthRoutes = () => {


    return (
        <Routes>
            <Route path={"*"} element={<Navigate to="/market" replace />} />
            <Route path="/market" element={<Home />} />
            <Route path="/portfolio" element={<Protfolio />} />
            <Route path="/wallet" element={<Wallet />} />
        </Routes>

    )
}

export default HomeAuthRoutes