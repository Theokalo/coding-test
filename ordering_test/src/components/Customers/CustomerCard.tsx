import { FC } from "react";
import { GetAllCustomerstypes } from "../../api/types";

type OwnProps = {
    data: GetAllCustomerstypes,
    numberOfItems: number,
}

const CustomerCard:FC<OwnProps> = props => {
    const {data, numberOfItems} = props;
    return (
        <>
            {Array.isArray(data) && data.slice(0, numberOfItems).map((element,i) => {
                return (
                    <div data-testid={`customer_card_${i}`} className="card" key={i}>
                        <img src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="Denim Jeans" style={{width:"100%"}}/>
                        <p className="price">Name: {element.name}</p>
                        <p>Since: {element.since}</p>
                        <p>Revenue: {element.revenue}€</p>
                    </div>
                )
            })}
        </>
    )
}

export default CustomerCard;