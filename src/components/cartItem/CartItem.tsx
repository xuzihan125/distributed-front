import React from "react";
import {
    Typography,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
} from "@mui/material";
import CartItemStyle from "./CartItemStyles";
import ProductType, {defaultProduct} from "../Product/ProductType";
import GeneralStyle from "../../assets/GeneralStyle";
import formatter from "../../assets/Formatter/CurrencyFormatter";

const CartItem = (Props:{ products:Array<ProductType>, item:string, quantity:number, handleRemoveFromCart:(id:string)=>void, handleUpdateCartQty:(id:string, quantity:number)=>void }) => {


    // console.log(item.media.source);
    const products = Props.products;
    const quantity = Props.quantity;
    const item = Props.item;
    const handleUpdateCartQty = Props.handleUpdateCartQty;
    const handleRemoveFromCart = Props.handleRemoveFromCart;
    let product = products.find((product)=> product.id.toString() === item);
    product = product || defaultProduct;

    return (
        <Card className="cart-item">
            <CardMedia
                component={"img"}
                image={product.media}
                alt={product.name}
                style={CartItemStyle.media}
            />
            <CardContent style={CartItemStyle.cardContent}>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="h5">
                    {formatter.format(quantity*product.price)}
                </Typography>
            </CardContent>
            <CardActions style={CartItemStyle.cartActions}>
                <div style={GeneralStyle.buttons}>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => {
                            handleUpdateCartQty(item, quantity - 1);
                        }}
                    >
                        -
                    </Button>
                    <Typography>&nbsp;{quantity}&nbsp;</Typography>
                    <Button
                        type="button"
                        size="small"
                        onClick={() => {
                            handleUpdateCartQty(item, quantity + 1);
                        }}
                    >
                        +
                    </Button>
                </div>
                <Button
                    variant="contained"
                    type="button"
                    color="secondary"
                    onClick={() => {
                        handleRemoveFromCart(item);
                    }}
                >
                    Remove
                </Button>
            </CardActions>
        </Card>
    );
};

export default CartItem;
