import { useEffect, useState } from 'react'
import '../App.css'
type Product = {
    id: number,
    title: string,
    price: number,
    images: string[]

}
type ProductResponse = {
    products: Product[]
}



const Home = () => {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        async function fetchproduct() {
            try {
                const res = await fetch('https://dummyjson.com/products');

                if (!res.ok) {
                    return new Error('res is not ok');
                }

                const data: ProductResponse = await res.json();


                setProducts(data.products);
            } catch (error) {
                console.log(error)
            }
        }
        fetchproduct()
    }, [])



    return (
        <div>
            <h1 className='home-hero'>Premium Products at Budget Prices</h1>
            {products &&
                <div className="product-container">
                    {products.map(item => (
                        <div key={item.id} className='product-card'>
                            <div className='product-image-container'>
                                <img src={item.images?.[0]} className='product-image' />
                            </div>
                            <div>
                                {item.title}
                            </div>
                            <div>
                                {item.price}
                            </div>
                            <div>
                                <button>add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default Home
