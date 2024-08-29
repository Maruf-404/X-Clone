import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { Box } from "@mui/material";

export default function CardSkeleton() {
  return (
    <Stack spacing={1} margin={2} >
      <Box sx={{ display: "flex", alignContent: "center" }}>
        <Skeleton
          variant="circular"
          sx={{ backgroundColor: "grey.900" }}
          width={40}
          height={40}
        />
        <Skeleton
          variant="text"
          sx={{ backgroundColor: "grey.900", margin: ".5rem 0 0 .5rem" }}
          width={200}
          height={25}
        />
      </Box>
      <Skeleton
        variant="rounded"
        sx={{ backgroundColor: "grey.900" }}
        style={{ margin: "3rem 0 0 3rem " }}
        width={430}
        height={250}
      />
    </Stack>
  );
}
