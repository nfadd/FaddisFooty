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

const fetchEvents = async () => {
    try {
        const response = await axios.get(`${serv_addr}/api/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events', error);
    }
};

export { fetchUserId, fetchUserEmail, fetchEvents };