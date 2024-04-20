import {createTheme} from "@mui/material/styles";

const theme = createTheme();
const GeneralStyle = {
    buttons: {
        display: "flex",
        alignItems: "center",
    },
    toolbar: theme.mixins.toolbar,
    center: {
        display: "flex",
        justifyContent: "center", /* 水平居中 */
        alignItems: "center", /* 垂直居中 */
        height: "100vh", /* 设置容器高度为视口高度 */
    }
}

export default GeneralStyle;
