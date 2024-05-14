import { FC } from "react";
import { GetAllProductsTypes } from "../../api/types";
import { ProductsTypes } from "./types";

type OwnProps = {
    data: GetAllProductsTypes[],
    numberOfItems: number,
    add: (res: ProductsTypes) => void;
}

const ProductsCard:FC<OwnProps> = props => {
    const {data, numberOfItems, add} = props;
    return (
        <>
            {Array.isArray(data) && data.slice(0, numberOfItems).map((element,i) => {
                return (
                    <div data-testid={`${i}_product_id`} className="card" key={i}>
                        <img src={'https://as2.ftcdn.net/v2/jpg/00/57/93/05/1000_F_57930538_Ytnz8Lk6JnQc1GA1cPfFVJ39o2KBBFUa.jpg'} alt="Denim Jeans" style={{width:"100%"}}/>
                        <h1>{element.id}</h1>
                        <p className="price">Price: {element.price}€</p>
                        <p>{element.description}</p>
                            <button onClick={()=>{add(element)}} className="btn">Add to order</button>
                    </div>
                )
            })}
        </>
    )
}

export default ProductsCard;