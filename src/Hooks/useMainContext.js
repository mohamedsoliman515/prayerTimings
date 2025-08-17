import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";
const useMainContext = () => {
  const [timings, setTimings] = useState({});
  const [currentTime, setCurrentTime] = useState(null);
  const [selectedCity, setSelectedCity] = useState("cairo");
  const [nextPrayer, setNextPrayer] = useState("");

  const [remainingTimeUntilNextPrayer, setRemainingTimeUntilNextPrayer] =
    useState();
    
  const handleCityChange = (event) => {
    console.log(event.target.value);
    setSelectedCity(event.target.value);
  };
  console.log("re render");

  useEffect(() => {
    const fetchPrayerTimings = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=EGY&method=8`
        );
        setTimings(response.data.data.timings);
      } catch (error) {
        // setError("Error fetching prayer timings.");
        console.error("Error fetching prayer timings:", error);
      }
    };

    fetchPrayerTimings();
  }, [selectedCity]);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(moment().format("h:mm:ss a |  MMMM Do YYYY "));
    };
    updateCurrentTime();
    const intervalTime = setInterval(updateCurrentTime, 1000);

    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  useEffect(() => {
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  const setupCountdownTimer = () => {
    let currentMoment = moment();

    const Fajr = moment(timings.Fajr, "HH:mm");
    const Duhr = moment(timings.Dhuhr, "HH:mm");
    const Asr = moment(timings.Asr, "HH:mm");
    const Sunset = moment(timings.Sunset, "HH:mm");
    const Isha = moment(timings.Isha, "HH:mm");

    if (currentMoment.isAfter(Fajr) && currentMoment.isBefore(Duhr)) {
      setNextPrayer(" Dhuhr");
      const remainingTime = Duhr.diff(currentMoment);
      setRemainingTimeUntilNextPrayer(remainingTime);
    } else if (currentMoment.isAfter(Duhr) && currentMoment.isBefore(Asr)) {
      setNextPrayer(" Asr");
      const remainingTime = Asr.diff(currentMoment);
      setRemainingTimeUntilNextPrayer(remainingTime);
    } else if (currentMoment.isAfter(Asr) && currentMoment.isBefore(Sunset)) {
      setNextPrayer(" Sunset");
      const remainingTime = Sunset.diff(currentMoment);
      setRemainingTimeUntilNextPrayer(remainingTime);
    } else if (currentMoment.isAfter(Sunset) && currentMoment.isBefore(Isha)) {
      setNextPrayer(" Isha");
      const remainingTime = Isha.diff(currentMoment);

      setRemainingTimeUntilNextPrayer(remainingTime);
    } else {
      const nextFajrMoment = moment(timings.Fajr, "HH:mm").add(1, "days");
      setNextPrayer(" Fajr");
      const remainingTime = nextFajrMoment.diff(currentMoment);
      setRemainingTimeUntilNextPrayer(remainingTime);
    }
  };

  return {
    currentTime,
    nextPrayer,
    handleCityChange,
    remainingTimeUntilNextPrayer,
    selectedCity,
    timings
  };
};

export default useMainContext;
