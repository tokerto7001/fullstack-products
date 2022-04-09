import { useEffect, useState, useContext } from "react";
import { FormControl, InputGroup, Button, Form } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const UpdateProduct = () => {

    const [ inputs, setInputs ] = useState({name : '', price : '', category : ''});
    const {id} = useParams();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const name = e.target.name
        // console.log(e.target.value,name);
        // inputs[name] = e.target.value
        // console.log(inputs);
        setInputs({...inputs, [name] : e.target.value})
    }

    const updateProduct = () => {
        axios.patch(`/products/product/${id}`, inputs)
        .then(res => navigate(`/detail/${id}`))
        .catch(err => console.log(err))
    }

    const getProduct = () => {
        axios.get(`/products/product/${id}`)
        .then(res => setInputs(res.data.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <Button onClick={() => navigate('/')}>Go to products</Button>
                <InputGroup className="w-75" style={{ margin: '150px auto' }}>
                    <InputGroup.Text>Name</InputGroup.Text>
                    <FormControl onChange={handleChange} name='name' type='text' value={inputs.name}/>
                    <InputGroup.Text>Price</InputGroup.Text>
                    <FormControl onChange={handleChange} value={inputs.price} name='price' type='number' />
                    <Form.Select onChange={handleChange} value={inputs.category} name='category' aria-label="Default select example" style={{ width: '20%' }}>
                        <option>Open this select menu</option>
                        <option value="fruit">Fruit</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="dairy">Dairy</option>
                    </Form.Select>
                    <Button onClick={updateProduct}>Update</Button>
                </InputGroup>

        </>
    )
}
export default UpdateProduct;