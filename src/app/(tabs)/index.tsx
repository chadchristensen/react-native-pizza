import { StyleSheet } from 'react-native';

import { View } from '@/src/components/Themed';

import products from '@/assets/data/products';
import ProductListItem from '@/src/components/ProductListItem';

export default function MenuScreen() {
  return (
    <View>
      <ProductListItem product={products[1]} />
      <ProductListItem product={products[0]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  }
});
