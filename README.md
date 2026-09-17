# 🌦️ Weather App

A modern and responsive weather application built with **React.js**, designed to provide real-time weather information for Egyptian governorates.

The application connects to the **OpenWeatherMap API** to fetch live weather data and provides a dynamic interface that changes based on the weather condition, temperature, and day/night status.

---

## 📸 Overview

The Weather App allows users to:

* Select an Egyptian governorate.
* View the current temperature.
* View minimum and maximum temperatures.
* View the current weather description.
* Detect day/night based on sunrise and sunset.
* Switch between Arabic and English.
* Automatically switch between RTL and LTR layouts.
* Experience dynamic backgrounds based on weather conditions.
* View animated custom SVG weather icons.
* Get a temperature-based visual effect.
* View the current date and time.

---

## ✨ Features

### 🌡️ Real-Time Weather Data

Weather information is fetched dynamically from the **OpenWeatherMap API**, including:

* Current temperature
* Minimum temperature
* Maximum temperature
* Weather description
* Weather condition
* Sunrise
* Sunset

### 📍 Governorate Selection

Users can select from a list of Egyptian governorates, and the application automatically fetches the weather data for the selected location.

### 🌅 Day & Night Detection

The application determines whether it is currently day or night using the API's:

* `sunrise`
* `sunset`
* `dt`

The UI then changes accordingly.

### 🎨 Dynamic Weather Backgrounds

The background changes based on the current weather condition:

* ☀️ Clear
* ☁️ Cloudy
* 🌧️ Rain
* ⛈️ Thunderstorm
* ❄️ Snow
* 🌫️ Mist / Fog

The background also changes depending on whether it is day or night.

### 🌡️ Temperature-Based Visual Effect

A temperature overlay is applied dynamically to create different visual feelings:

* Cold → Blue tint
* Moderate → Neutral
* Warm → Yellow tint
* Very hot → Red tint

### 🌤️ Custom Animated Weather Icons

Instead of relying only on external weather icon libraries, the application uses custom **SVG weather icons** with CSS animations.

Animations include:

* Sun rotation and pulse
* Moon glow
* Cloud movement
* Rain drops
* Snow fall
* Lightning flash
* Star animation

### 🌍 Arabic & English Support

The application supports:

* Arabic 🇪🇬
* English 🇬🇧

It also supports:

* RTL for Arabic
* LTR for English

Localization is handled using **i18next** and **react-i18next**.

### 🕐 Date & Time

The application uses **Moment.js** to display the current date and time according to the selected language.

### 💎 Modern UI

The interface uses:

* Material UI
* Glassmorphism
* Responsive layout
* Dynamic gradients
* CSS animations
* Smooth transitions

---

## ⚛️ React Concepts Used

This project helped me practice and apply several React concepts, including:

* Functional Components
* `useState`
* `useEffect`
* Props
* Conditional Rendering
* Dynamic Styling
* Event Handling
* API Integration
* State Management
* Component-based Architecture

### Example

`useState` is used to manage:

* Weather data
* Selected governorate
* Language
* Date and time

`useEffect` is used to:

* Fetch weather data
* React to changes in the selected governorate
* React to language changes

Props are used to pass weather information to the custom `WeatherIcon` component.

---

## 🛠️ Technologies Used

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| React.js           | Front-end framework        |
| JavaScript         | Application logic          |
| Material UI        | UI components              |
| Axios              | API requests               |
| OpenWeatherMap API | Weather data               |
| i18next            | Localization               |
| react-i18next      | React internationalization |
| Moment.js          | Date & time                |
| SVG                | Custom weather icons       |
| CSS                | Styling & animations       |
| Git & GitHub       | Version control            |

---

## 📁 Project Structure

```text
weather-app/
│
├── public/
│   ├── Fonts/
│   │   └── IBMFont/
│   └── locales/
│       └── ar/
│           └── translation.json
│
├── src/
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── i18n.js
│   ├── governorates.js
│   └── TestComponent.js
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shahdkhair811/weather-app-react.git
```

### 2. Navigate to the Project

```bash
cd weather-app-react
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_WEATHER_API_KEY=YOUR_API_KEY
```

Replace `YOUR_API_KEY` with your OpenWeatherMap API key.

> **Note:** The `.env` file should not be committed to GitHub.

### 5. Start the Application

```bash
npm start
```

The application will run locally at:

```text
http://localhost:3000
```

---

## 🔑 API

This project uses the **OpenWeatherMap API** to retrieve real-time weather information.

The API request uses:

* Latitude
* Longitude
* API Key
* Language

Example:

```text
https://api.openweathermap.org/data/2.5/weather
```

The weather description is also localized through the API using the selected language.

---

## 🌐 Internationalization

The application uses **i18next** and **react-i18next** for interface translations.

Example:

```javascript
const { t, i18n } = useTranslation();
```

Changing the language updates:

* Interface text
* Weather description
* Layout direction
* Date formatting

Arabic uses:

```text
RTL
```

English uses:

```text
LTR
```

---

## 🎨 UI & Design

The application follows a modern glassmorphism-inspired design.

Main design elements include:

* Transparent glass cards
* Blur effects
* Dynamic gradients
* Smooth transitions
* Animated weather illustrations
* Responsive layout
* Arabic-friendly typography

The application uses the **IBM Plex Sans Arabic** font for better Arabic readability.

---

## 📱 Responsive Design

The application is designed to work across different screen sizes, including:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile

The layout uses Material UI's responsive container system and flexible CSS layouts.

---

## 🔒 Environment Variables

The weather API key is stored in an environment variable instead of being written directly inside the source code.

```env
REACT_APP_WEATHER_API_KEY=YOUR_API_KEY
```

The `.env` file is excluded from Git using `.gitignore`.

> **Important:** Front-end environment variables are included in the client-side application at build time, so they should not be treated as fully secret credentials. API keys should be restricted according to the API provider's available security options.

---

## 📚 What I Learned

This project was built as a practical step in my React learning journey.

Through this project, I practiced how to connect a React application with a real API and combine:

```text
API
  ↓
State
  ↓
Components
  ↓
Conditional Rendering
  ↓
Dynamic UI
```

It also helped me improve my understanding of:

* React Hooks
* API integration
* State updates
* Component communication
* Dynamic styling
* Localization
* RTL/LTR layouts
* Working with external libraries
* Building interactive user interfaces

---

## 🔮 Future Improvements

Possible future improvements include:

* [ ] Add a loading state
* [ ] Add error handling UI
* [ ] Add more detailed weather information
* [ ] Add hourly forecast
* [ ] Add 5-day forecast
* [ ] Add geolocation support
* [ ] Improve mobile experience
* [ ] Add weather-based sound or additional animations
* [ ] Improve accessibility
* [ ] Deploy the application online

---

## 👩‍💻 Author

**Shahd Khair Hamed**

Front-End Developer | React Learner

Interested in building modern, interactive, and user-focused web applications.

### GitHub

https://github.com/Shahdkhair811

### Project Repository

https://github.com/Shahdkhair811/weather-app-react

---

## ⭐ Project

If you find this project useful or interesting, feel free to give it a ⭐ on GitHub.

---

### 📌 Project Status

**Completed — Continuously improving while learning React.js.**

Built with ❤️ using React.js.
