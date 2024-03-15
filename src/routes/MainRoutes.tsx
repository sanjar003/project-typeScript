import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Registration from "../pages/registration/Registration"
import NotFound from "../pages/notFound/NotFound"
import FavotiresProducts from "../pages/favoritesProducts/FavoritesProducts"



const MainRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/favorites-products" element={<FavotiresProducts />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRoutes