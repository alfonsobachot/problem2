import AsyncStorage from '@react-native-async-storage/async-storage';

const storeOrders = async (value) => {
    try {
        await AsyncStorage.setItem('@orders', value)
    } catch (e) {
        // saving error
    }
}

const getOrders = async () => {
    try {
        const value = await AsyncStorage.getItem('@orders')
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
}

export { storeOrders, getOrders }