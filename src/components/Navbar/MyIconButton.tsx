import React, {Component, FC, ReactNode} from "react"
import generalStyle from "../../assets/GeneralStyle";
import {IconButton} from "@mui/material";
import {Link, useLocation} from "react-router-dom";

function MyIconButton({path, MyIcon}:{path:string, MyIcon:ReactNode}) {
    const location = useLocation();
    return (
        <div>
            { location.pathname !== path && (
                <div style={generalStyle.buttons}>
                    <IconButton
                        component={Link}
                        to={path}
                        aria-label="show cart"
                        color="inherit"
                    >
                        {MyIcon}
                    </IconButton>
                </div>
            )}
        </div>
        );
}

export default MyIconButton;
