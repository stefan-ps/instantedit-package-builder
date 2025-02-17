export const getApp = async () => {
  const product = await fetch('http://localhost:3000/api/section');
  return await product.json();
};
