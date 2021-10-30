import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from "axios";

import products from "../../data/products.json";
import { storeItems, getItems } from '../../itemsStorage'
import { storeOrders, getOrders } from '../../ordersStorage'

export default function Details() {

    const [ordersList, setOrdersList] = useState();
    const [order, setOrder] = React.useState();
    const [selectedItem, setSelectedItem] = React.useState('null');
    const [quantity, setQuantity] = React.useState(1);

    useEffect(() => {
        getItems().then((a) => { setOrder(a) });
        getOrders().then((a) => { setOrdersList(a) })
    }, []);

    return (
        <View style={styles.container}>
            {listItems()}
            <Text>Total: {getTotal(order)}</Text>
            <View style={{ flexDirection: "row", padding: 10, margin: 20 }}>
                <Picker
                    selectedValue={selectedItem}
                    onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)} >
                    <Picker.Item label="Select Item" value="null" />
                    {products.map((item, key) =>
                        <Picker.Item label={item.description} value={item.id} key={key} />
                    )}
                </Picker>
                <TextInput
                    keyboardType='number-pad'
                    onChangeText={(setQuantity)}
                    value={quantity}
                    style={{ borderWidth: 1, width: 50, marginHorizontal: 20 }}
                />
                <Button onPress={() => { addItem(selectedItem, Number(quantity)) }} title="Add Item"></Button>
            </View>
            <Button onPress={() => {
                axios.post('http://httpbin.org/post', order).then((res) => {
                    if (res.status == "200") {
                        alert('Order placed successfully')
                    }
                    else {
                        alert('Fail')
                    }
                })
            }} title="Place Order"></Button>
        </View>
    );

    function getDescription(id) {
        let description;
        for (let j = 0; j < products.length; j++) {
            if (products[j].id == id) {
                description = products[j].description;
            }
        }
        return description;
    }

    function deleteItem(itemId) {
        let total = 0;
        let items_arr = JSON.parse(order).items;
        let order_arr = JSON.parse(order);
        let orders_list_arr = JSON.parse(ordersList);

        items_arr.splice(itemId, 1);
        order_arr.items = items_arr;
        total = getTotal(JSON.stringify(order_arr));
        order_arr.total = total;
        orders_list_arr[(order_arr.id) - 1] = order_arr;

        setOrder(JSON.stringify(order_arr));
        orders_list_arr.total = total;
        setOrdersList(JSON.stringify(orders_list_arr));

        storeOrders(JSON.stringify(orders_list_arr));
        storeItems(JSON.stringify(order_arr));
    }

    function listItems() {
        if (order != null) {
            return JSON.parse(order).items.map((data, key) => {
                getDescription(key);
                return (
                    <View key={key} style={{ borderWidth: 1, padding: 10, margin: 10, borderRadius: 10, width: 250 }} className="row">
                        <View style={{ padding: 10, margin: 10 }}>
                            <Text>Product-id: {data['product-id']}</Text>
                            <Text>Description: {getDescription(data['product-id'])}</Text>
                            <Text>Quantity: {data.quantity}</Text>
                            <Text>Unit price: {data['unit-price']}</Text>
                            <Text>Total: {data.total}</Text>
                        </View>
                        <Button title="Delete item" onPress={() => { deleteItem(key) }}></Button>
                    </View>
                )
            }
            )
        }
    }

    function getTotal(order) {
        if (order != null) {
            let sum = 0;
            for (let i = 0; i < JSON.parse(order).items.length; i++) {
                sum += parseFloat(JSON.parse(order).items[i].total);
            }
            return sum;
        }
    }

    function addItem(selectedItem, quantity) {
        if (selectedItem != "null" && quantity != 0 && !isNaN(quantity)) {
            let price = 0;
            let total = 0;
            let items_arr = JSON.parse(order).items;
            let order_arr = JSON.parse(order);
            let orders_list_arr = JSON.parse(ordersList);
            let item_exists = 0;
            let products_arr = products.filter(products => products.id == selectedItem);

            price = Number(products_arr[0].price);
            item_exists = items_arr.filter(items_arr => items_arr['product-id'] == selectedItem);
            if (item_exists.length) {
                let index = items_arr.findIndex(x => x['product-id'] == selectedItem);

                quantity += Number(item_exists[0].quantity);
                price = products_arr[0].price * quantity.toFixed(2);

                items_arr[index].quantity = quantity.toString();
                items_arr[index].total = price.toString();
            } else {
                var new_item = [{ 'product-id': selectedItem, quantity: quantity.toString(), 'unit-price': price.toString(), total: (price * quantity).toString() }]

                items_arr.push(new_item[0]);
            }
            order_arr.items = items_arr;
            total = getTotal(JSON.stringify(order_arr)).toString();
            order_arr.total = total;
            orders_list_arr[(order_arr.id) - 1] = order_arr;

            setOrder(JSON.stringify(order_arr));
            orders_list_arr.total = total;
            setOrdersList(JSON.stringify(orders_list_arr));

            storeOrders(JSON.stringify(orders_list_arr));
            storeItems(JSON.stringify(order_arr));
        } else if (selectedItem == "null") {
            alert("Select an item");
        } else if (quantity == 0 || isNaN(quantity)) {
            alert("Select a valid quantity")
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});