import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import formatter from "../../assets/Formatter/CurrencyFormatter";
import axios from "axios";
import {API_BASE_URL} from "../../assets/config.js";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import CartStyle from "../cart/CartStyles";

function createData(
    id: string,
    cost: number,
    status: string,
    time: Date,
) {
    return {
        id,
        cost,
        status,
        time,
        detail: [
            {
                name:"123",
                status: "success",
                price:1,
                quantity:2
            },
            {
                name:"234",
                status: "success",
                price:2,
                quantity:4
            },
        ],
    };
}

function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);



    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.id}
                </TableCell>
                <TableCell align="right">{row.time.toString()}</TableCell>
                <TableCell align="right">{row.cost}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Detail
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell align="right">Unit Price ($)</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                        <TableCell align="right">Total Price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.detail.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {item.name}
                                            </TableCell>
                                            <TableCell>{item.status}</TableCell>
                                            <TableCell align="right">{item.price}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                            <TableCell align="right">
                                                {formatter.format(item.quantity * item.price)}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// const rows = [
//     createData('2024-04-10 14:30:00', 10, "success", ),
//     createData('2024-04-10 14:30:00', 10, "success",),
//     createData('2024-04-10 14:30:00', 10, "success",),
//     createData('2024-04-10 14:30:00', 10, "success",),
//     createData('2024-04-10 14:30:00', 10, "success",),
// ];

export default function CollapsibleTable(Props:{user:{username:string, password:string}}) {

    const [rows, setRows] = useState([]);

    const fetchData = async () =>{
        try {
            console.log(Props.user.username);
            const response = await axios.post(`${API_BASE_URL}/product/getHistory`, Props.user.username);
            setRows(response.data.data);
            // 处理响应
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Order ID</TableCell>
                        <TableCell align="right">Order Time</TableCell>
                        <TableCell align="right">Cost</TableCell>
                        <TableCell align="right">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={index} row={row} />
                    ))}
                </TableBody>
            </Table>
            <Button
                style={CartStyle.emptyButton}
                onClick={fetchData}
                size="large"
                type="button"
                variant="contained"
                color="success"
            >
                refresh
            </Button>
        </TableContainer>

    );
}
