import Logout from "@/components/auth/Logout";
import { useAuthStore } from "@/stores/useAuthStore";

const ChatApp = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div>
      <Logout />
      <h1>Chat App</h1>
      <p>{user?.username}</p>
    </div>
  );
};
export default ChatApp;
