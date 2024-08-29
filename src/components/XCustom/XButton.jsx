/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Button } from '@mui/material';
import React from 'react'

const XButton = (props) => {
    const {color, backgroundcolor, border, width, type, hoverbg, text, size, borderradius, height } = props;
  return (
    <Button
    type={type ? type : "contained"}
    size={size ? size : ""}
    color={color ? color : "primary"}    sx={{
      backgroundColor: backgroundcolor ? backgroundcolor : "",
      borderRadius: borderradius ? borderradius : "1rem",
      width: width ? width : "",
      height: height ? height : "2.5rem",
      border: border ? border : "",
      "&:hover": {
        backgroundColor: hoverbg,
      },
    }}
    onClick={onclick}
    {...props}
  >
    <b>{text ? text : "Click me"}</b> 
  </Button>
  )
}

export default XButton
