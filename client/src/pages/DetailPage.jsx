import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {Button, Card} from 'react-bootstrap';
import axios from 'axios';

const DetailPage = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()
    const navigate = useNavigate();

    const getProduct = () => {
        axios.get(`/products/product/${id}`)
        .then(res => setProduct(res.data.data))
        .catch(err => console.log(err))
    }

    const deleteItem = () => {
        axios.delete(`/products/product/${id}`)
        .then(res => navigate('/'))
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <Button onClick={() => navigate('/')}>Go to products</Button>
            <Card style={{ width: '40rem', height : '40rem', margin:'100px auto' }}>
                <Card.Img variant="top" src="/vegetable.jpeg" />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        Price : {product.price}
                    </Card.Text>
                    <Card.Text>
                        Category : {product.category}
                    </Card.Text>
                </Card.Body>
                <Card.Body style={{display:'flex', justifyContent:'center'}}>
                    <Button style={{marginRight:'10px'}}><Link style={{textDecoration:'none', color:'white'}} to={`/update/${id}`}>Update</Link></Button>
                    <Button onClick={() => deleteItem()} style={{marginLeft:'10px'}}>Delete</Button>
                </Card.Body>
            </Card>
        </>
    )
}
export default DetailPage;