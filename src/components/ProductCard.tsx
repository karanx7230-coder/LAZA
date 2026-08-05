import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Product } from '../types';

interface Props {
  product: Product;
  isFavorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
}

export default function ProductCard({
  product,
  isFavorite,
  onPress,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.touchbox}>
        <ImageBackground
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="contain"
        >
          <TouchableOpacity
            style={styles.favoriteTouch}
            onPress={onToggleFavorite}
          >
            <Image
              source={
                isFavorite
                  ? require('../../assets/heart1.png')
                  : require('../../assets/Heart.png')
              }
              style={styles.favoriteImage}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </ImageBackground>

        <Text style={styles.name} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          ${product.price}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    width: 'auto',
  },
  touchbox: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 170,
    borderRadius: 10,
  },
  image: {
    width: 160,
    height: 200,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  favoriteTouch: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 8,
    borderRadius: 20,
  },
  favoriteImage: {
    width: 20,
    height: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
    width: 150,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});
