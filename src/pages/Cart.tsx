import { useCartContext } from "../context/cartContext"

const Cart = () => {
    const { cart, itemQuantity, increase, decrease, deleteItem, totalCart, itemTotalPrice, clearCart } = useCartContext()
    return (
        <div className="checkout-container">
            <div className="checkout-grid">
                {/* Left column: cart items */}
                <div className="cart-items">
                    <h1 className="checkout-title">Checkout</h1>
                    <div className="cart-checkout-container">
                        {cart.length !== 0
                            ? cart.map(item => (
                                <div className="cart-item" key={item.id}>
                                    <img className="cart-item-image" src={item.images[0]} alt={item.title} />
                                    <p className="cart-item-title">{item.title}</p>
                                    <p className="cart-item-price">${item.price}</p>
                                    <div className="quantity-control">
                                        <button className="quantity-btn" onClick={() => decrease(item.id)}>-</button>
                                        <span className="quantity-value">{itemQuantity(item.id)}</span>
                                        <button className="quantity-btn" onClick={() => increase(item.id)}>+</button>
                                    </div>
                                    <p className="cart-item-total">Total: ${itemTotalPrice(item.id)}</p>
                                    <button className="remove-btn" onClick={() => deleteItem(item.id)}>Remove</button>
                                </div>
                            )) :
                            <h1 className="checkout-no-item-tx">No Item...</h1>
                        }
                    </div>
                </div>

                {/* Right column: total summary */}
                <div className="checkout-summary">
                    <h2 className="summary-title">Order Summary</h2>
                    <p className="summary-subtotal">Subtotal: ${totalCart()}</p>
                    <p className="summary-total">Total: ${totalCart()}</p>
                    <button onClick={clearCart}>Clear cart</button>
                    <button className="checkout-btn" disabled={cart.length === 0} onClick={() => {
                        alert('success')
                        clearCart()
                    }}>Checkout</button>
                </div>
            </div>
        </div>
    )
}
export default Cart