import moment from "moment";
import { useEffect, useState } from "react";
import axios from "axios";

const useMainContent = () => {
  const [timings, setTimings] = useState({});
  const [currentTime, setCurrentTime] = useState(null);
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [nextPrayer, setNextPrayer] = useState("");
  const [remainingTimeUntilNextPrayer, setRemainingTimeUntilNextPrayer] =
    useState();

  const [locationError, setLocationError] = useState("");

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  //             get  location of user (client)
  useEffect(() => {
    // from (client)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // send long & lat to free API
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await res.json();

            const cityName = data.address.city;

            if (cityName) {
              setSelectedCity(cityName);
            }
          } catch (err) {
            console.error("Error fetching city name:", err);
            setSelectedCity("cairo");
            setLocationError(
              "Your location could not be determined. Cairo was automatically selected."
            );
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setSelectedCity("cairo");
          setLocationError(
            "Location permission denied. Cairo was automatically selected."
          );
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setSelectedCity("cairo");
      setLocationError(
        "The browser does not support location selection. Cairo has been automatically selected."
      );
    }
  }, []);

  // get times of city (selectedCity) for every prayer
  useEffect(() => {
    const fetchPrayerTimings = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity}&country=EGY&method=8`
        );
        setTimings(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer timings:", error);
      }
    };

    fetchPrayerTimings();
  }, [selectedCity]);

  // get CurrentTime every minute
  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(moment().format("h:mm a |  MMMM Do YYYY "));
    };
    updateCurrentTime();
    const intervalTime = setInterval(updateCurrentTime, 60 * 1000);
    return () => {
      clearInterval(intervalTime);
    };
  }, []);

  const setupCountdownTimer = () => {
    let currentMoment = moment();

    const Fajr = moment(timings.Fajr, "HH:mm");
    const Duhr = moment(timings.Dhuhr, "HH:mm");
    const Asr = moment(timings.Asr, "HH:mm");
    const Sunset = moment(timings.Sunset, "HH:mm");
    const Isha = moment(timings.Isha, "HH:mm");

    if (currentMoment.isAfter(Fajr) && currentMoment.isBefore(Duhr)) {
      setNextPrayer(" Duhr");
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

  useEffect(() => {
    setupCountdownTimer();
    let interval = setInterval(() => {
      setupCountdownTimer();
    }, 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  return {
    currentTime,
    nextPrayer,
    handleCityChange,
    remainingTimeUntilNextPrayer,
    selectedCity,
    timings,
    locationError,
    setLocationError,
  };
};

export default useMainContent;
