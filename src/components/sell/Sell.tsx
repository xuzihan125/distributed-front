import * as React from 'react';
import {Link} from "react-router-dom";
import {useState} from "react";
import {Button, Card, CardMedia, Container, Input, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import axios from "axios";
import {API_BASE_URL} from "../../assets/config.js";
import Alert from "@mui/material/Alert";

function Login(){

    const [ product, setProduct ] = useState({
        media: "",
        name: "",
        description: "",
        price:"",
        amount:"",
    });
    const [uploading, setUploading] = useState(false)
    const [alter, setAlert] = useState("")
    const [success, setSuccess] = useState("")

    const changeMedia = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const file = event.target.files?.[0]; // 获取用户选择的文件
        if (file) {
            const reader = new FileReader(); // 创建一个文件读取器
            reader.onloadend = () => {
                setProduct(
                    {
                        ...product,
                        media: reader.result as string,
                    }
                )
            };
            reader.readAsDataURL(file); // 读取文件内容并触发 onloadend 事件
        }
    }

    const deleteMedia = (event: React.ChangeEvent<HTMLDivElement>) => {
        setProduct(
            {
                ...product,
                media: ""
            }
        )
    }

    const changeDescription = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setProduct(
            {
                ...product,
                description: event.target.value,
            }
        )
    }
    const changePrice = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value;

        if (value === '' || (parseFloat(value) >= 0 && /^\d+(\.\d{0,2})?$/.test(value))) {
            setProduct(
                {
                    ...product,
                    price: event.target.value,
                }
            )
        }
    }
    const changeAmount = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const value = event.target.value;

        if (value === '' || (parseFloat(value) >= 0 && /^\d+(\.\d{0,2})?$/.test(value))) {
            setProduct(
                {
                    ...product,
                    amount: event.target.value,
                }
            )
        }
    }
    const changeName = (event: React.ChangeEvent<HTMLInputElement>) =>{
        setProduct(
            {
                ...product,
                name: event.target.value,
            }
        )
    }

    const onClick = async () => {
        setUploading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/product/addProduct`, product);
            console.log(response.data);
            if(response.data.data === "success"){
                setSuccess("upload success");
                setAlert("");
            }
            else{
                setAlert(response.data.data);
                setSuccess("");
            }
            // 处理返回的数据
        } catch (error:any) {
            // 处理错误
            setAlert("Unexpected error occur, please retry");
            setSuccess("");
        }
        finally {
            setUploading(false)
        }
    }

    return (
        <Container>
            <h2>Sell Product</h2>
            <Grid container spacing={3} alignItems="center">
                {
                    success &&
                    <Grid item xs={12}>
                        <Alert severity="success">{success}</Alert>
                    </Grid>
                }
                {
                    alter &&
                    <Grid item xs={12}>
                        <Alert severity="error">{alter}</Alert>
                    </Grid>
                }
                <Grid item xs={12}>
                    <Card sx={{ width: 400 }}>
                        {product.media && (
                            <CardMedia
                                component="img"
                                alt="Preview"
                                image={product.media}
                                sx={{ maxWidth: '100%', height: 'auto' }}
                            />
                            )}
                        <Input fullWidth type="file" inputProps={{ accept: 'image/*' }} onChange={changeMedia}/>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required label="name" value={product.name} onChange={changeName} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required label="description" value={product.description} onChange={changeDescription} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required type="number" label="price" value={product.price} onChange={changePrice} inputProps={{
                        min: '0',
                        max: '999999.99',
                        step: '0.01',
                        pattern: '\\d+(\\.\\d{0,2})?',
                    }}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth required type="number" label="amount" value={product.amount} onChange={changeAmount} />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="button"
                        size="small"
                        onClick={onClick}
                    >
                        upload
                    </Button>
                    {uploading &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </Grid>
                <Grid item xs={12}>
                    <Link to={"/"}>
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
