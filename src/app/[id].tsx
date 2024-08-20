import { useLocalSearchParams } from 'expo-router';

import { Text } from 'react-native';

const ProductDetailsView = () => {
    const { id } = useLocalSearchParams();
    return (
        <Text>Pizza ID: {id}</Text>
    )
}

export default ProductDetailsView;