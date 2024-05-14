import { useState, useEffect } from 'react';
import './Customers.css'
import '../Products/Products.css';
import { useGetAllCustomers } from '../../api/getAllCustomers.api';
import CustomerCard from './CustomerCard';

const Customers = () => {
    const [numberOfItems, setNumberOfItems] = useState<number>(12);
    const [hideLoadMore, setHideLoadMore] = useState<boolean>(false);
    const {data, isFetching} = useGetAllCustomers();
    // check if there is more products in order to show the load more button
    useEffect(() => {        
        if (Array.isArray(data) && data.length <= numberOfItems) {
            setHideLoadMore(true)
        } else {
            setHideLoadMore(false)
        }
    }, [data, numberOfItems])
    // load more function
    const loadMore = () => {
        setNumberOfItems(numberOfItems+6)
    }
    return (
        <div className="customers_container">
            {/* load products */}
            {!isFetching && data && 
                <CustomerCard 
                    data={data}
                    numberOfItems={numberOfItems}
                />
            }
            {hideLoadMore === false ?
                <button className="load-more-btn" onClick={()=>{loadMore()}}>Load more</button>
                :
                ""
            }
        </div>
    )
}

export default Customers;