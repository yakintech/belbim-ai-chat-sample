import Keychain from 'react-native-keychain';


const TOKEN_KEY = 'authToken';

const secureStorageHelper = {
    setItem: async (key: string, value: string): Promise<void> => {
        if (key === 'token') {
            await Keychain.setGenericPassword(TOKEN_KEY, value, {
                accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
            });
        }
    },
    getItem: async (key: string): Promise<string | null> => {
        const creds = await Keychain.getGenericPassword();
        if (creds && key === 'token') {
            return creds.password;
        }
        return null;
    },
    removeItem: async (key: string): Promise<void> => {
        if (key === 'token') {
            await Keychain.resetGenericPassword({ service: TOKEN_KEY });
        }
    }
};

export default secureStorageHelper;