import { Box, Skeleton } from "@mui/material";

const PrayerSkeleton = () => {
  // i need every size from ui/ux designer
  return (
    <Box
      sx={{
        width: 150,
        height: 200,
        m: 2,
        p: 2,
        borderRadius: 2,
        bgcolor: "rgba(255,255,255,0.1)",
        textAlign: "center",
      }}
    >
      <Skeleton
        variant="rectangular"
        width={80}
        height={80}
        sx={{ mx: "auto", borderRadius: 2 }}
      />

      <Skeleton variant="text" width="60%" sx={{ mx: "auto", mt: 2 }} />

  
      <Skeleton variant="text" width="80%" sx={{ mx: "auto" }} />
    </Box>
  );
};

export default PrayerSkeleton;
