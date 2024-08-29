/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const XModal = ({ open, handleClose, children, height }) => {


    
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { backgroundColor: "rgba(91, 112, 131, 0.4)" }, 
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: height ? height : 500,
            bgcolor: "var(--primary)",
            border: "2px solid #111",
            boxShadow: 24,
            p: 4,
            color: "#fff",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default XModal;
