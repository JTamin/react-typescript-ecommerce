import { useParams } from "react-router";
import { useCartContext } from "../context/cartContext";
import { useFetch } from "../hooks/useFetch";
import '../App.css'
type Product = {
    id: number,
    title: string,
    price: number,
    images: string[],
    description: string,

}

const ProductDetails = () => {
    const params = useParams();
    const { add, increase, decrease, itemQuantity } = useCartContext();
    const { data, loading, error } = useFetch<Product>(`https://dummyjson.com/products/${params.id}`);

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error</h1>
    return (
        <div className="product-details">
            <img className="product-image" src={data?.images?.[0]} alt={data?.title} />
            <h1 className="product-title">{data?.title}</h1>
            <p className="product-price">${data?.price}</p>
            <p className="product-description">{data?.description}</p>
            <div className="quantity-control">
                <button className="quantity-btn" onClick={() => decrease(data?.id!)}>-</button>
                <span className="quantity-value">{itemQuantity(data?.id!)}</span>
                <button className="quantity-btn" onClick={() => increase(data?.id!)}>+</button>
                <button className="add-btn" onClick={() => add(data!)}>Add to cart</button>
            </div>
        </div>
    )
}

export default ProductDetails
