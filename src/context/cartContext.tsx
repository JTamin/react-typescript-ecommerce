import { createContext, useContext, useEffect, useState } from "react";

type CartProviderProps = {
    children: React.ReactNode,
}
type Product = {
    id: number,
    title: string,
    price: number,
    quantity?: number,
    images: string[]
}

type CartItem = Product & {
    quantity: number
}

type CartContextType = {
    cart: CartItem[],
    add: (product: Product) => void,
    increase: (id: number) => void,
    decrease: (id: number) => void,
    deleteItem: (id: number) => void,
    itemQuantity: (id: number) => number,
    totalCart: () => number,

}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const hasCart = localStorage.getItem("cart");
        return hasCart ? JSON.parse(hasCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        // console.log(cart)
    }, [cart])


    const add = (product: Product) => {
        setCart(prev => {
            const existingProduct = prev.find(item => item.id === product.id)
            if (existingProduct) {
                return prev.map(item =>
                    item.id === product.id ?
                        { ...item, quantity: item.quantity + 1 }
                        : item
                )
            }
            return [
                ...prev,
                { ...product, quantity: 1 }
            ]
        })
    }
    const increase = (id: number) => {
        setCart(prev => {
            return prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        })
    }
    const decrease = (id: number) => {
        setCart(prev => {
            return prev.map(item =>
                item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0)
        })
    }
    const deleteItem = (id: number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };
    const itemQuantity = (id: number): number => {
        return cart.find(item => item.id === id)?.quantity ?? 0;
    }
    const totalCart = () => {
        const cartT = cart.reduce((curr, total) => curr + total.price * total.quantity, 0)
        return cartT
    }

    return (
        <CartContext.Provider value={{ cart, add, increase, decrease, deleteItem, itemQuantity, totalCart }}>
            {children}
        </CartContext.Provider>
    )

}

export const useCartContext = () => {
    const context = useContext(CartContext);
    return context
}

