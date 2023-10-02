import axios, { AxiosInstance } from 'axios';

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const apiTest = async (): Promise<any> => {
  console.log("API Client - Test");
  const httpClient = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
  });
  const response = await httpClient.get('/posts');
  console.log("API Test - response:", response);
}

export const get = async (api: string): Promise<any> => {
  console.log("API Client - GET", api);
  try {
    const response = await apiClient.get(api);
    return response.data;
  } catch (error) {
    console.error('Error getting data:', error);
    throw error;
  }
};


export const post = async (api: string, data: any): Promise<any> => {
  console.log("API Client - POST", api, data);
  try {
    const response = await apiClient.post(api, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
