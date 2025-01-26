import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LOGOUT_URL = "http://localhost:5480/logout"; 

export default function useLogout(){
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(LOGOUT_URL, {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please try again.");
    }
  };

  return handleLogout;
};

