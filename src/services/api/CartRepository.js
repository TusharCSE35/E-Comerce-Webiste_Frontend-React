import axios from "axios";

const BASE_URL = 'https://rom.socialcubebd.com/api/merchant';

const CartRepository = {
  getCartItems: async (temporaryOrderId) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/get-cart-item`,
      { temporaryOrderId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },

  addOrUpdateCart: async (payload) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${BASE_URL}/add-update-cart`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  },
};

export default CartRepository;
