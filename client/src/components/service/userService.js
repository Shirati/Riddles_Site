import axios from 'axios';

// const apiUrl = process.env.REACT_APP_API
//const instance = axios.create();
import instance from './instance';

export default {
  getUser: async () => {
    try {
      const result = await instance.get(`/user`);
      return result.data;
    } catch (error) {
      console.error('Error in getUser:', error);
      throw error;
    }
  },

  addUser: async (User) => {
    try {
      console.log('addDifficulty', User);
      const result = await instance.post(`/user`, { User });
      return result;
    } catch (error) {
      console.error('Error in addUser:', error);
      throw error;
    }
  },

  setUser: async (id, User) => {
    try {
      console.log('setUser', { id, User });
      const result = await instance.put(`/user/${id}`, { User });
      return result;
    } catch (error) {
      console.error('Error in setUser:', error);
      throw error;
    }
  },
  login: async (User) => {
    try {
      const result = await instance.post(`/user/login`, { User });
      return result;
    } catch (error) {
      console.error('Error in login:', error);
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const result = await instance.delete(`/user/${id}`);
      console.log('deleteUser');
      return result;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  }
};
