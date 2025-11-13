
import AsyncStorage from '@react-native-async-storage/async-storage';
//set asycnhronous storage item




const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (e) {
    console.error("Error getting item from storage", e);
    return null;
  }
}


const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Error setting item to storage", e);
  }
}


const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Error removing item from storage", e);
  }
}

const clearAll = async () => {
    try {
        await AsyncStorage.clear(); 
    } catch (e) {
        console.error("Error clearing storage", e);
    }
}

const storageHelper = {
  getItem,
  setItem,
  removeItem,
  clearAll
}

export default storageHelper;