import { View, Text, Image, StyleSheet } from "react-native"
import Colors from "@/src/constants/Colors";
import { Product } from "@/src/types";

const ProductListItem = ({ product }: { product: Product }) => {
    return (
        <View style={styles.container}>
            {product.image ?
                <Image source={{ uri: product.image }} alt={product.name} style={styles.image} />
                : null
            }
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.price}>${product.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 10,
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
    }
});

export default ProductListItem;