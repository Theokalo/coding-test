import { FC } from "react";
import { GetOrderTypes } from "../../api/types";
import { decrQuantity, incrQuantity, removeItem } from "./helpers";

type OwnProps = {
    data: GetOrderTypes,
    updateLocalOrder: (res: GetOrderTypes | undefined) => void
}

const DetailsCard:FC<OwnProps> = props => {
    const {data, updateLocalOrder} = props;
    return (
        <>
            {data && data.items.map((item, i) => {
                return(
                    <div data-testid={`item_details_${i}`} className="card" key={i}>
                        <img src={'https://as2.ftcdn.net/v2/jpg/00/57/93/05/1000_F_57930538_Ytnz8Lk6JnQc1GA1cPfFVJ39o2KBBFUa.jpg'} alt="Denim Jeans" style={{width:"100%"}}/>
                        <h1>{item["product-id"]}</h1>
                        <p className="price">Unit price: {item["unit-price"]}€</p>
                        <div style={{display: 'inline-flex', flexDirection: 'row', alignItems: 'center', width: '40%', justifyContent: 'space-between'}}>
                            <p>Quantity: {item.quantity}</p>
                            <div style={{display: 'inline-flex', flexDirection: 'column'}}>
                                <button onClick={() => updateLocalOrder(incrQuantity(i, data))}>↑</button>
                                <button disabled={parseInt(item.quantity) === 1} onClick={() => updateLocalOrder(decrQuantity(i, data))}>↓</button>
                            </div>
                        </div>
                        <p className="price">Total price: {item.total}€</p>
                        <button className="remove_btn" onClick={() => updateLocalOrder(removeItem(i, data))}>Remove item</button>
                    </div>
                )
            })}
        </>
    )
}

export default DetailsCard;