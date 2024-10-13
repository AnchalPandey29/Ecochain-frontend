import axios from 'axios';

const apiRequest = async (url, method, body = {}, headers) => {
  try {
    const config = {
      method,
      url,
      data:body,
      headers: headers || {
        'Content-Type': 'application/json',
      },
    };


    const response = await axios(config);
    return response;  // Return response data
  } catch (error) {
    // Return error message or object based on error
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response);
      return {
        status: error.response.status,
        message: error.response.data || 'An error occurred.',
      };
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      return { message: 'No response received from server.' };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
      return { message: error.message };
    }
  }
};

export default apiRequest;
