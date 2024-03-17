

// const apiUrl = process.env.REACT_APP_API
//const instance = axios.create();
import instance from './instance';
export default {
  getRiddle: async ({ subject, difficulty, age }) => {     
    try {       
        const result = await instance.get(`/Riddle?age=${age}&subject=${subject}&difficulty=${difficulty}`);
        return result.data;     
    } catch (error) {       
        console.error('Error in getRiddle:', error);       
        throw error;     
    }   
},

  addRiddle: async (riddle) => {
    try {
      console.log('addRiddle', riddle);
      const result = await instance.post(`/Riddle`, { riddle });
      return result;
    } catch (error) {
      console.error('Error in addRiddle:', error);
      throw error;
    }
  },

  setRiddle: async (id, riddle) => {
    try {
      console.log('setRiddle', { id, riddle });
      const result = await instance.put(`/Riddle/${id}`, { riddle });
      return result;
    } catch (error) {
      console.error('Error in setRiddle:', error);
      throw error;
    }
  },

  deleteRiddle: async (id) => {
    try {
      const result = await instance.delete(`/Riddle/${id}`);
      console.log('deleteRiddle');
      return result;
    } catch (error) {
      console.error('Error in Riddle:', error);
      throw error;
    }
  }
};
