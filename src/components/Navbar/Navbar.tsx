import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Typography,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import logo from "../../assets/logo.png";
import NarbarStyles from "./NavbarStyles";
import { Link, useLocation } from "react-router-dom";
import generalStyle from "../../assets/GeneralStyle";
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SellIcon from '@mui/icons-material/Sell';
import MyIconButton from "./MyIconButton";

const Navbar = (Props:{ totalItems:number }) => {
    // hooks
    const location = useLocation();
    const totalItems = Props.totalItems;

    return (
        <div>
            <AppBar position="fixed" style={NarbarStyles.appBar} color="inherit">
                <Toolbar>
                    <Typography
                        component={Link}
                        to="/"
                        variant="h6"
                        style={NarbarStyles.title}
                        color="inherit"
                    >
                        <img
                            src={logo}
                            alt="E-commerce"
                            height="25px"
                            style={NarbarStyles.image}
                        ></img>
                        E-commerce
                    </Typography>
                    <div className="classes.grow" />
                    {/* if we're at cart path, we wont display cart icon */}
                    <MyIconButton MyIcon={<LoginIcon/>} path={"/login"}/>
                    <MyIconButton MyIcon={<HistoryIcon/>} path={"/history"}/>
                    <MyIconButton MyIcon={
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>}
                                  path={"/cart"}/>
                    <MyIconButton MyIcon={<SellIcon/>} path={"/sell"}/>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
