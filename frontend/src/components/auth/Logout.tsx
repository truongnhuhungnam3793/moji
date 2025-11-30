import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router";

const Logout = () => {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      signOut();
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};
export default Logout;
