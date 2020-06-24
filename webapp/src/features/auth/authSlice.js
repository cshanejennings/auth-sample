import { createSlice } from "@reduxjs/toolkit";
import axios, { AUTH_KEY } from "../../utils/axios";

const initialState = {
  error: "",
  user: {
    id: null,
    firstName: "",
    lastName: "",
    accessToken: ""
  }
};

try {
  const loginData = JSON.parse(sessionStorage.getItem(AUTH_KEY));
  initialState.user = loginData;
} catch (er) {
  // silent
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.user = action.payload;
      state.error = "";
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(action.payload));
    },

    loginFailure(state, action) {
      state.error = action.payload;
    },

    registerSuccess(state, action) {
      state.user = action.payload;
      sessionStorage.setItem(AUTH_KEY, JSON.stringify(action.payload));
    },

    registerFailure(state, action) {
      state.error = action.payload;
    },

    logout(state, action) {
      state.user = null;
      sessionStorage.removeItem(AUTH_KEY);
    }
  }
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  logout
} = authSlice.actions;
export default authSlice.reducer;
export const authSelector = state => state.auth;

export function postLogin(user) {
  return async dispatch => {
    try {
      const resp = await axios.post("auth/login", user);
      dispatch(loginSuccess(resp.data));
    } catch (err) {
      dispatch(loginFailure("Invalid username or password"));
    }
  };
}

export function postRegister(user) {
  return async dispatch => {
    try {
      const resp = await axios.post("auth/register", user);
      dispatch(registerSuccess(resp.data));
    } catch (err) {
      dispatch(registerFailure("Bad request params"));
    }
  };
}

export function postLogout() {
  return async dispatch => {
    dispatch(logout());
    await axios.post("auth/logout");
  };
}
