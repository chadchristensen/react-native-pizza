import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform, FlatList } from 'react-native';
import { useCart } from '@/src/providers/CartProvider';
import CartListItem from '@/src/components/CartListItem';
import Button from '@/src/components/Button';

const CartScreen = () => {
    const { items, cartTotal } = useCart();
    return (
        <View style={{ padding: 10 }}>
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
            <FlatList
                data={items}
                renderItem={({ item }) => <CartListItem cartItem={item} />}
                contentContainerStyle={{ gap: 10 }}
            />
            <Text>Total ${cartTotal}</Text>
            <Button text='Checkout'></Button>
        </View>
    )
}

export default CartScreen;