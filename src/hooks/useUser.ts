import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types/User";
import { userIdAtom } from "../atoms/userAtom";
import { useAtom } from "jotai";

const USER_URL = "http://localhost:3001/api/users";

const fetchUserById = async (userId: string) => {
  console.log("Request Fetch ", userId);
  const { data } = await axios.get<User>(`${USER_URL}/${userId}`);
  return data;
};

const createUser = async (userData: User) => {
  console.log("Request Create ", userData);
  const { data } = await axios.post<User>(`${USER_URL}`, userData);
  return data;
};

// logout user
const deleteUser = async (userId: string) => {
  console.log("Request Logout ", userId);
  const { data } = await axios.delete<User>(`${USER_URL}/${userId}`);
  return data;
};
// get all users
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
      console.log("useUserDetails ", data);
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
  console.log("Log 3 logout");
  return useMutation({
    mutationFn: (userId: string) => {
      console.log("Log 4 logout", userId);
      return deleteUser(userId);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => deleteUser(userId),
    onSuccess: () => {
      queryClient.clear();
    },
  });
};

/* 
export const useUser = () => {
  const queryClient = useQueryClient();
  const storedUserId = localStorage.getItem("userId");

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useQuery(
    ["user", storedUserId],
    () => fetchUserById(storedUserId as string),
    {
      enabled: !!storedUserId,
      onSuccess: (data) => {
        localStorage.setItem("userId", data._id);
      },
      onError: () => {
        localStorage.removeItem("userId");
      },
    }
  );

  const mutation = useMutation(createUser, {
    onSuccess: (data) => {
      // Store the user ID in LocalStorage and refetch the user
      localStorage.setItem("userId", data._id);
      queryClient.invalidateQueries("user"); // Refetch user data
    },
  });

  const loginUser = (name: string) => {
    mutation.mutate({ name });
  };

  const logoutUser = () => {
    localStorage.removeItem("userId");
    queryClient.clear();
  };

  return { user, isLoading, error, loginUser, logoutUser, refetch };
};
 */
