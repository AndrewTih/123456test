import { cryptoAssets } from "./data.ts";

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-KEY': 'SKyU2OSPIcyrlVAhHaPqhz8VXQ2pkepYGj0glKBQyEs='
  }
};

export async function fakeFetchCrypto() {
  try {
    const response = await fetch('https://openapiv1.coinstats.app/coins', options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export function fetchAssets() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cryptoAssets);
    }, 1);
  });
}
