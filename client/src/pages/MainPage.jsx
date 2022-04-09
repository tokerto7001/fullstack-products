import { useState } from "react";
import ProductCard from "../components/mainPage/ProductCard";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from 'axios'
import { useEffect } from "react";


const MainPage = () => {
    const navigate = useNavigate();
    const [ products, setProducts ] = useState([])

    const getProducts = () => {
        axios.get('/products')
        .then(res => {setProducts(res.data.data)} )
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <>
        <Button onClick={() => navigate('/add')}>Add product</Button>
            <div className="products-container">
            {products?.map((el,idx) => (
                <ProductCard key={idx} productName={el.name} productId={el._id} />
            ))}
            </div>
        </>
    )
}
export default MainPage;