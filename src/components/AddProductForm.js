import axios from "axios";
import React, { useState } from "react"
import { Button, Form, Alert, FormGroup, Label, Input, FormText, Container, Row } from 'reactstrap';



const AddProductForm = () => {
    const initProduct = {
        name: "",
        category: "",
        price: "",
        tags: [],

    };
    const [product, setProducts] = useState(initProduct);
    const [submited, setSumited] = useState(false)
    const handleInputChange = (event) => {
        let { name, value } = event.target;
       // if (name === "tags") {
       //     value = value.split(",");
       // }
        setProducts({ ...product, [name]: value });
    };


    const saveProduct = () => {
        var data = {
            name: product.name,
            category: product.category,
            price: product.price,
            tags: product.tags
        }
        axios.post("https://api61425048.herokuapp.com/product", data)
            .then((response) => {
                console.log(response.data);
                setSumited(true);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const newProduct = () => {
        setProducts(initProduct);
        setSumited(false);
    };
    return (
        <Container>
            <Row>
                <h3>Addnew</h3>
            </Row>
            <Row>
                {submited ? (<Alert color="success">
                    Product is Added !!<br></br>
                    <Button color="btn btn-success" onClick={newProduct}>Add New Product</Button>
              </Alert>
                ) : (
                        <Form>
                            <FormGroup>
                                <Label for="productname">Product Name</Label>
                                <Input type="text"
                                    name="name"
                                    id="productName"
                                    value={product.name || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุชื่อสินค้า" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="productcategory">Product category</Label>
                                <Input type="text"
                                    name="category"
                                    id="productcategory"
                                    value={product.category || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุชื่อ" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="productprice">Product Price</Label>
                                <Input type="text"
                                    name="price"
                                    id="productprice"
                                    value={product.price || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุราคา" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="producttages">Product tages</Label>
                                <Input type="text"
                                    name="tags"
                                    id="producttags"
                                    value={product.tags || ""}
                                    onChange={handleInputChange}
                                    placeholder="ระบุแท็ก" />
                            </FormGroup>
                            <Button className="btn btn-success" onClick={saveProduct}>Add New Product</Button>
                        </Form>
                    )}
            </Row>
        </Container>

    );
};
export default AddProductForm;