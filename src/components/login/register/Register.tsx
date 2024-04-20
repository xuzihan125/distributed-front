import * as React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Container, Divider, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {API_BASE_URL} from "../../../assets/config.js";
import Alert from "@mui/material/Alert";

function Login(Props:{setGlobalUser:(tempo:{username:string, password:string})=>void}){

    const [ loggingIn, setLogingIn ] = useState(false);
    const [ alter, setAlert] = useState("");
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const setGlobalUser = Props.setGlobalUser;
    const [doublePassword, setDoublePassword] = useState("")
    const navigate = useNavigate();

    const changeUsername = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUser({
            username: event.target.value,
            password: user.password,
        })
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setUser({
            username: user.username,
            password: event.target.value,
        })
    }

    const changeDoublePasssword = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setDoublePassword(event.target.value)
    }

    const onClick = async ()=>{
        setLogingIn(true);
        if(user.password !== doublePassword){
            setAlert("two password doesn't match");
            return;
        }
        try {
            const response = await axios.post(`${API_BASE_URL}/user/addUser`, {
                username: user.username,
                password: user.password,
            });
            if(response.data.code===0){
                setGlobalUser(user)
                navigate('/')
            }
            else{
                setAlert(response.data.message);
            }
            // 处理返回的数据
        } catch (error) {
            // 处理错误
            console.error('Error:', error);
        }
        finally {
            setLogingIn(false)
        }
    }


    return (
        <Container>
            <h2>Register</h2>
            <Grid container spacing={3}>
                {
                    alter &&
                    <Grid item xs={12}>
                        <Alert severity="error">{alter}</Alert>
                    </Grid>
                }
                <Grid item xs={12}>
                    <TextField required label="username" value={user.username} onChange={changeUsername} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required label="password" value={user.password} onChange={changePassword} />
                </Grid>
                <Grid item xs={12}>
                    <TextField required label="retype password" value={doublePassword} onChange={changeDoublePasssword} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="button"
                        size="small"
                        onClick={onClick}
                    >
                        register
                    </Button>
                    {loggingIn &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </Grid>
                <Grid item xs={12}>
                    <Link to={"/login"}>
                        <Button
                            type="button"
                            size="small"
                        >
                            cancel
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login;
