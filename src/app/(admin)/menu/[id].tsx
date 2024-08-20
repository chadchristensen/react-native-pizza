import { router, Stack, useLocalSearchParams } from 'expo-router';

import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/constants/Images';
import Button from '@/src/components/Button';
import { useState } from 'react';
import { useCart } from '@/src/providers/CartProvider';

const ProductDetailsView = () => {
    const { id } = useLocalSearchParams();

    const product = products.find((product) => product.id.toString() === id);

    if (!product) {
        return <Text>Product not found</Text>
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />

            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10,
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    }
})

export default ProductDetailsView;

