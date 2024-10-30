import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../types/User";
import { userIdAtom } from "../../atoms/userAtom";
import { useAtom } from "jotai";

const USER_URL = "http://localhost:3001/api/users";

const fetchUserById = async (userId: string) => {
  try {
    const { data } = await axios.get<User>(`${USER_URL}/${userId}`);
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
  const { data } = await axios.post<User>(`${USER_URL}`, userData);
  return data;
};

const logoutUser = async (userId: string) => {
  const { data } = await axios.delete<User>(`${USER_URL}/${userId}`);
  return data;
};

const fetchUserList = async () => {
  const { data } = await axios.get(`${USER_URL}`);
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
  const [, setUserId] = useAtom(userIdAtom);
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
