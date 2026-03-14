import { Link } from "react-router-dom"
import { useCartContext } from "../context/cartContext"
import { type MouseEvent } from "react"


type Product = {
    id: number,
    title: string,
    price: number,
    images: string[]
}
type ProductCardProps = {
    item: Product
}

const ProductCard = ({ item }: ProductCardProps) => {
    const { add, itemQuantity } = useCartContext();

    const handleAdd = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        add(item);
    }
    return (
        <div key={item?.id} className='product-card'>
            <div className='product-image-container'>
                <img src={item?.images?.[0]} className='product-image' alt={item?.title} />
            </div>
            <p className='product-title'>{item?.title}</p>
            <p className='product-price'>${item?.price}</p>
            <div className='product-cta-container'>
                <div>
                    <Link to={`/product-details/${item.id}`}>
                        View Details
                    </Link>
                </div>
                <div>
                    <button className='add-cart-btn' onClick={handleAdd}>{`add to cart ${itemQuantity(item.id) !== 0 ? ` (${itemQuantity(item.id)})` : ' '}`}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
