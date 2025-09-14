import * as SecureStore from "expo-secure-store";

/**
 * 키와 값을 저장
 * @param key
 * @param value
 */
async function saveSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

/**
 * 키를 이용해 값을 가져옴
 * @param key
 * @returns
 */

async function getSecureStore(key: string) {
  const storedData = (await SecureStore.getItemAsync(key)) ?? null;
  return storedData;
}

/**
 * 키를 이용해 값을 삭제
 * @param key
 * @returns
 */
async function deleteSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export { deleteSecureStore, getSecureStore, saveSecureStore };
