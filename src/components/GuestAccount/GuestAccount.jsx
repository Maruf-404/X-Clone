import { toast } from "react-toastify";
import setCookie from "../../Cookies/SetCookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import XButton from "../XCustom/XButton";


function GuestAccount() {
    const navigate = useNavigate()

    const submitHandler = async () => {
    
        try {
          const config = {
            headers: {
              "content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "https://infinity-api-94fa.onrender.com/api/v1/users/login",
            {
              username: "guest",
              password: "Guest@99",
            },
            config
          );
          toast.success("Logged in successfully");
          setCookie("accessToken", data.data.accessToken);
          setCookie("refreshToken", data.data.refreshToken);
          navigate("/home");
        } catch (error) {
          toast.error("Error in Login");
          console.log("Error in login", error);
        }
      };
    

  return (
    <XButton
        color="primary"
        borderradius="1.2rem"
        border="1px solid grey"
        backgroundcolor="secondary.main"
        fontSize=".9rem"
        width="20rem"
        hoverbg="#ccc"
        onClick={submitHandler}
        text="Login as guest"
      />
  )
}

export default GuestAccount
