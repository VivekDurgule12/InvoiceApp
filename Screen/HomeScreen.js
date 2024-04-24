import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>HomeScreen </Text>
            <TouchableOpacity style={styles.button}>
                <Text>Create Bill!</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 40,
        width: 100,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20 // Adding some spacing between text and button
    }
});
