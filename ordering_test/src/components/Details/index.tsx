/**
 * This a component, which we can see the details of an order
 * Also we can modify the order and update it
 */
import Modal from 'react-modal';
import { useLocation } from "react-router-dom";
import { useGetOrder } from "../../api/getOrder.api";
import './Details.css'
import '../Products/Products.css';
import { useEffect, useState } from "react";
import { GetOrderTypes } from "../../api/types";
import { decrQuantity, isObjectDiff, incrQuantity, removeItem, addUpdateItem } from "./helpers";
import Products from '../Products';
import { useAddOrder } from '../../api/addOrder.api';
import DetailsCard from './DetailsCard';

const Details = () => {
    const {state} = useLocation();
    const {id} = state;
    const {data} = useGetOrder(id);
    const {mutateAsync} = useAddOrder();
    const [isItemsVisible, setItemsVisible] = useState<boolean>(false);
    const [dataOrder, setDataOrder] = useState<GetOrderTypes>();
    const [modalIsOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        if(data)
            setDataOrder(JSON.parse(JSON.stringify(data)));
    }, [data]);

    const updateOrder = () => {
        mutateAsync(dataOrder)
    }

    const updateLocalOrder = (data: GetOrderTypes | undefined) => {
        setDataOrder(data)
    }
    
    return (
        <div className="details_container">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customModalStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <Products addCallback={(res) => updateLocalOrder(addUpdateItem(dataOrder, res))}/>
            </Modal>
            <div data-testid={`order_detail_card`} className="order_card">
                <div className="inner">
                    <div style={{flex:1}}>
                        <p className="card_text">Order Id: {dataOrder?.id}</p>
                        <p className="price">Total price: {dataOrder?.total}</p>
                        <button onClick={() => setIsOpen(true)} className="general_btn">Add new product</button>
                    </div>
                    <div style={{flex:1}}>
                        <p className="card_text">Customer ID: {dataOrder?.["customer-id"]}</p>
                        <p className="card_text">Total items: {dataOrder?.items.length}</p>
                        <button onClick={() => setItemsVisible(true)} className="general_btn">See order's items</button>
                        <p></p>
                        <button 
                            style={{opacity: isObjectDiff(data, dataOrder) ? 1 : 0.5, cursor: !isObjectDiff(data, dataOrder) ? 'block' : 'pointer'}}
                            disabled={!isObjectDiff(data, dataOrder)} 
                            onClick={() => updateOrder()} 
                            className="place_order_btn">
                                Update order
                        </button>


                    </div>
                </div>
            </div>
                {isItemsVisible && dataOrder &&
                    <DetailsCard
                        data={dataOrder}
                        updateLocalOrder={updateLocalOrder}
                    />
                }
        </div>
   )
}

const customModalStyles = {
    content: {
        top: '20%',
        maxHeight: '700px',
        backgroundColor: '#F6F3F0'
    },
};

export default Details;