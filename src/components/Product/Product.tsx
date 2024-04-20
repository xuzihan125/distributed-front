import React from "react";
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    IconButton,
} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ProductStyle from "./ProductStyles";
import ProductType from "./ProductType";
import formatter from "../../assets/Formatter/CurrencyFormatter";


function Product(props:{cart:{[key:string]:number}, product:ProductType, onAddToCart:(id:string, quantity:number)=>void}) {
    // styles hooks of material UI
    // console.log(product);
    const product = props.product;
    const onAddToCart = props.onAddToCart;
    const cart = props.cart;

    function BeforeChoice(){
        return (
            <IconButton
                aria-label="Add to Cart"
                onClick={() => onAddToCart(product.id, 1)}
            >
                <AddShoppingCartIcon />
            </IconButton>
        )
    }

    function AfterChoice(){
        return (
            <IconButton
                aria-label="Add to Cart"
                onClick={() => onAddToCart(product.id, 1)}
            >
                <AddShoppingCartIcon />
            </IconButton>
        )
    }

    return (
        <Card style={ProductStyle.root}>
            <CardMedia
                style={ProductStyle.media}
                image={product.media}
                title={product.name}
            />
            <CardContent>
                <div style={ProductStyle.cardContent}>
                    <Typography variant="h5" gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {formatter.format(product.price)}
                    </Typography>
                </div>
                <Typography
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    variant="h6"
                    color={"textSecondary"}
                    gutterBottom
                />
            </CardContent>
            <Typography variant="body2" gutterBottom>
                remaining: {product.amount}
            </Typography>
            <CardActions disableSpacing style={ProductStyle.cardActions}>
                <div>
                    {cart[product.id.toString()]? BeforeChoice() : AfterChoice() }
                </div>
            </CardActions>
        </Card>
    );
};

export default Product;
