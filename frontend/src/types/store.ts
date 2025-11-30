import type { UserData } from "@/types/user";

export interface AuthState {
  accessToken: string | null;
  user: UserData | null;
  loading: boolean;

  signUp: (
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) => Promise<void>;

  signIn: (username: string, password: string) => Promise<void>;
}
