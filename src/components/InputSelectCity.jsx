import { Box, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import useMainContent from "../Hooks/useMainContent";
const InputSelectCity = () => {
  const { handleCityChange, selectedCity } = useMainContent();
  return (
    <Box sx={{ minWidth: 120, marginBottom: "50px", textAlign: "center" }}>
      <FormControl sx={{ width: "30%", color: "#fff" }}>
        <InputLabel sx={{ color: "#fff" }} id="demo-simple-select-label">
          {selectedCity}
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
  );
};

export default InputSelectCity;
