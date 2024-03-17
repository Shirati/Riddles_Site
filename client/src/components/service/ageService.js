import axios from 'axios';
import instance from './instance';

// const apiUrl = process.env.REACT_APP_API
//const instance = axios.create();

export default {
  getAge: async () => {
    try {
      const result = await instance.get(`/Age`);
      return result.data;
    } catch (error) {
      console.error('Error in getAge:', error);
      throw error;
    }
  },

  addAge: async (age) => {
    try {
      console.log('addAge', age);
      const result = await instance.post(`/Age`, { age });
      return result;
    } catch (error) {
      console.error('Error in addAge:', error);
      throw error;
    }
  },

  setAge: async (id, age) => {
    try {
      console.log('setAge', { id, age });
      const result = await instance.put(`/Age/${id}`, { age });
      return result;
    } catch (error) {
      console.error('Error in setAge:', error);
      throw error;
    }
  },

  deleteAge: async (id) => {
    try {
      const result = await instance.delete(`$/Age/${id}`);
      console.log('deleteAge');
      return result;
    } catch (error) {
      console.error('Error in deleteAge:', error);
      throw error;
    }
  }
};
