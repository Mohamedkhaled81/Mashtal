export const loadCart = () => {
  try {
    const serializedCart = localStorage.getItem("plant_cart");
    if (serializedCart === null) return undefined;
    return JSON.parse(serializedCart);
  } catch (err) {
    return err;
  }
};

export const saveCart = (state) => {
  try {
    const serializedCart = JSON.stringify(state);
    localStorage.setItem("plant_cart", serializedCart);
  } catch (err) {
    return err;
  }
};