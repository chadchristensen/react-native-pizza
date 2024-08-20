import { StatusBar } from 'expo-status-bar';
import { View, Platform, FlatList } from 'react-native';
import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/src/components/CartListItem';

const CartScreen = () => {
    const { items } = useCart();
    return (
        <View>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ padding: 10, gap: 10 }}
            />
        </View>
    )
}

export default CartScreen;