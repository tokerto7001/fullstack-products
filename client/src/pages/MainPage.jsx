import { useState } from "react";
import ProductCard from "../components/mainPage/ProductCard";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";


const MainPage = () => {
  
    const { products } = useContext(ProductContext);

    return (
        <>
            <div className="products-container">
            {products.map((el,idx) => (
                <ProductCard key={idx} productName={el.name} productId={el.id} />
            ))}
            </div>
        </>
    )
}
export default MainPage;