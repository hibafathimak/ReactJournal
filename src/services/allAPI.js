import commonAPI from './commonAPI';
import SERVER_URL from './serverURL';

// Register API
export const registerAPI = async (userDetails) => {
    return await commonAPI("POST", `${SERVER_URL}/users`, userDetails);
};


// Login API 
export const loginAPI = async (userCredentials) => {
    try {
        const response = await commonAPI("GET", `${SERVER_URL}/users?_=${new Date().getTime()}`);
        const user = response.data.find(user => 
            user.email === userCredentials.email && user.password === userCredentials.password
        );

        if (user) {
            return { status: 200, data: { user } };
        } else {
            return { status: 401, message: 'Invalid credentials' };
        }
    } catch (error) {
        console.error('Error during login:', error);
        if (error.response) {
            return {
                status: error.response.status, 
                message: error.response.data.message || 'Server error'
            };
        } else if (error.request) {
            return {
                status: 500, 
                message: 'No response from server'
            };
        } else {
            return {
                status: 500, 
                message: 'Server error'
            };
        }
    }
};
// src/services/allAPI.js






export const fetchUserAPI = async (userId) => {
    try {
        const response = await commonAPI("GET", `${SERVER_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Save User Theme API
export const saveUserThemeAPI = async (userId, theme) => {
    try {
        const user = await fetchUserAPI(userId);
        user.theme = theme; // Add theme to the user profile

        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error saving user theme:', error);
        throw error;
    }
};



// Add Entry to User
export const addEntryToUserAPI = async (userId, entryData) => {
    try {
        const user = await fetchUserAPI(userId);
        user.entries.push(entryData);
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error adding entry to user:', error);
        throw error;
    }
};

// Add Reminder to User
export const addReminderToUserAPI = async (userId, reminderData) => {
    try {
        const user = await fetchUserAPI(userId);
        user.reminders.push(reminderData);
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error adding reminder to user:', error);
        throw error;
    }
};


// Fetch Mood Entries API
export const fetchMoodEntriesAPI = async (userId) => {
    try {
        const response = await commonAPI("GET", `${SERVER_URL}/users/${userId}`);
        return response.data.entries; // Assuming mood entries are part of the user's entries
    } catch (error) {
        console.error('Error fetching mood entries:', error);
        throw error;
    }
};
// Fetch Entries API
export const fetchEntriesAPI = async (userId) => {
    try {
        const response = await commonAPI("GET", `${SERVER_URL}/users/${userId}`);
        return response.data.entries; // Assuming entries are part of the user object
    } catch (error) {
        console.error('Error fetching entries:', error);
        throw error;
    }
};
// Update Entry API
export const updateEntryAPI = async (userId, entryData) => {
    try {
        const user = await fetchUserAPI(userId);
        const entryIndex = user.entries.findIndex(entry => entry.date === entryData.date);
        if (entryIndex !== -1) {
            user.entries[entryIndex] = entryData;
        }
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error updating entry:', error);
        throw error;
    }
};

// Delete Entry API
export const deleteEntryAPI = async (userId, entryDate) => {
    try {
        const user = await fetchUserAPI(userId);
        user.entries = user.entries.filter(entry => entry.date !== entryDate);
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error deleting entry:', error);
        throw error;
    }
};
// Delete Reminder from User
export const deleteReminderFromUserAPI = async (userId, reminderIndex) => {
    try {
        const user = await fetchUserAPI(userId);
        user.reminders.splice(reminderIndex, 1); // Remove the reminder at the specified index
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error deleting reminder from user:', error);
        throw error;
    }
};
// Add Image API
export const addImageToVisionBoardAPI = async (userId, imageData) => {
    try {
        const user = await fetchUserAPI(userId);
        user.visionBoard.push(imageData);
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error adding image to vision board:', error);
        throw error;
    }
};
// Delete Image API
export const deleteImageFromVisionBoardAPI = async (userId, imageIndex) => {
    try {
        const user = await fetchUserAPI(userId);
        user.visionBoard.splice(imageIndex, 1); // Remove the image at the specified index
        
        const response = await commonAPI("PUT", `${SERVER_URL}/users/${userId}`, user);
        return response;
    } catch (error) {
        console.error('Error deleting image from vision board:', error);
        throw error;
    }
};
