import React from "react"
import EditProductForm from "../components/EditProductForm";


const EditProduct = (props) => {
    return (
        <>
            <main>
                <EditProductForm id={props.match.params.id} />
            </main>
        </>
    );
};
export default EditProduct;