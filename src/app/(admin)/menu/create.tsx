import Button from '@/src/components/Button';
import { defaultPizzaImage } from '@/src/constants/Images';
import { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Colors from '@/src/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';

function CreateProductScreen() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const [image, setImage] = useState<string | null>(null);

    const { id } = useLocalSearchParams();
    const isUpdating = !!id;

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    const onCreate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Creating product:', name);
        resetFields();
    }

    const onUpdate = () => {
        if (!validateInput()) {
            return;
        }

        console.warn('Updating product:', name);
        resetFields();
    }

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate()
        } else {
            onCreate();
        }
    }

    const onDelete = () => {
        // Call Delete API endpoint
        console.warn('Deleting product:', name);
    }

    const onConfirmDelete = () => {
        Alert.alert('Confirm Delete', 'Are you sure you want to delete this product?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: onDelete },
        ]);
    }

    const validateInput = () => {
        // TODO: Better error handling
        setErrors([]);
        if (!name) {
            setErrors(['Name is required']);
            return false;
        }

        if (!price) {
            setErrors(['Price is required']);
            return false;
        }

        if (isNaN(parseFloat(price))) {
            setErrors(['Price must be a number']);
            return false;
        }

        return true;
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating ? 'Update Product' : 'Create Product' }} />
            <Image source={{ uri: image || defaultPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Pizza Name</Text>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput
                placeholder="9.99"
                style={styles.input}
                value={price}
                onChangeText={setPrice}
                keyboardType='numeric'
            />
            <Text style={styles.error}>{errors.join(', ')}</Text>
            <Button text={isUpdating ? 'Update' : 'Create'} onPress={onSubmit}></Button>
            {isUpdating ? <Text style={[styles.textButton, { color: 'red' }]} onPress={onConfirmDelete}>Delete</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10
    },
    label: {
        color: 'darkgray',
    },
    error: {
        color: 'red',
        marginBottom: 5
    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
        marginBottom: 10
    },
    textButton: {
        color: Colors.light.tint,
        alignSelf: 'center',
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        borderRadius: 5
    }
})

export default CreateProductScreen;