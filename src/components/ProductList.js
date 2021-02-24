import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Table, Button } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' //fornt
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import confirm from "reactstrap-confirm";
const ProductList = () => {
    const [products, setProducts] = useState([]);

    const updateProducts = () => {  //สินค้าที่เอามาจากอีกไฟลงาน
        axios.get("https://api61425048.herokuapp.com/product").then((response) => {
            console.log(response);
            setProducts(response.data.product);
            console.log("Updating products.....");
        });
    };
    useEffect(() => {
        updateProducts();
    }, []);
    const deleteProduct = async (productName, productId) => {
        let result = await confirm({
            title: <>Confirm !!</>,
            message: 'คุณต้องการลบผลิตภัณไอดี "' + productName + '"ฝช่ไหม',
            confirmText: "Yes",
            confirmColor: "Primary",
            cancelText: "No",
            cancelColor: "btn btn-danger",
        });
        if (result) {
            axios.delete("https://api61425048.herokuapp.com/product/" + productId) //ลบออกจากเซิร์เวอร์
                .then((response) => {
                    updateProducts();//อัพเดทโดยไม่ต้องรีเฟรซ
                });
        }
    };
    return (
        <Container>
            <Row>
                <h3>Product List</h3>
            </Row>
            <Row>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.category}</td>
                                    <td>{product.price}</td>
                                    <td>
                                        <Button color="info" href={"/edit/" + product._id}>
                                            <FontAwesomeIcon icon={faEdit} />  Edit
                        </Button>{" "}
                                        <Button color="danger"
                                            onClick={() => deleteProduct(product.name, product._id)}> <FontAwesomeIcon icon={faTrash} />Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}
export default ProductList;