import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "../Store/userSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const login = useCallback(
    async (email, password) => {
      try {
        const response = await axios.post("/api/auth/login", { email, password });
        const { token, userData } = response.data;
        localStorage.setItem("token", token);
        dispatch(setUser(userData));
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    dispatch(clearUser());
  }, [dispatch]);

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  return { login, logout, isAuthenticated, user };
};
