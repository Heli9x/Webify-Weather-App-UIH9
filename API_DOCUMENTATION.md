# Weather App - Comprehensive API Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [JavaScript APIs](#javascript-apis)
3. [CSS Utility Classes](#css-utility-classes)
4. [HTML Components](#html-components)
5. [Theme System](#theme-system)
6. [API Integration](#api-integration)
7. [Responsive Design](#responsive-design)
8. [Usage Examples](#usage-examples)

## Project Overview

The Webify Weather App is a modern, responsive web application that displays weather information with dynamic theming capabilities. It fetches weather data from OpenWeatherMap API and provides an intuitive user interface with customizable color themes.

**Live Demo**: https://heli9x.github.io/Webify-Weather-App-UIH9/

**Technologies Used**:
- HTML5
- CSS3 (with custom properties)
- JavaScript (ES6+)
- jQuery 3.7.1
- FontAwesome icons
- OpenWeatherMap API

---

## JavaScript APIs

### Core Weather Functions

#### `checkWeather(city)`
**Description**: Main function to fetch and display weather data for a specified city.

**Parameters**:
- `city` (string): The name of the city to fetch weather data for

**Returns**: Promise (void)

**Usage**:
```javascript
// Fetch weather for London
await checkWeather('London');

// Fetch weather for New York
await checkWeather('New York');
```

**API Endpoint**: `https://wwa-h9.onrender.com/get_preset_city?city=${city}`

**Response Structure**:
```javascript
{
  sys: { country: 'US' },
  name: 'New York',
  main: {
    temp: 20.5,
    humidity: 65,
    pressure: 1013
  },
  wind: { speed: 5.2 },
  weather: [{
    icon: '04d',
    description: 'overcast clouds'
  }]
}
```

---

### Utility Functions

#### `getHour()`
**Description**: Returns the current UTC hour.

**Parameters**: None

**Returns**: `number` - Current UTC hour (0-23)

**Usage**:
```javascript
const currentHour = getHour();
console.log(`Current UTC hour: ${currentHour}`);
```

#### `round(num)`
**Description**: Rounds a number to the nearest integer (internal helper function).

**Parameters**:
- `num` (number): Number to round

**Returns**: `number` - Rounded integer

**Usage**:
```javascript
const roundedTemp = round(20.7); // Returns 21
```

---

### Theme Management Functions

#### `nextTheme(theme)`
**Description**: Cycles through the predefined color themes sequentially.

**Parameters**:
- `theme` (Array): Array of theme color pairs

**Returns**: void

**Usage**:
```javascript
// Cycle to the next theme
nextTheme(themes_list);
```

**Side Effects**:
- Updates CSS custom properties `--main-color` and `--text-color`
- Increments global `theme_num` counter
- Resets counter when reaching end of themes array

#### `randomTheme(theme)`
**Description**: Sets a random theme from the available themes.

**Parameters**:
- `theme` (Array): Array of theme color pairs

**Returns**: void

**Usage**:
```javascript
// Set a random theme
randomTheme(themes_list);
```

#### `setSavedTheme()`
**Description**: Retrieves and applies a previously saved theme from the server.

**Parameters**: None

**Returns**: void

**API Endpoint**: `http://127.0.0.1:5048/get_theme`

**Usage**:
```javascript
// Load saved theme
setSavedTheme();
```

---

### Rendering Functions

#### `renderElement(list)`
**Description**: Dynamically generates and renders weather detail cards (wind, humidity, pressure).

**Parameters**:
- `list` (Array): Array of component names to render

**Returns**: void

**Usage**:
```javascript
const components = ['wind', 'humidity', 'pressure'];
renderElement(components);
```

**Generated HTML Structure**:
```html
<div class="card f-col f-center-left">
    <div class="card-title">Wind</div>
    <div class="card-ico">
        <i class="fas fa-wind"></i>
    </div>
    <h4 class="merit">
        5.2 <small>km/h</small>
    </h4>
</div>
```

---

## CSS Utility Classes

### Flexbox Utilities

#### Layout Classes
```css
.flex-contain        /* display: flex */
.f-center           /* justify-content: center; align-items: center */
.f-between          /* justify-content: space-between */
.f-even             /* justify-content: space-evenly */
.f-center-left      /* justify-content: flex-start; align-items: center */
.f-center-right     /* justify-content: flex-end; align-items: center */
.f-col              /* flex-direction: column */
.f-flip             /* flex-direction: column-reverse */
```

**Usage Examples**:
```html
<!-- Center content both horizontally and vertically -->
<div class="f-center">
    <p>Centered content</p>
</div>

<!-- Create a flex column layout -->
<div class="flex-contain f-col">
    <div>Item 1</div>
    <div>Item 2</div>
</div>

<!-- Space elements between -->
<div class="flex-contain f-between">
    <div>Left item</div>
    <div>Right item</div>
</div>
```

### Visual Utilities

#### Border Utilities
```css
.rounded-borders     /* border-radius: 5px */
```

**Usage**:
```html
<div class="rounded-borders">
    Content with rounded corners
</div>
```

---

## HTML Components

### Search Component

#### Structure
```html
<div class="search-box">
    <div class="input f-center">
        <input type="text" id="info" placeholder="search a city">
        <button class="fas fa-search" id="search"></button>
    </div>
</div>
```

#### Features
- Responsive input field
- FontAwesome search icon
- Integrated with weather API

#### Event Handlers
- **Search Button Click**: Triggers weather data fetch
- **Input Field**: Accepts city name input

---

### Weather Display Component

#### Main Weather Info
```html
<div class="weather-info f-center-left">
    <div class="weather-img">
        <img src="weather-icon-url" alt="weather icon" id="w-img">
    </div>
    <div class="details f-center f-flip">
        <div class="descript">Weather description</div>
        <div class="temp flex-contain">
            <h3 class="num">Temperature</h3>
            <div class="degrees-ico">
                <i class="fas fa-circle"></i>
            </div>
            <h1>C</h1>
        </div>
    </div>
</div>
```

#### Dynamic Elements
- **Weather Icon**: Updates based on weather conditions
- **Temperature**: Displays in Celsius
- **Description**: Shows weather condition text
- **City Name**: Updates with searched location

---

### Theme Switcher Component

#### Structure
```html
<div class="theme btn">
    <button id="themer">
        <i class="fas fa-brush"></i>
    </button>
</div>
```

#### Functionality
- Single click cycles through themes
- FontAwesome brush icon
- Integrated with theme management system

---

### Weather Details Cards

#### Card Structure
```html
<div class="card f-col f-center-left">
    <div class="card-title">Metric Name</div>
    <div class="card-ico">
        <i class="fas fa-icon"></i>
    </div>
    <h4 class="merit">
        Value <small>Unit</small>
    </h4>
</div>
```

#### Available Metrics
1. **Wind Speed**
   - Icon: `fa-wind`
   - Unit: km/h
   - Color: Themed

2. **Humidity**
   - Icon: `fa-droplet`
   - Unit: %
   - Color: Themed

3. **Pressure**
   - Icon: `fa-cloud`
   - Unit: atm
   - Color: Themed

---

## Theme System

### Available Themes (29 total)

#### Theme Structure
Each theme consists of two colors: `[background, text]`

#### Featured Themes
```javascript
// GitHub Dark Mode
["0D1117", "C9D1D9"]

// Elegant Midnight
["1E1E2E", "A6ADC8"]

// Classic White
["FFFFFF", "1F2937"]

// Sunset
["FF5733", "C70039"]

// Ocean
["154360", "76D7C4"]
```

#### CSS Custom Properties
```css
:root {
    --text-color: #E0E0E0;
    --background-color: #061e2c77;
    --main-color: #9c1717;
}
```

#### Theme Application
Themes are applied by updating CSS custom properties:
- `--main-color`: Primary background color
- `--text-color`: Text and accent color

---

## API Integration

### Weather Data API

#### Endpoint
```
https://wwa-h9.onrender.com/get_preset_city?city={cityName}
```

#### Request Method
`GET`

#### Response Format
```json
{
  "sys": {
    "country": "US"
  },
  "name": "New York",
  "main": {
    "temp": 20.5,
    "humidity": 65,
    "pressure": 1013
  },
  "wind": {
    "speed": 5.2
  },
  "weather": [
    {
      "icon": "04d",
      "description": "overcast clouds"
    }
  ]
}
```

#### Error Handling
```javascript
try {
    const response = await fetch(`https://wwa-h9.onrender.com/get_preset_city?city=${city}`);
    const data = await response.json();
    // Process data
} catch (error) {
    console.error('Weather API error:', error);
}
```

---

## Responsive Design

### Breakpoints

#### Mobile Small (max-width: 350px)
- App width: 250px
- Compact card layout
- Hidden card icons
- Reduced text sizes

#### Mobile Medium (350px - 500px)
- App width: 350px
- Standard card layout
- Visible icons
- Medium text sizes

#### Desktop (min-width: 700px)
- App width: 650px
- Horizontal card layout
- Full feature display
- Large text sizes

### Responsive Classes
```css
/* Mobile-first approach */
.app { width: 400px; }

@media screen and (max-width: 350px) {
    .app { width: 250px; }
}

@media screen and (min-width: 700px) {
    .app { width: 650px; }
}
```

---

## Usage Examples

### Basic Implementation

#### HTML Setup
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/3e82404ffd.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
</head>
<body class="flex-contain f-center f-col">
    <!-- App components here -->
    <script src="index.js"></script>
</body>
</html>
```

#### JavaScript Initialization
```javascript
$(document).ready(() => {
    // Set up event handlers
    $('#search').on('click', function() {
        checkWeather($('#info').val());
    });
    
    $('#themer').on('click', function() {
        nextTheme(themes_list);
    });
    
    // Load default weather
    checkWeather('London');
});
```

### Custom Theme Implementation

#### Adding New Themes
```javascript
// Add to themes_list array
themes_list.push(["FF6B6B", "4ECDC4"]); // Coral & Turquoise
themes_list.push(["2C3E50", "ECF0F1"]); // Midnight Blue & Clouds
```

#### Custom Theme Function
```javascript
function setCustomTheme(backgroundColor, textColor) {
    const root = document.documentElement;
    root.style.setProperty('--main-color', backgroundColor);
    root.style.setProperty('--text-color', textColor);
}

// Usage
setCustomTheme('#FF5733', '#FFFFFF');
```

### Event Handler Examples

#### Search with Enter Key
```javascript
$('#info').on('keypress', function(e) {
    if (e.which === 13) { // Enter key
        checkWeather($(this).val());
    }
});
```

#### Auto-complete City Names
```javascript
const cities = ['London', 'New York', 'Tokyo', 'Paris'];

$('#info').on('input', function() {
    const query = $(this).val().toLowerCase();
    const suggestions = cities.filter(city => 
        city.toLowerCase().includes(query)
    );
    // Display suggestions
});
```

### Advanced Weather Display

#### Extended Weather Info
```javascript
function displayExtendedWeather(data) {
    const extendedInfo = {
        feels_like: data.main.feels_like,
        visibility: data.visibility,
        uv_index: data.uvi || 'N/A'
    };
    
    // Render additional weather cards
    Object.keys(extendedInfo).forEach(key => {
        renderWeatherCard(key, extendedInfo[key]);
    });
}
```

#### Weather Alerts
```javascript
function checkWeatherAlerts(data) {
    if (data.main.temp > 35) {
        showAlert('High temperature warning!', 'warning');
    }
    if (data.wind.speed > 20) {
        showAlert('Strong wind advisory!', 'caution');
    }
}
```

---

## Installation and Setup

### Prerequisites
- Modern web browser with ES6+ support
- Internet connection for API calls
- FontAwesome account (for icons)

### Quick Start
1. Clone the repository
2. Open `index.html` in a web browser
3. Enter a city name in the search box
4. Click the search button or press Enter
5. Use the theme button to cycle through color schemes

### Development Setup
```bash
# Serve locally (optional)
python -m http.server 8000
# or
npx serve .
```

### Dependencies
All dependencies are loaded via CDN:
- jQuery 3.7.1
- FontAwesome 6.x
- Google Fonts (Quicksand)

---

## Browser Support

### Tested Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Required Features
- CSS Grid
- Flexbox
- CSS Custom Properties
- ES6 Async/Await
- Fetch API

---

## Contributing

### Code Style
- Use camelCase for JavaScript variables
- Use kebab-case for CSS classes
- Follow semantic HTML structure
- Comment complex functions

### Adding New Features
1. Update documentation
2. Test across breakpoints
3. Ensure accessibility compliance
4. Follow existing naming conventions

---

## License

This project is open source. See LICENSE file for details.