import Button from '@/src/components/Button';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Colors from '@/src/constants/Colors';
import { Link, Stack } from 'expo-router';

function SignInScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);


    const resetFields = () => {
        setUsername('');
        setPassword('');
    }

    const onSignIn = () => {
        if (!validateInput()) {
            return;
        }
        // TODO: Implement API call to sign in
    }

    const validateInput = () => {
        // TODO: Better error handling
        setErrors([]);
        if (!username) {
            setErrors(['Username is required']);
            return false;
        }

        if (!password) {
            setErrors(['Password is required']);
            return false;
        }

        return true;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: 'Sign In' }} />
            <Text style={styles.label}>Username</Text>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
                style={styles.input}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                textContentType='password'
                placeholder="Password"
                secureTextEntry={true}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <Text style={styles.error}>{errors.join(', ')}</Text>
            <Button text={'Sign In'} onPress={onSignIn}></Button>
            <Link href={'/create-account'}>Create Account</Link>
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

export default SignInScreen;