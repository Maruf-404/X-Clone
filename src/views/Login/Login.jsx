import { FormControl, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import setCookie from "../../Cookies/SetCookie";
import getCookie from "../../Cookies/GetCookie";
import XInput from "../../components/XCustom/XInput";
import XModal from "../../components/XCustom/XModal";
import XButton from "../../components/XCustom/XButton";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    let isAuth = getCookie("accessToken");
    if (isAuth && isAuth !== null) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async () => {
    if (!username || !password) {
      toast.error("All Details are mandatory");
      return;
    }

    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://apihub.up.railway.app/api/v1/users/login",
        {
          username,
          password,
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
    <div>
      <XButton
        color="teriatry"
        borderradius="1.2rem"
        border="1px solid grey"
        backgroundcolor="primary.main"
        fontSize=".9rem"
        width="20rem"
        hoverbg="#2a5e81"
        onClick={handleOpen}
        text="Sign in"
      />

      <XModal open={open} handleClose={handleClose} height={300}>
        <FormControl sx={{ gap: "12px" }}>
          <Typography variant="h4">Sign into X</Typography>
          <XInput
            label="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />

          <XInput
            label="Password"
            value={password}
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <XButton
            backgroundcolor="#EFF3F4"
            hoverbg="#fff"
            width="31rem"
            onClick={submitHandler}
            text="Login"
          />
        </FormControl>
      </XModal>
    </div>
  );
}

export default Login;
