import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

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
    itemTotalPrice: (id: number) => number,

}

const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const hasCart = localStorage.getItem("cart");
        return hasCart ? JSON.parse(hasCart) : []
    })
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])
    const add = useCallback(
        (product: Product) => {
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
        }, [cart])
    const increase = useCallback(
        (id: number) => {
            setCart(prev => {
                return prev.map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                )
            })
        }, [cart])
    const decrease = useCallback(
        (id: number) => {
            setCart(prev => {
                return prev.map(item =>
                    item.id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
                ).filter(item => item.quantity > 0)
            })
        }, [cart])
    const deleteItem = useCallback(
        (id: number) => {
            setCart(prev => prev.filter(item => item.id !== id));
        }, [cart])
    const itemQuantity = useCallback(

        (id: number): number => {
            return cart.find(item => item.id === id)?.quantity ?? 0;
        }, [cart])

    const totalCart = useCallback(() => {
        const total = cart.reduce((curr, total) => curr + total.price * total.quantity, 0)
        return Number(total.toFixed(2))
    }, [cart])
    const itemTotalPrice = useCallback(
        (id: number) => {
            const total = cart.filter(item => item.id === id).reduce((curr, total) => curr + total.price * total.quantity, 0);
            return Number(total.toFixed(2))
        }, [cart])

    const value = useMemo(() => ({
        cart,
        add,
        increase,
        decrease,
        deleteItem,
        itemTotalPrice,
        itemQuantity,
        totalCart,
    }), [cart])


    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )

}

export const useCartContext = () => {
    const context = useContext(CartContext);
    return context
}

