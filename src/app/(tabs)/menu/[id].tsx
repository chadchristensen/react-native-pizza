import { Stack, useLocalSearchParams } from 'expo-router';

import { Text, View } from 'react-native';

const ProductDetailsView = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Stack.Screen options={{ title: 'Details' }} />
            <Text>Pizza ID: {id}</Text>
        </View>
    )
}

export default ProductDetailsView;