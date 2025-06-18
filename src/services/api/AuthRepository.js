import axios from 'axios';

const BASE_URL = 'https://rom.socialcubebd.com/api/merchant';

export const AuthRepository = {
  fetchShopList: async (payload) => {
    const response = await axios.post(`${BASE_URL}/get-shop-list`, payload);
    return response.data;
  },

  outletList: async (payload) => {
    const response = await axios.post(`${BASE_URL}/get-outlet-list`, payload);
    return response.data;
  },

  fetchLogin: async (payload) => {
    const response = await axios.post(`${BASE_URL}/login`, payload);
    return response.data;
  },

  getTemporaryOrderId: async () => {
    const token = localStorage.getItem("token");
    return await axios.post(
      `${BASE_URL}/get-temporary-order-id`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  getMenuByShopAndCategory: async () => {
    const token = localStorage.getItem("token");
    return await axios.post(
      `${BASE_URL}/get-menu-by-shop-n-category`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

};
