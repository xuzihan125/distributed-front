interface ProductType {
    media: string,
    name: string,
    description: string,
    id: string,
    price:number,
    amount:number
}

const defaultProduct : ProductType = {
    media:"",
    name: "not exist",
    description: "product not exist",
    id:"invalid",
    price:-1,
    amount:-1,
}

export {defaultProduct};
export default ProductType;
