import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' }
});

export const fetchAllPlants = async () => {
  const response = await apiClient.get('/plants');
  return response.data;
};

export const fetchPlant = async (id) => {
  const response = await apiClient.get(`/plants/${id}`)
  return response.data;
}


export const createOrder = async (orderData) => {
  const response = await apiClient.post('/orders', orderData);
  return response.data;
};

export const createPaymentIntent = async (payload) => {
  // payload should be { items: [...], currency?: 'usd', receipt_email?: string }
  // Backend Stripe server runs separately (default port 4242)
  const response = await axios.post('http://localhost:4242/create-payment-intent', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const fetchUserOrders = async (userId) => {
  const response = await apiClient.get(`/orders?userId=${userId}`);
  return response.data;
};

export const createCheckoutSession = async (payload) => {
  // payload should be { items: [...], currency?: 'usd', receipt_email?: string }
  // Backend Stripe server creates a checkout session and returns { url, sessionId }
  const response = await axios.post('http://localhost:4242/create-checkout-session', payload, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const getCheckoutSession = async (sessionId) => {
  // Retrieve session details for success page
  const response = await axios.get(`http://localhost:4242/checkout-session/${sessionId}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};