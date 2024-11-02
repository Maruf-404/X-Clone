/* eslint-disable no-useless-escape */
import { FormControl, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import XInput from "../../components/XCustom/XInput";
import XModal from "../../components/XCustom/XModal";
import XButton from "../../components/XCustom/XButton";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPasword] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateinputs = () => {
    let errors = {};
    let passwordRequirements = [
      { regex: /[a-z]/, message: "at least one lowercase letter" },
      { regex: /[A-Z]/, message: "at least one uppercase letter" },
      { regex: /[0-9]/, message: "at least one digit" },
      { regex: /[^A-Za-z0-9]/, message: "at least one special character" },
      { regex: /.{4,}/, message: "at least 4 characters long" },
    ];

    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }
    if (!username) {
      toast.error("Username is required!");
      return;
    }
    if (!role) {
      toast.error("Role is required");
      return;
    }

    if (password) {
      let passwordErrors = passwordRequirements.filter(
        (req) => !password.match(req.regex)
      );
      if (passwordErrors.length > 0) {
        toast.error(
          "Password must contain " +
            passwordErrors.map((err) => err.message).join(", ")
        );
        return;
      }
    }

    if (
      email &&
      !email.match(/^\s*\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,16})+\s*$/)
    ) {
      toast.error("Provide a valid email");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async () => {
    if (validateinputs()) {
      try {
        const config = {
          header: {
            "content-type": "application/json",
          },
        };
        const { res } = await axios.post(
          "https://infinity-api-94fa.onrender.com/api/v1/users/register",
          {
            email,
            password,
            role,
            username,
          },
          config
        );
        toast.success("Registratipn Successful");
        handleClose();
      } catch (error) {
        console.log("Error in signup", error);
  
      }
    }
  };

  return (
    <div>
      <XButton
        color="secondary"
        borderradius="1.2rem"
        border="1px solid grey"
        backgroundcolor="teriatry.main"
        fontSize=".9rem"
        width="20rem"
        hoverbg="#0099ffc4"
        onClick={handleOpen}
        text="Create account"
      />

      <XModal open={open} handleClose={handleClose}>
        <FormControl sx={{ gap: "12px" }}>
          <Typography variant="h4">Create your account</Typography>
          <XInput
            label="Username"
            value={username}
            required
            errorText={!!validationErrors.username}
            helperText={validationErrors.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <XInput
            label="Email"
            value={email}
            required
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <XInput
            label="Role"
            value={role}
            required
            error={!!validationErrors.role}
            helperText={validationErrors.role}
            onChange={(e) => setRole(e.target.value)}
          />
          <XInput
            label="Password"
            value={password}
            type="password"
            required
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <XInput
            label="Confirm Password"
            value={confirmPassword}
            type="password"
            required
            error={!!validationErrors.cpassword}
            helperText={validationErrors.cpassword}
            onChange={(e) => setConfirmPasword(e.target.value)}
          />
          <XButton
            backgroundcolor="#EFF3F4"
            hoverbg="#fff"
            width="31rem"
            onClick={submitHandler}
            text="SignUp"
          />
        </FormControl>
      </XModal>
    </div>
  );
}

export default Signup;
