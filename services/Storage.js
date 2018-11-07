import { AsyncStorage } from 'react-native';

const Storage = {

    async setItem(key, value) {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async getItem(key) {
        try {
          const value = await AsyncStorage.getItem(key);
          return value;
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
    },
    async deleteItem() {
        try{
          await AsyncStorage.removeItem('id_token')
        } catch (error) {
          console.log('AsyncStorage Error: ' + error.message);
        }
      }

};

export default Storage;