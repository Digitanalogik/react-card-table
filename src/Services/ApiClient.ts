import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const post = async (api: string, data: any): Promise<any> => {
  try {
    const response = await apiClient.post(api, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

export { post };
