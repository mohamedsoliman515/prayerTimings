import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import { Box, Stack } from "@mui/material";
import Prayer from "./Prayer";
import fajr from "../assets/fajr-prayer.png";
import Dohr from "../assets/dhhr-prayer-mosque.png";
import Asr from "../assets/asr-prayer-mosque.png";
import Sunset from "../assets/sunset-prayer-mosque.png";
import Night from "../assets/night-prayer-mosque.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import moment from "moment";
import useMainContext from "../Hooks/useMainContext";
const MainContent = () => {
  const {
    currentTime,
    nextPrayer,
    handleCityChange,
    remainingTimeUntilNextPrayer,
    selectedCity,
    timings,
  } = useMainContext();

  return (
    <>
      {/*  */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2>{currentTime}</h2>
            <h1>{selectedCity}</h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div style={{ textAlign: "center" }}>
            <h2>
              The time remaining until prayer
              {/* <br /> */}
              {nextPrayer}
            </h2>
            <h1>
              {`${moment.duration(remainingTimeUntilNextPrayer).hours()} :
              ${moment.duration(remainingTimeUntilNextPrayer).minutes()} :
             ${moment.duration(remainingTimeUntilNextPrayer).seconds()}`}
            </h1>
          </div>
        </Grid>
      </Grid>
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
        <Prayer name="Fajr" image={fajr} time={timings.Fajr} />
        <Prayer name="Dhuhr" image={Dohr} time={timings.Dhuhr} />
        <Prayer name="Asr" image={Asr} time={timings.Asr} />
        <Prayer name="Sunset" image={Sunset} time={timings.Sunset} />
        <Prayer name="Isha" image={Night} time={timings.Isha} />
      </Stack>
      {/* prayers cards */}

      <Box sx={{ minWidth: 120, marginBottom: "50px", textAlign: "center" }}>
        <FormControl sx={{ width: "30%", color: "#fff" }}>
          <InputLabel sx={{ color: "#fff" }} id="demo-simple-select-label">
            City
          </InputLabel>
          <Select
            value={selectedCity}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="City"
            onChange={handleCityChange}
            style={{ color: "#fff" }}
          >
            <MenuItem value="Cairo">Cairo</MenuItem>
            <MenuItem value="Alex">Alex</MenuItem>
            <MenuItem value="Giza">Giza</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};

export default MainContent;
