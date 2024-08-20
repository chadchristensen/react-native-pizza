import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import Colors from "@/src/constants/Colors";
import { Product } from "@/src/types";
import { Link } from "expo-router";

export const defaultPizzaImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <Link href={`/${product.id}`} asChild>
            <Pressable style={styles.container}>
                <Image source={{ uri: product.image || defaultPizzaImage }} alt={product.name} style={styles.image} />
                <Text style={styles.title}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
            </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        maxWidth: '50%'
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    price: {
        color: Colors.light.tint
    },
    image: {
        width: '100%',
        aspectRatio: 1,
        resizeMode: 'contain'
    }
});

export default ProductListItem;