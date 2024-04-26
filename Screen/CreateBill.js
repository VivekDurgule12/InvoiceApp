import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { GenPdf } from './GenPdf'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';


export default function CreateBill() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [items, setItems] = useState([{ id: 1, name: '', quantity: '', price: '', totalPrice: 0 }]);
    const [totalBill, setTotalBill] = useState(0);

    useEffect(() => {
        calculateTotalBill();
    }, [items]);

    const handleItemChange = (id, key, value) => {
        const newItems = items.map(item => {
            if (item.id === id) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setItems(newItems);
    };

    const calculateTotalBill = () => {
        let total = 0;
        items.forEach(item => {
            const totalPrice = parseFloat(item.quantity) * parseFloat(item.price);
            item.totalPrice = isNaN(totalPrice) ? 0 : totalPrice.toFixed(2);
            total += parseFloat(item.totalPrice || 0);
        });
        setTotalBill(total.toFixed(2));
    };

    const addItem = () => {
        // Check if the previous item is filled
        const prevItem = items[items.length - 1];
        if (prevItem && (!prevItem.name || !prevItem.quantity || !prevItem.price)) {
            Alert.alert(
                'Fill Empty Item',
                'Please fill all fields of the previous item before adding a new one.',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    }
                ]
            );
        } else {
            const newItem = {
                id: items.length + 1,
                name: '',
                quantity: '',
                price: '',
                totalPrice: 0
            };
            setItems([...items, newItem]);
        }
    };

    const removeItem = (id) => {
        const newItems = items.filter(item => item.id !== id);
        setItems(newItems);
    };

    const confirmDelete = (id) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this item?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Delete',
                    onPress: () => removeItem(id)
                }
            ]
        );
    };

    const createInvoice = () => {
        // Logic to create the invoice
        // For now, let's just log a message
        console.log('Invoice created!');
    };

    const PrintToPdf = () => {
        let html = GenPdf(id, name, quantity, price, totalPrice, totalBill);

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Bill</Text>
            <ScrollView>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={name}
                        onChangeText={text => setName(text)}
                        placeholder='Enter Name'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        value={address}
                        onChangeText={text => setAddress(text)}
                        placeholder='Enter Address'
                        style={styles.textInput}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Contact</Text>
                    <TextInput
                        value={contact}
                        keyboardType='number-pad'
                        onChangeText={text => setContact(text)}
                        placeholder='Enter Contact'
                        style={styles.textInput}
                    />
                </View>
                <Text style={styles.sectionTitle}>Items ({items.length})</Text>
                {items.map((item, index) => (
                    <TouchableOpacity
                        key={item.id}
                        onLongPress={() => confirmDelete(item.id)}
                        delayLongPress={500}
                    >
                        <View style={styles.itemContainer}>
                            <Text style={styles.itemNumber}>{index + 1}. </Text>
                            <TextInput
                                value={item.name}
                                onChangeText={text => handleItemChange(item.id, 'name', text)}
                                placeholder='Item Name'
                                style={[styles.textInput, styles.itemInput]}
                            />
                            <TextInput
                                value={item.quantity}
                                keyboardType='numeric'
                                onChangeText={text => handleItemChange(item.id, 'quantity', text)}
                                placeholder='Qty'
                                style={[styles.textInput, styles.itemInput]}
                            />
                            <TextInput
                                value={item.price}
                                keyboardType='numeric'
                                onChangeText={text => handleItemChange(item.id, 'price', text)}
                                placeholder='Price'
                                style={[styles.textInput, styles.itemInput]}
                            />
                            <Text style={styles.totalPrice}>Total: ₹ {item.totalPrice}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={addItem} style={styles.addButton}>
                    <Text style={styles.addButtonLabel}> Add Item</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.createInvoiceButton}
                    onPress={() => console.log("Running")}
                >
                    <Text style={styles.createInvoiceButtonText}>Create Invoice</Text>
                </TouchableOpacity>

                <Text style={styles.totalBill}>Total Bill: ₹ {totalBill}</Text>
            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 20,
        padding: 10,
        marginTop: 45
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    inputContainer: {
        marginBottom: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    itemNumber: {
        fontSize: 16,
        marginRight: 5,
        fontWeight: 'bold'
    },
    textInput: {
        flex: 1,
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10
    },
    itemInput: {
        marginHorizontal: 5
    },
    totalPrice: {
        fontWeight: 'bold',
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#000',
        fontSize: 15
    },
    addButton: {
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 4,
        marginTop: 20
    },
    addButtonLabel: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    createInvoiceButton: {
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 4,
        marginTop: 20
    },
    createInvoiceButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    totalBill: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
        color: 'green'
    }
});