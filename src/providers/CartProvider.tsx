import { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem, Product } from "@/src/types";
import { randomUUID } from 'expo-crypto';

type CartType = {
    items: CartItem[],
    onAddItem: (product: Product, size: CartItem['size']) => void,
    updateQuantity: (itemId: string, amount: -1 | 1) => void,
    cartTotal: number
}

export const CartContext = createContext<CartType>(
    {
        items: [],
        onAddItem: () => { },
        updateQuantity: () => { },
        cartTotal: 0
    });

const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const addItem: CartType['onAddItem'] = (product, size) => {
        const existingItem = items.find((item) => item.product.id === product.id && item.size === size)

        if (existingItem) {
            updateQuantity(existingItem.id, 1);
            return;
        }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1
        }

        setItems([newCartItem, ...items])
    }

    const updateQuantity: CartType['updateQuantity'] = (itemId, amount) => {
        const updatedItems = items
            .map((item) => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount })
            .filter((item) => item.quantity > 0);

        setItems(updatedItems);
    }
    const cartTotal = items.reduce(
        (sum, item) => (sum += item.product.price * item.quantity), 0
    );

    return (<CartContext.Provider value={{ cartTotal, items, onAddItem: addItem, updateQuantity }}>
        {children}
    </CartContext.Provider>)
}

export default CartProvider;

export const useCart = () => useContext(CartContext);