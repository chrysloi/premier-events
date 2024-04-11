/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./axios";
import { LoginData, LoginResponse, validateTokenResponse } from "./types";
import { AxiosError } from "axios";
import {
  getToken,
  validateToken as tokenValidation,
} from "../constants/asyncStorage";

class Api {
  resetAll = createAction("resetAll");

  login = createAsyncThunk(
    "/user",
    async (authData: LoginData, { rejectWithValue }) => {
      try {
        console.log(authData);
        const { data } = await axios.post("/login", { ...authData });
        console.log(data);
        return data as LoginResponse;
      } catch (error: AxiosError | any) {
        return rejectWithValue({ error: true });
      }
    }
  );

  validateToken = createAsyncThunk("/token", async (_, { rejectWithValue }) => {
    try {
      const { success, route } = await tokenValidation();

      return { route: success ? route : "Login" } as validateTokenResponse;
    } catch (error: AxiosError | any) {
      return rejectWithValue({ error: error?.response?.data });
    }
  });

  scan = createAsyncThunk("/scan", async (prt: string, { rejectWithValue }) => {
    try {
      const { token } = await getToken();
      const { data } = await axios.get(`/scan?prt=${prt}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (error: AxiosError | any) {
      console.error({ error });
      return rejectWithValue({ error: true });
    }
  });
}

const apis = new Api();
export default apis;
