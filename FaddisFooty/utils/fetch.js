import axios from 'axios';

const serv_addr = process.env.API_HOST || 'http://localhost:3000';

const fetchUserId = async (userId) => {
    try {
        const response = await axios.get(`${serv_addr}/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching users', error);
    }
};

const fetchUserEmail = async (user) => {
    try {
        const response = await axios.post(`${serv_addr}/api/login`, user);
        return response.data;
    } catch (error) {
        // console.error('Error fetching login', error);
        return error.response.data.message;
    }
};

const fetchUserEvents = async (userId) => {
    try {
        const response = await axios.get(`${serv_addr}/api/events/${userId}`);
        return response.data;
    } catch (error) {
        // console.error('Error fetching events', error);
        return error.response.data.message;
    }
};

const fetchDrills = async () => {
    try {
        const response = await axios.get(`${serv_addr}/api/drills`);
        return response.data;
    } catch (error) {
        console.error('Error fetching drills', error);
    }
};

export { fetchUserId, fetchUserEmail, fetchUserEvents, fetchDrills };