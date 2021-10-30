import React, { useState, useEffect, } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { storeItems, getItems } from '../../itemsStorage'
import { storeOrders, getOrders } from '../../ordersStorage'
import { useIsFocused } from '@react-navigation/native'

export default function Index({ navigation }) {

    const [orders, setOrders] = useState();
    const [items, setItems] = React.useState();

    const isFocused = useIsFocused()
    
    useEffect(() => {
        //axios.get('./orders.json').then((res) => setOrders(res.data));
    });

    useEffect(() => {
        getOrders().then((a) => { setOrders(a) });
    }, [isFocused]);
    
    return (
        <View style={styles.container}>
            {orders &&
                JSON.parse(orders).map((data) => (
                    <TouchableOpacity key={data.id} style={{borderWidth: 1, margin: 10, borderRadius: 10, width: 250, marginHorizontal: 10}}
                        onPress={() => { storeItems(JSON.stringify(data)); navigation.navigate('Order Detail') }}>
                        <View key={data.id} style={{padding: 10, margin: 10}} className="row">
                            <Text>Order {data.id}</Text>
                            <Text>Customer id: {data['customer-id']}</Text>
                            <Text>Total: {data.total}</Text>
                            <Text> </Text>
                        </View>
                    </TouchableOpacity>
                ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
