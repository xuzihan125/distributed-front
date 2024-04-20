import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import ProductType from "./components/Product/ProductType";
import Cart from "./components/cart/Cart";
import History from "./components/history/History";
import GeneralStyle from "./assets/GeneralStyle";
import Login from "./components/login/login/Login";
import Register from "./components/login/register/Register";
import Sell from "./components/sell/Sell";
import {remote, API_BASE_URL} from "./assets/config.js";
import axios from "axios";

function App() {
  const [user, setUser] = useState({username:"", password:""});

  // hooks to store products from commercejs API
  const [products, setProducts] = useState<ProductType[]>([]);

  // hooks to store cart items from commercejs API
  const [cart, setCart] = useState({});

  // function to fetch products from commercejs
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product/getProduct`);
      setProducts(response.data.data);
      // 处理响应
    } catch (error) {
      console.error('Error fetching data:', error);
    }


    // const data:Array<ProductType> = [];
    // for(let i=1;i<17;i++){
    //   data.push({
    //     media:"https://cdn.chec.io/merchants/25085/assets/SGlgWDk2gEJDk7ob|keyboard.png",
    //     name: `test product ${i}`,
    //     description: `this is test product ${i}`,
    //     id:`${i}`,
    //     price:i*1.1,
    //     amount:i,
    //   })
    // }
    // // setting state as fetched products
    // setProducts(data);
  };


  // event handler to add products to cart on click of icon
  const handleAddToCart = (productId:string, quantity:number) => {
    setCart({
      ...cart,
      [productId]: quantity
    });
  };

  // to handle increment and decrement in cart items
  const handleUpdateCartQty = (productId:string, quantity:number) => {
    if(quantity > 0){
      setCart({
        ...cart,
        [productId]: quantity
      });
    }
    else{
      handleRemoveFromCart(productId);
    }
  };

  // to handle the remove button from the cart
  const handleRemoveFromCart = (productId:string) => {
    let tempo : {[key: string]: number} = {...cart}
    delete tempo[productId];
    setCart(tempo);
  };

  // to handle the empty cart button in cart route
  const handleEmptyCart =  () => {
    setCart({});
  };

  return (
      <BrowserRouter>
        <div className="App">
          <Navbar totalItems={Object.keys(cart).length} />
          <div style={GeneralStyle.toolbar} />
          <Routes>
            <Route path="/login" element={<Login setGlobalUser={setUser}/>}/>
            <Route path="/register" element={<Register setGlobalUser={setUser}/>}/>
            <Route path="/sell" element={<Sell />}/>
            <Route path="/history" element={<History user={user}/>}/>
            <Route path="/cart" element={<Cart
                products={products}
                cart={cart}
                handleUpdateCartQty={handleUpdateCartQty}
                handleEmptyCart={handleEmptyCart}
                handleRemoveFromCart={handleRemoveFromCart}
                user={user}
            />}>
            </Route>
            <Route path={"/login"} element={<Products fetchProducts={fetchProducts} cart={cart} products={products} onAddToCart={handleAddToCart}/>}/>
            <Route path="/*" element={<Products fetchProducts={fetchProducts} cart={cart} products={products} onAddToCart={handleAddToCart} />}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
