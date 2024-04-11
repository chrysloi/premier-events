import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {tokenData} from '../store/types';

type IAsyncStorage = {
  key: string;
  value: any;
};

type IAsyncStorageGet = {
  key: string;
};

export enum Lang {
  eng = 'en',
  kiny = 'kiny',
}

export const storeData = async ({key, value}: IAsyncStorage) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return {success: true, message: 'Data stored successfully', error: false};
  } catch (err) {
    return {success: false, message: err, error: true};
  }
};

export const getData = async ({key}: IAsyncStorageGet) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    const value = jsonValue !== null ? JSON.parse(jsonValue) : null;
    return {
      success: true,
      message: 'Data retrieved successfully',
      error: false,
      value,
    };
  } catch (err) {
    return {success: false, message: err, error: true};
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return {
      success: true,
      message: 'Storage cleared successfully',
      error: false,
    };
  } catch (err) {
    return {success: false, message: err, error: true};
  }
};

export const getToken = async () => {
  try {
    const jsonToken = await AsyncStorage.getItem('userToken');
    const token = jsonToken !== null ? JSON.parse(jsonToken) : null;
    return {success: true, error: false, token};
  } catch (err) {
    return {success: false, message: err, error: true};
  }
};

export const validateToken = async () => {
  try {
    const jsonToken = await AsyncStorage.getItem('userToken');
    const token = jsonToken !== null ? JSON.parse(jsonToken) : '';

    if (token.length === 0) {
      console.log('here');
      return {
        success: true,
        message: 'Token not found',
        error: true,
        route: 'Login',
      };
    }

    const {exp} = (await jwtDecode(token)) as tokenData;
    const today = new Date();
    const route = exp * 1000 > today.getTime() ? 'Home' : 'Login';

    return {
      success: true,
      message: 'Token validated successfully',
      error: false,
      route,
    };
  } catch (error) {
    return {success: false, message: error, error: true};
  }
};
