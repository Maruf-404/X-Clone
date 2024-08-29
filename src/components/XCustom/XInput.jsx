/* eslint-disable react/prop-types */
import { TextField } from "@mui/material";
import { useState } from "react";

const XInput = (props) => {
  const {
    label,
    name,
    value,
    required,
    onChange,
    variant,
    color,
    disabled,
    type,
    placeholder,
    fontSize,
  } = props;

  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  const validateInputs = (value) => {
    if (required && !value) {
      setError(true);
      setHelperText("This field is Required");
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    validateInputs(value);
    onChange(e)
  };

  return (
    <TextField
      color={color ? color : "secondary"}
      variant={variant ? variant : "outlined"}
      label={label ? label : ""}
      name={name ? name : ""}
      value={value ? value : ""}
      type={type === "password" ? "password" : "text"}
      required={required ? true : false}
      disabled={disabled ? true : false}
      placeholder={placeholder ? placeholder : ""}
      onChange={handleInputChange ? handleInputChange : ""}
      error={error}
      helperText={helperText}
      fullWidth
      sx={{
        input: { color: "#fff" },
        border: "2px solid rgb(51, 54, 57)",
      }}
      inputProps={{ style: { fontSize: fontSize ? fontSize : "1rem" } }}
      InputLabelProps={{
        style: { color: "#fff" },
      }}
      {...props}
    />
  );
};

export default XInput;
