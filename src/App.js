import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';

// React
import { useEffect, useState } from 'react';

// material ui components
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import governorates from "./governorates";

// external library
import axios from "axios";
import moment from 'moment/moment';
import "moment/min/locales";
import { useTranslation } from "react-i18next";
moment.locale("ar");

const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
});

// ------- helpers: background + icon based on weather -------

function getBackgroundGradient(main, isDay) {
  const key = (main || "").toLowerCase();

  if (key.includes("clear")) {
    return isDay
      ? "linear-gradient(135deg, #4A90D9 0%, #7EC8E3 55%, #FFE9A8 100%)"
      : "linear-gradient(135deg, #0B1E3D 0%, #1B2F5C 60%, #3B2F6B 100%)";
  }
  if (key.includes("cloud")) {
    return isDay
      ? "linear-gradient(135deg, #7E97B4 0%, #AEC0D6 55%, #E2E8F0 100%)"
      : "linear-gradient(135deg, #1F2937 0%, #374151 60%, #4B5563 100%)";
  }
  if (key.includes("rain") || key.includes("drizzle")) {
    return isDay
      ? "linear-gradient(135deg, #445876 0%, #63768F 55%, #8395A7 100%)"
      : "linear-gradient(135deg, #0F172A 0%, #1E293B 60%, #334155 100%)";
  }
  if (key.includes("thunderstorm")) {
    return "linear-gradient(135deg, #14142B 0%, #16213E 55%, #0F3460 100%)";
  }
  if (key.includes("snow")) {
    return isDay
      ? "linear-gradient(135deg, #B9C9DA 0%, #DCE7F0 55%, #FFFFFF 100%)"
      : "linear-gradient(135deg, #2C3E50 0%, #34495E 60%, #4A6178 100%)";
  }
  if (key.includes("mist") || key.includes("fog") || key.includes("haze")) {
    return "linear-gradient(135deg, #8B97A3 0%, #B7C0C9 55%, #DDE1E6 100%)";
  }
  return isDay
    ? "linear-gradient(135deg, #4A90D9 0%, #87CEEB 100%)"
    : "linear-gradient(135deg, #0B1E3D 0%, #1B2F5C 100%)";
}

// temperature adds a "how it feels" tint on top of the weather-condition background
function getTemperatureTint(temp) {
  if (temp === null || temp === undefined) return "rgba(0,0,0,0)";
  if (temp <= 5) return "rgba(59,130,246,0.35)";     // برد شديد - أزرق قوي
  if (temp <= 15) return "rgba(96,165,250,0.2)";      // برد خفيف - أزرق فاتح
  if (temp <= 27) return "rgba(0,0,0,0)";             // معتدل - بدون لمسة
  if (temp <= 35) return "rgba(251,191,36,0.22)";     // دافئ - أصفر
  return "rgba(239,68,68,0.32)";                      // حر شديد - أحمر
}

function WeatherIcon({ main, isDay }) {
  const key = (main || "").toLowerCase();

  if (key.includes("clear")) {
    return isDay ? (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <g className="sun-rays" stroke="#FFD166" strokeWidth="4" strokeLinecap="round">
          <line x1="50" y1="8" x2="50" y2="20" />
          <line x1="50" y1="80" x2="50" y2="92" />
          <line x1="8" y1="50" x2="20" y2="50" />
          <line x1="80" y1="50" x2="92" y2="50" />
          <line x1="21" y1="21" x2="29" y2="29" />
          <line x1="71" y1="71" x2="79" y2="79" />
          <line x1="21" y1="79" x2="29" y2="71" />
          <line x1="71" y1="29" x2="79" y2="21" />
        </g>
        <circle cx="50" cy="50" r="22" fill="#FFD166" className="sun-core" />
      </svg>
    ) : (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <path d="M62 20a32 32 0 1 0 18 58 26 26 0 0 1-18-58z" fill="#F4E8C1" className="moon-glow" />
        <circle cx="28" cy="28" r="1.6" fill="#fff" className="star star1" />
        <circle cx="76" cy="24" r="1.2" fill="#fff" className="star star2" />
        <circle cx="20" cy="62" r="1.3" fill="#fff" className="star star3" />
      </svg>
    );
  }

  if (key.includes("thunderstorm")) {
    return (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <g className="cloud-drift">
          <ellipse cx="42" cy="40" rx="26" ry="16" fill="#B0B8C4" />
          <ellipse cx="62" cy="36" rx="18" ry="14" fill="#B0B8C4" />
        </g>
        <polygon points="52,55 40,75 50,75 44,92 66,68 54,68 60,55" fill="#FFD166" className="lightning" />
      </svg>
    );
  }

  if (key.includes("rain") || key.includes("drizzle")) {
    return (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <g className="cloud-drift">
          <ellipse cx="42" cy="42" rx="26" ry="16" fill="#E5E9F0" />
          <ellipse cx="62" cy="38" rx="18" ry="14" fill="#E5E9F0" />
        </g>
        <g stroke="#7FB3E8" strokeWidth="3" strokeLinecap="round">
          <line x1="35" y1="65" x2="30" y2="80" className="rain-drop drop1" />
          <line x1="50" y1="65" x2="45" y2="80" className="rain-drop drop2" />
          <line x1="65" y1="65" x2="60" y2="80" className="rain-drop drop3" />
        </g>
      </svg>
    );
  }

  if (key.includes("snow")) {
    return (
      <svg viewBox="0 0 100 100" width="90" height="90">
        <g className="cloud-drift">
          <ellipse cx="42" cy="42" rx="26" ry="16" fill="#E9EEF3" />
          <ellipse cx="62" cy="38" rx="18" ry="14" fill="#E9EEF3" />
        </g>
        <g fill="#fff">
          <circle cx="35" cy="70" r="2.5" className="snow-flake flake1" />
          <circle cx="50" cy="75" r="2.5" className="snow-flake flake2" />
          <circle cx="65" cy="70" r="2.5" className="snow-flake flake3" />
        </g>
      </svg>
    );
  }

  // default: clouds / mist / anything else
  return (
    <svg viewBox="0 0 100 100" width="90" height="90">
      <g className="cloud-drift">
        <ellipse cx="42" cy="55" rx="26" ry="18" fill="#fff" opacity="0.95" />
        <ellipse cx="62" cy="48" rx="20" ry="16" fill="#fff" opacity="0.9" />
        <ellipse cx="28" cy="50" rx="16" ry="13" fill="#fff" opacity="0.85" />
      </g>
    </svg>
  );
}

// let cancelAxious = null;

function App() {
  const { t, i18n } = useTranslation();

  const [dateAndTime, setDateAndTime] = useState("");

  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    main: "",
    isDay: true,
  });

  const [locale, setLocale] = useState("ar");

  const [selectedGovernorate, setSelectedGovernorate] = useState(
    governorates[0]
  );

  const dirrection = locale === "ar" ? "rtl" : "ltr";

  function handlelenguageClick() {
    if (locale === "en") {
      setLocale("ar");
      i18n.changeLanguage("ar");
      moment.locale("ar");
    } else {
      setLocale("en");
      i18n.changeLanguage("en");
      moment.locale("en");
    }
    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
  }

  // useEffect(() => {
  //   i18n.changeLanguage(locale);
  // }, []);


  useEffect(() => {
  i18n.changeLanguage(locale);
}, [i18n, locale]);

  useEffect(() => {
    setDateAndTime(moment().format('MMMM Do YYYY, h:mm:ss a'));

    axios
      .get(
        
        `https://api.openweathermap.org/data/2.5/weather?lat=${selectedGovernorate.lat}&lon=${selectedGovernorate.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=${locale}`
        // `https://api.openweathermap.org/data/2.5/weather?lat=${selectedGovernorate.lat}&lon=${selectedGovernorate.lon}&appid=75cb02da51ddd0716d27b13d832317f6&lang=${locale}`
      )
      .then((response) => {
        const responseTemp = Math.round(response.data.main.temp - 273.15);
        const min = Math.round(response.data.main.temp_min - 273.15);
        const max = Math.round(response.data.main.temp_max - 273.15);
        const description = response.data.weather[0].description;
        const main = response.data.weather[0].main;

        const now = response.data.dt;
        const sunrise = response.data.sys.sunrise;
        const sunset = response.data.sys.sunset;
        const isDay = now >= sunrise && now < sunset;

        setTemp({
          number: responseTemp,
          min: min,
          max: max,
          description: description,
          main: main,
          isDay: isDay,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      console.log("Canselling");
    };
  }, [selectedGovernorate, locale]);

  return (
    <div
      className="App"
      style={{
        position: "relative",
        minHeight: "100vh",
        background: getBackgroundGradient(temp.main, temp.isDay),
        transition: "background 1.2s ease",
        overflow: "hidden",
      }}
    >
      {/* temperature-based tint overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: getTemperatureTint(temp.number),
          transition: "background 1.2s ease",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes sunPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.08); opacity: 0.85; }
        }
        @keyframes sunRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes cloudDrift {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(6px); }
        }
        @keyframes rainFall {
          0% { transform: translateY(-4px); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(10px); opacity: 0; }
        }
        @keyframes snowFall {
          0% { transform: translateY(-4px) rotate(0deg); opacity: 0; }
          40% { opacity: 1; }
          100% { transform: translateY(14px) rotate(180deg); opacity: 0; }
        }
        @keyframes flash {
          0%, 100% { opacity: 0; }
          10%, 12% { opacity: 1; }
          14% { opacity: 0; }
        }
        @keyframes cardFade {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .sun-core { animation: sunPulse 3s ease-in-out infinite; transform-origin: 50px 50px; }
        .sun-rays { animation: sunRotate 20s linear infinite; transform-origin: 50px 50px; }
        .moon-glow { animation: sunPulse 4s ease-in-out infinite; transform-origin: 50px 50px; }
        .star { animation: sunPulse 2s ease-in-out infinite; }
        .star2 { animation-delay: .5s; }
        .star3 { animation-delay: 1s; }
        .cloud-drift { animation: cloudDrift 4s ease-in-out infinite; }
        .rain-drop { animation: rainFall 1s linear infinite; }
        .drop2 { animation-delay: .3s; }
        .drop3 { animation-delay: .6s; }
        .snow-flake { animation: snowFall 2s linear infinite; }
        .flake2 { animation-delay: .6s; }
        .flake3 { animation-delay: 1.2s; }
        .lightning { animation: flash 2.5s ease-in-out infinite; }
        .weather-card { animation: cardFade 0.5s ease; }
      `}</style>

      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" style={{ position: "relative" }}>
          <div style={{
            minHeight: "100vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px 0",
          }}>

            <FormControl fullWidth style={{ marginBottom: "15px" }}>
              <Select
                value={selectedGovernorate.name}
                onChange={(e) => {
                  const governorate = governorates.find(
                    (item) => item.name === e.target.value
                  );
                  setSelectedGovernorate(governorate);
                }}
                dir={dirrection}
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  borderRadius: "12px",
                  fontSize: "18px",
                }}
                MenuProps={{
                  PaperProps: {
                    style: { maxHeight: 300 },
                  },
                }}
              >
                {governorates.map((governorate) => (
                  <MenuItem
                    key={governorate.name}
                    value={governorate.name}
                    style={{ fontSize: "18px" }}
                  >
                    {locale === "ar" ? governorate.arabicName : governorate.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div
              key={`${selectedGovernorate.name}-${locale}`}
              dir={dirrection}
              className="weather-card"
              style={{
                background: "rgba(255,255,255,0.14)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.25)",
                color: "white",
                width: "100%",
                padding: "24px",
                borderRadius: "20px",
                boxShadow: "0px 12px 32px rgba(0,0,0,0.25)",
              }}
            >
              <div>
                {/* city & time */}
                <div style={{ display: "flex", alignItems: "end", justifyContent: "start" }} dir={dirrection}>
                  <Typography variant="h2" style={{ marginRight: "20px", fontWeight: "600" }}>
                    {locale === "ar" ? selectedGovernorate.arabicName : selectedGovernorate.name}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px", opacity: 0.85 }}>
                    {dateAndTime}
                  </Typography>
                </div>

                <hr style={{ borderColor: "rgba(255,255,255,0.25)", margin: "16px 0" }} />

                {/* degree + icon */}
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <Typography variant="h1" style={{ textAlign: 'right' }}>
                        {temp.number}°
                      </Typography>
                    </div>

                    <Typography variant="h6" style={{ opacity: 0.9 }}>
                      {temp.description}
                    </Typography>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                      <h5> {t("min")}: {temp.min} </h5>
                      <h5 style={{ margin: "0px 5px" }}> | </h5>
                      <h5> {t("max")}: {temp.max} </h5>
                    </div>
                  </div>

                  <WeatherIcon main={temp.main} isDay={temp.isDay} />
                </div>
              </div>
            </div>

            <div dir={dirrection} style={{ width: "100%", display: "flex", justifyContent: "end", marginTop: "20px" }}>
              <Button style={{ color: "white" }} variant="text" onClick={handlelenguageClick}>
                {locale === "en" ? "Arabic" : "انجليزي"}
              </Button>
            </div>

          </div>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;