import api from "@/lib/axios";

export const authService = {
  signUp: async (
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) => {
    const response = await api.post(
      "/auth/signup",
      {
        username,
        email,
        password,
        firstName: firstname,
        lastName: lastname,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },

  signIn: async (username: string, password: string) => {
    const response = await api.post(
      "/auth/signin",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      },
    );
    return response.data;
  },
};
