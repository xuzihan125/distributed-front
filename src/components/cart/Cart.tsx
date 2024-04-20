import React, {useState} from "react";
import {Container, Typography, Button, Grid, Box} from "@mui/material";
import CartStyle from "./CartStyles";
import CartItem from "../cartItem/CartItem";
import { Link } from "react-router-dom";
import ProductType from "../Product/ProductType";
import formatter from "../../assets/Formatter/CurrencyFormatter";
import axios from "axios";
import {API_BASE_URL} from "../../assets/config.js";
import Alert from "@mui/material/Alert";

function Cart(Props:{
    user:{username:string, password:string},
    products:Array<ProductType>,
    cart:{[key: string]: any;},
    handleUpdateCartQty:(id:string, quantity:number)=>void,
    handleEmptyCart:()=>void,
    handleRemoveFromCart:(id:string)=>void,
}) {
    const products = Props.products;
    const cart = Props.cart;
    const handleUpdateCartQty = Props.handleUpdateCartQty;
    const handleEmptyCart = Props.handleEmptyCart;
    const handleRemoveFromCart = Props.handleRemoveFromCart;
    const user = Props.user;

    const emptyCart = () => (
        <Typography variant="subtitle1">
            You have no items in your cart, start shopping {"=>"}
            <Link to="/" style={CartStyle.link}>
                Start adding some items
            </Link>
        </Typography>
    );

    const [alter, setAlert] = useState("");
    const [success, setSuccess] = useState("");

    const buyProduct = async () => {
        //todo function to actually buy product, send request back to the server and await for the response.
        try{
            const response = await axios.post(`${API_BASE_URL}/product/buyProduct`, {cart:cart,username:user.username});
            console.log(response.data)
            if(response.data.code===0){
                setSuccess("your purchase is under process");
                setAlert("");
                handleEmptyCart()
            }
            else{
                setAlert(response.data.message);
                setSuccess("");
            }
        }catch (e){
            setAlert("error occur. please retry");
            setSuccess("");
        }
    }
    const filledCart = () => {
        let total = "";
        let sum = 0;
        for(let key in cart){
            let tempo = products.find((product)=> product.id.toString() === key)
            if(!tempo){
                sum = -1;
                total = `error, product not find:${key}`;
                break;
            }
            sum = sum + tempo['price'] * cart[key];
        }
        if(sum!==-1){
            total = formatter.format(sum);
        }


        return (
            <React.Fragment>
                <Grid container spacing={3}>
                    {Object.entries(cart).map(([key,value]) => (
                        <Grid item xs={12} sm={6} md={3} key={key}>
                            <CartItem
                                products={products}
                                item={key}
                                quantity={value}
                                handleUpdateCartQty={handleUpdateCartQty}
                                handleRemoveFromCart={handleRemoveFromCart}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div style={CartStyle.cardDetails}>
                    <Typography variant="h4">
                        Subtotal : {total}
                    </Typography>
                    <div>
                        <Button
                            style={CartStyle.emptyButton}
                            onClick={handleEmptyCart}
                            size="large"
                            type="button"
                            variant="contained"
                            color="secondary"
                        >
                            Empty Cart
                        </Button>
                        <Box sx={{ width: 16 }} />
                        <Button
                            style={CartStyle.emptyButton}
                            onClick={buyProduct}
                            size="large"
                            type="button"
                            variant="contained"
                            color="success"
                        >
                            Buy
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    // if cart is undefined because API is still loading
    // if (cart.line_items === undefined) return "LOADING";

    return (
        <Container>
            <Typography style={CartStyle.title} variant="h3" gutterBottom>
                Your Shopping Cart
            </Typography>
            {
                alter &&
                <Alert severity="error">{alter}</Alert>
            }
            {
                success &&
                <Alert severity="success">{success}</Alert>
            }
            {Object.keys(cart).length === 0 ? emptyCart() : filledCart()}
        </Container>
    );
}

export default Cart;
