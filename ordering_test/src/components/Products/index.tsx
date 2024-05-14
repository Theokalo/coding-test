import { useState, useEffect, FC } from 'react'
import { toast } from 'react-toastify';
import './Products.css'
import { OwnProps, ProductsTypes } from './types';
import { useGetAllProducts } from '../../api/getAllProducts.api';
import ProductsCard from './ProductsCard';

const Products:FC<OwnProps> = props => {
    const [numberOfItems, setNumberOfItems] = useState<number>(12);
    const [hideLoadMore, setHideLoadMore] = useState<boolean>(false);
    const {data, isFetching} = useGetAllProducts();
    // check if there is more products in order to show the load more button
    useEffect(() => {        
        if (!isFetching && Array.isArray(data) && data?.length <= numberOfItems) {
            setHideLoadMore(true)
        } else {
            setHideLoadMore(false)
        }
    }, [data, numberOfItems])
    // load more function
    const loadMore = () => {
        setNumberOfItems(numberOfItems+6)
    }

    const add = (item: ProductsTypes) => {
        props.addCallback(item)
        toast.success('Product added successfully')
    }
    return (
        <div className="products_container">
            {/* load products */}
            {!isFetching && data && 
                <ProductsCard
                    data={data}
                    numberOfItems={numberOfItems}
                    add={add}
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

export default Products;