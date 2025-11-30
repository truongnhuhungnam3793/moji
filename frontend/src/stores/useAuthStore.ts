import { authService } from "@/services/authService";
import type { AuthState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },

  signUp: async (username, email, password, firstname, lastname) => {
    try {
      set({ loading: true });

      await authService.signUp(username, email, password, firstname, lastname);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thất bại!");
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (username, password) => {
    try {
      set({ loading: true });

      const { accessToken } = await authService.signIn(username, password);
      set({ accessToken });
      toast.success("Đăng nhập thành công! 🎇");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập thất bại!");
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      get().clearState();

      await authService.signOut();
      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất thất bại!");
    }
  },
}));
