import { Box, Skeleton, Stack } from "@mui/material";


function ProfileSkeleton() {
  return (
    <Stack spacing={1}>
      <Skeleton
        variant="text"
        sx={{ backgroundColor: "grey.900", mt: "2rem" }}
        width={200}
        height={35}
      />

      <Skeleton
        variant="rounded"
        sx={{ backgroundColor: "grey.900", zIndex: -999 }}
        style={{ marginTop: "1rem" }}
        width={590}
        height={180}
      />
      <Skeleton
        variant="circular"
        sx={{
          backgroundColor: "grey.900",
          zIndex: 1,
          position: "absolute",
          top: "10rem",
          left: "22rem",
        }}
        width={130}
        height={130}
      />
      <Box sx={{position: "relative", top: "5rem", paddingBottom: "5rem"}}>
      <Skeleton
        variant="text"
        sx={{ backgroundColor: "grey.900" }}
        width={180}
        height={35}
      />
      <Skeleton
        variant="text"
        sx={{ backgroundColor: "grey.900" }}
        width={100}
        height={20}
      />
      <Skeleton
        variant="text"
        sx={{ backgroundColor: "grey.900", mt: 4 }}
        width={280}
        height={25}
      />
      <Skeleton
        variant="text"
        sx={{ backgroundColor: "grey.900", mt: 1 }}
        width={280}
        height={25}
      />
      
      </Box>
    </Stack>
  );
}

export default ProfileSkeleton;
