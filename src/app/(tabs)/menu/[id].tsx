import { Stack, useLocalSearchParams } from 'expo-router';

import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import products from '@/assets/data/products';
import { defaultPizzaImage } from '@/src/components/ProductListItem';
import Button from '@/src/components/Button';
import { useState } from 'react';
const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetailsView = () => {
    const { id } = useLocalSearchParams();
    const [selectedSize, setSelectedSize] = useState('M');

    const product = products.find((product) => product.id.toString() === id);

    if (!product) {
        return <Text>Product not found</Text>
    }

    const addToCart = () => {
        console.warn('Adding to cart', selectedSize);
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product.name }} />
            <Image
                source={{ uri: product.image || defaultPizzaImage }}
                style={styles.image}
            />
            <Text>Select Size</Text>
            <View style={styles.sizes}>
                {sizes.map((size) => {
                    return (
                        <Pressable
                            key={size}
                            onPress={() => { setSelectedSize(size) }}
                            style={[
                                styles.size,
                                {
                                    backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
                                }
                            ]}>
                            <Text
                                style={[styles.sizeText, {
                                    fontWeight: selectedSize === size ? 'bold' : 'normal',
                                }]}
                            >{size}</Text>
                        </Pressable>
                    )
                })}
            </View>
            <Text style={styles.price}>${product.price}</Text>
            <Button text={'Add to cart'} onPress={addToCart}></Button>
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
    sizes: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10
    },
    size: {
        backgroundColor: 'gainsboro',
        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sizeText: {
        fontSize: 20
    }
})

export default ProductDetailsView;

