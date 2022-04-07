import { createContext, useState } from "react";


export const ProductContext = createContext();

const ProductContextProvider = (props) => {

    const [ products, setProducts ] = useState([
        {
            name : 'Fairy Eggplant',
            price : 1,
            category : 'vegetable',
            id: Math.ceil(Math.random() * 500)
        },
        {
            name : 'Organic Goddes Melon',
            price : 5,
            category : 'fruit',
            id: Math.ceil(Math.random() * 500)
        },
        {
            name : 'Orange',
            price : 3,
            category : 'fruit',
            id: Math.ceil(Math.random() * 500)
        },
        {
            name : 'Chocolate Whole Milk',
            price : 6,
            category : 'dairy',
            id: Math.ceil(Math.random() * 500)
        },
        {
            name : 'Organic Celery',
            price : 5.90,
            category : 'vegetable',
            id: Math.ceil(Math.random() * 500)
        },
    ])


    const deleteProduct = (id) => {
        const newProducts = products.filter((el) =>  el.id != id);
        setProducts(newProducts);
    }

    return (
        <ProductContext.Provider value={{products, deleteProduct}}>
            {props.children}
        </ProductContext.Provider>
    )
}

export default ProductContextProvider;