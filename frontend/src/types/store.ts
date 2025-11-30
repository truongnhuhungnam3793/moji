import type { UserData } from "@/types/user";

export interface AuthState {
  accessToken: string | null;
  user: UserData | null;
  loading: boolean;

  clearState: () => void;

  signUp: (
    username: string,
    email: string,
    password: string,
    firstname: string,
    lastname: string,
  ) => Promise<void>;

  signIn: (username: string, password: string) => Promise<void>;

  signOut: () => Promise<void>;

  fetchMe: () => Promise<void>;
}
