// import  from "@mui/material/Unstable_Grid2";
import { lazy, Suspense } from "react";
import Divider from "@mui/material/Divider";
import { Stack } from "@mui/material";
import fajr from "../assets/fajr-prayer.png";
import Duhr from "../assets/dhhr-prayer-mosque.png";
import Asr from "../assets/asr-prayer-mosque.png";
import Sunset from "../assets/sunset-prayer-mosque.png";
import Night from "../assets/night-prayer-mosque.png";

import moment from "moment";
import useMainContent from "../Hooks/useMainContent";
import { Grid } from "@mui/material";
import PrayerSkeleton from "./PrayerSkeleton ";
import SnackBar from "./SnackBar";
import InputSelectCity from "./InputSelectCity";

const Prayer = lazy(() => import("./Prayer"));
const MainContent = () => {
  const {
    currentTime,
    nextPrayer,
    remainingTimeUntilNextPrayer,
    selectedCity,
    timings,
  } = useMainContent();

  return (
    <>
      {/*start  Snackbar  */}
      <SnackBar />
      {/* end  Snackbar  */}
      <header>
        <Grid
          container
          spacing={2}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems="center"
        >
          <Grid item sm={12} md={6}>
            <div>
              <h2>{currentTime}</h2>
              <h1>{selectedCity}</h1>
            </div>
          </Grid>
          <Grid item sm={12} md={6}>
            <div style={{ textAlign: "center" }}>
              <h2>
                The time remaining until prayer
                {nextPrayer}
              </h2>
              <h1>
                {`${moment.duration(remainingTimeUntilNextPrayer).hours()} :
              ${moment.duration(remainingTimeUntilNextPrayer).minutes()}`}
              </h1>
            </div>
          </Grid>
        </Grid>
      </header>
      {/*  */}

      <Divider style={{ borderColor: "#fff", width: "100%" }} />

      {/* prayers cards */}
      <Stack
        direction="row"
        style={{
          flexWrap: "wrap",
          justifyContent: "center",
          m: "30px 0",
        }}
      >
        <Suspense
          fallback={
            <>
              <PrayerSkeleton />
              <PrayerSkeleton />
              <PrayerSkeleton />
              <PrayerSkeleton />
              <PrayerSkeleton />
            </>
          }
        >
          <Prayer name="Fajr" image={fajr} time={timings.Fajr} />
          <Prayer name="Duhr" image={Duhr} time={timings.Dhuhr} />
          <Prayer name="Asr" image={Asr} time={timings.Asr} />
          <Prayer name="Sunset" image={Sunset} time={timings.Sunset} />
          <Prayer name="Isha" image={Night} time={timings.Isha} />
        </Suspense>
      </Stack>
      {/* prayers cards */}

      {/* select city */}
      <InputSelectCity />
    </>
  );
};

export default MainContent;
