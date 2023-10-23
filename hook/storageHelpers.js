// storageHelpers.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const API_ENDPOINT = "https://5fkjvn2s62.execute-api.us-east-2.amazonaws.com/default/userData";  // Replace this with your API endpoint

// Get the user data from AsyncStorage
export const fetchLocalData = async (key) => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
        console.error("Error fetching data from AsyncStorage", error);
        return null;
    }
}

// Save user data to AsyncStorage
export const saveLocalData = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
        console.log(JSON.stringify(data));
    } catch (error) {
        console.error("Error saving data to AsyncStorage", error);
    }
}

// Remove user data from AsyncStorage
const clearLocalData = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error("Error clearing data from AsyncStorage", error);
    }
}

// Check if the user exists in the backend
const userExistsOnBackend = async (key) => {
    try {
        // console.log(`Calling ${API_ENDPOINT}/user/${key}`);
        const response = await fetch(`${API_ENDPOINT}/user/${key}`);
        const data = await response.json();
        return !!data;
    } catch (error) {
        console.error("Error checking user on backend", error);
        return false;
    }
}

// Update backend database
const updateBackend = async (key, data) => {
    try {
        // console.log(`Calling ${API_ENDPOINT}/update/${key}`);
        const response = await fetch(`${API_ENDPOINT}/update/${key}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
    } catch (error) {
        console.error("Error updating backend", error);
    }
}

// Delete user data from the backend
const deleteFromBackend = async (key) => {
    try {
        console.log(`Calling ${API_ENDPOINT}/delete/${key}`);
        const response = await fetch(`${API_ENDPOINT}/delete/${key}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP Error ${response.status}`);
        }
    } catch (error) {
        console.error("Error deleting user from backend", error);
    }
}

// Update user data both locally and on the backend
export const updateUser = async (key, updates) => {
    const userData = await fetchLocalData(key) || {};

    // Apply all updates to the local userData object
    for (const [field, value] of Object.entries(updates)) {
        if (typeof field === "string") {
            userData[field] = value;
        } else if (Array.isArray(field)) {
            let target = userData;
            for (let i = 0; i < field.length - 1; i++) {
                if (!target[field[i]]) target[field[i]] = {};
                target = target[field[i]];
            }
            target[field[field.length - 1]] = value;
        }
    }

    // Save the updated data locally
    await saveLocalData(key, userData);

    // Check if the user exists on the backend
    const exists = await userExistsOnBackend(key);

    if (exists) {
        // Update user data on the backend
        await updateBackend(key, userData);
    } else {
        // If the user does not exist on the backend, create a new user
        await fetch(`${API_ENDPOINT}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                key: key,
                data: userData
            })
        });
    }
}


// Reset local and backend data for a user
export const resetLocalAndBackendData = async (key) => {
    // Clear local data
    await clearLocalData(key);

    // Check if the user exists on the backend
    const exists = await userExistsOnBackend(key);

    // If user exists on the backend, delete their data
    if (exists) {
        await deleteFromBackend(key);
    }
}

export const legacyUser = async () => {
    const dataString = await SecureStore.getItemAsync('data');
    if (dataString) { // legacy user
        const [name, catGen] = dataString.split('*');
        const cat = catGen.substring(0, 24);
        const gen = catGen.substring(24);

        const favoritesString = await SecureStore.getItemAsync('favorites');
        const favorites = favoritesString ? favoritesString.split(' ') : [];

        return {
            "name": name,
            "cat": cat,
            "gen": gen,
            "favorites": favorites
        }
    } 
    return null
}

export const migrateData = async (uuidv4, updates) => {
    try {
        await updateUser(uuidv4, updates);
        

        let favoritesPromise = await SecureStore.deleteItemAsync('favorites');
        let dataPromise = await SecureStore.deleteItemAsync('data');

        if (favoritesPromise && dataPromise) {
            console.log("Deletion successful");
        } else {
            console.log("Issue deleting old keys");
            console.log(`favorites: ${favoritesPromise} data:${dataPromise} `)
        }

    } catch (error) {
        console.error("Error during migration:", error);
    }
}
