import '../App.css'
import ProductCard from '../components/ProductCard'
import { useFetch } from '../hooks/useFetch'
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

    const { data, error, loading } = useFetch<ProductResponse>('https://dummyjson.com/products?limit=12')

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>Error</h1>

    return (
        <div>
            <h1 className='home-hero-title'>Premium Products at Budget Prices</h1>
            <h2 className='home-hero-subtitle'>Experience high-quality products without the premium price tag</h2>
            {data &&
                <div>
                    <h1 className='products-title'>Products</h1>
                    <div className="product-container">
                        {data.products.map(item => (
                            <ProductCard key={item.id} item={item} />
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Home
