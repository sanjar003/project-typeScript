import React, { useEffect } from "react"
import { useNavigate } from "react-router";
import { useGetProductsQuery } from "../../redux/api/productApi";
import { useState } from 'react';
import Modal from "../../components/modal/Modal";
import AddProductForm from "../../components/forms/addProductForm/AddProductFrom";
import { useToggleFavoriteProductMutation } from "../../redux/api/favoriteProductsApi";



interface HomeProps {

}



const Home: React.FC<HomeProps> = () => {
    const navigate = useNavigate();
    const { data: products = [], refetch } = useGetProductsQuery();
    const [toogleFavoriteProduct] = useToggleFavoriteProductMutation();

    const [isOpen, setIsOpen] = useState(false);



    const handleCloseModal = () => {
        setIsOpen(!isOpen);
    };



    useEffect(() => {
        const isAuth = localStorage.getItem("isAuth");
        if (isAuth !== "true") {
            navigate("/login")
        }
        refetch();
    }, [navigate])


    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("isAuth")
        navigate("/login")
    }


    return <div>
        {products.map((el: any) => {
            return <div style={{ width: "500px", height: "500px", background: "green", marginTop: "10px" }}>
                <p>{el.productName}</p>
                <button onClick={() => { toogleFavoriteProduct(el._id) }}>heart</button>
            </div>
        })}
        <button onClick={logout}>Выйти</button>
        <button onClick={handleCloseModal}>Открыть модальное окно</button>
        <Modal isOpen={isOpen} onClose={handleCloseModal}>
            <AddProductForm closeModal={handleCloseModal} />
        </Modal>
    </div>
}

export default Home;

