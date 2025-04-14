import { Button, Typography } from "@mui/material";
import axios from "../../components/AxiosInstance/AxiosInstance"
import getCookie from "../../Cookies/GetCookie";

function EmailVerification() {
  let accessToken = getCookie("accessToken");
document.title = "X clone | Email verification"
  const sendEmailVerification = async () => {
    try {
      const config = {
        headers: {
          Authorization: accessToken,
          accept: "application/json",
        },
      };
      const res = await axios.post(
        "/users/resend-email-verification",
        {},
        config
      );
      console.log(res);
    } catch (error) {
      console.log("Error in resendng Email", error);
    }
  };



  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        border: "1rem solid #111",
        marginTop: "3rem"
      }}
    >
      <Typography variant="h5">Email Verification</Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={sendEmailVerification}
      >
        Verification
      </Button>
    </div>
  );
}

export default EmailVerification;
