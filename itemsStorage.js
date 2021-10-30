import AsyncStorage from '@react-native-async-storage/async-storage';

const storeItems = async (value) => {
    try {
        await AsyncStorage.setItem('@items', value)
    } catch (e) {
        // saving error
    }
}

const getItems = async () => {
    try {
        const value = await AsyncStorage.getItem('@items')
        if (value !== null) {
            // value previously stored
            return value;
        }
    } catch (e) {
        // error reading value
    }
}

export { storeItems, getItems }