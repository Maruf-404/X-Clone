/* eslint-disable react/prop-types */
import { styled } from "@mui/material";


function XhiddenInput({ onChange, name }) {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    margin: "1rem",
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <VisuallyHiddenInput
      type="file"
      name={name ? name : "image"}
      onChange={onChange}
    />
  );
}

export default XhiddenInput;
