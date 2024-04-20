import React, {useEffect} from "react";
import Grid from "@mui/material/Grid";
import Product from "../Product/Product";
import ProductsStyles from "./ProductsStyles";
import ProductType from "../Product/ProductType";

function Products(Props:{cart:{[key:string]:number}, products:Array<ProductType>, onAddToCart:(id:string, quantity:number)=>void, fetchProducts:()=>void} ) {
    const products = Props.products;
    const onAddToCart = Props.onAddToCart;
    const cart = Props.cart;
    const fetchProducts = Props.fetchProducts;

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <main style={ProductsStyles.content}>
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product cart={cart} product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
};

export default Products;
