import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../types/User";
import { setUserIdAtom, userIdAtom } from "../../atoms/userAtom";
import { useAtom } from "jotai";
import { API_URL } from "../../features";

const fetchUserById = async (userId: string) => {
  try {
    const { data } = await axios.get<User>(`${API_URL}/users/${userId}`);
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error(`User with ID ${userId} not found.`);
      return null;
    }
    throw error;
  }
};

const createUser = async (userData: User) => {
  const { data } = await axios.post<User>(`${API_URL}/users`, userData);
  return data;
};

const logoutUser = async (userId: string) => {
  const { data } = await axios.delete<User>(`${API_URL}/users/${userId}`);
  return data;
};

const fetchUserList = async () => {
  const { data } = await axios.get(`${API_URL}/users`);
  return data;
};

export const useUserList = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const data = fetchUserList();
      return data;
    },
  });
};

export const useUserDetails = () => {
  const [userId] = useAtom(userIdAtom); // Use Jotai atom to get userId
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const data = fetchUserById(userId as string);
      return data;
    },
    enabled: !!userId, // Only execute, if there is a userId in Localstorage
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const [_, setUserId] = useAtom(setUserIdAtom);

  return useMutation({
    mutationFn: (userData: User) => createUser(userData),
    onSuccess: (data) => {
      setUserId(data.userId);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => {
      return logoutUser(userId);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useLogoutUserFromGame = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => logoutUser(userId),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};
