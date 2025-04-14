import { Button, FormControl, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import getCookie from "../../Cookies/GetCookie";
import axios from "../../components/AxiosInstance/AxiosInstance";
import { useState } from "react";
import XInput from "../../components/XCustom/XInput";
import XModal from "../../components/XCustom/XModal";
import XButton from "../../components/XCustom/XButton";
import { toast } from "react-toastify";
import XhiddenInput from "../../components/XCustom/XhiddenInput";

function EditProfile() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [coverImage, setCoverImage] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    bio: "",
    location: "",
    dob: "",
  });
  let accessToken = getCookie("accessToken");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCoverImageChange = (event) => {
    setCoverImage(event.target.files[0]);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const submitProfileData = async () => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
          Authorization: accessToken,
        },
      };

      const dataToSend = { ...formData };
      const { data } = await axios.patch(
        "/social-media/profile",
        dataToSend,
        config
      );
    } catch (error) {
      console.log("error in Edit Profile", error);
    }
  };

  const submitCoverImage = async () => {
    if (!coverImage) return;

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      };
      const dataToSend = new FormData();
      dataToSend.append("coverImage", coverImage);
      const { data } = await axios.patch(
        "/social-media/profile/cover-image",
        dataToSend,
        config
      );
    } catch (error) {
      console.log("Error in CoverImage Api call", error);
    }
  };

  const submitAvatar = async () => {
    console.log(avatar);
    
    if (!avatar) return console.log("Error");
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      };
      const dataTosend = new FormData();
      dataTosend.append("avatar", avatar);
      const { data } = await axios.patch(
        "/users/avatar",
        dataTosend,
        config
      );
    } catch (error) {
      console.log("Error in Avatar Api call", error);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    await submitProfileData();
    await submitCoverImage();
    await submitAvatar();
    handleClose();
    toast.success("Profile Updated");
  };

  return (
    <div>
      <XButton
        color="secondary"
        size="small"
        borderradius="1.2rem"
        border="1px solid #666363"
        backgroundcolor="primary.main"
        fontSize=".9rem"
        width="8rem"
        hoverbg="#353434"
        onClick={handleOpen}
        text="Edit Profile"
      />

      <XModal open={open} handleClose={handleClose} height={640}>
        <FormControl sx={{ gap: "5px" }}>
          <Typography variant="h5">Edit Profile</Typography>

          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Update CoverImage
            <XhiddenInput onChange={handleCoverImageChange} name="images" />
          </Button>

          {coverImage ? (
            <img
              src={URL.createObjectURL(coverImage)}
              width={"500px"}
              height={"75px"}
              alt="coverImage"
            />
          ) : (
            ""
          )}
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Update Avatar
            <XhiddenInput onChange={handleAvatarChange} name="images" />
          </Button>
          {avatar && (
            <img
              src={URL.createObjectURL(avatar)}
              width={"100px"}
              height={"100px"}
              alt="Avatar"
              style={{ borderRadius: "50%" }}
            />
          )}
          <XInput
            label="FirstName"
            name="firstName"
            value={formData.firstName}
            required
            onChange={handleChange}
          />
          <XInput
            label="LastName"
            name="lastName"
            value={formData.lastName}
            required
            onChange={handleChange}
          />
          <XInput
            label="Bio"
            name="bio"
            value={formData.bio}
            required
            onChange={handleChange}
          />
          <XInput
            label="Location"
            name="location"
            value={formData.location}
            required
            onChange={handleChange}
          />
          <XInput
            label="Dob"
            name="dob"
            value={formData.dob}
            required
            onChange={handleChange}
          />
          <XButton
            backgroundcolor="#EFF3F4"
            hoverbg="#fff"
            width="31rem"
            onClick={submitHandler}
            text="Update User"
          />
        </FormControl>
      </XModal>
    </div>
  );
}

export default EditProfile;
