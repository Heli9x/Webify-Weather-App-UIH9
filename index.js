//apiUrl = "https://api.openweathermap.org/data/2.5/weather?id=2172797&appid=371194fef29cadc50d35ae9b135bfdf5e";

$(document).ready(() =>{

    //Get Hours
    function getHour(){
        let hour = new Date()
        return hour.getUTCHours()
    }

    //UI Color Interaction
    let root = document.documentElement;
    let theme_num = 0
    let themes_list = [
        ["0D1117", "C9D1D9"],  // GitHub Dark Mode: Deep Navy & Soft Blue-Gray
        ["1E1E2E", "A6ADC8"],  // Elegant Midnight: Dark Indigo & Cool Gray
        ["222831", "EEEEEE"],  // Cyber Gray: Charcoal Black & Bright White
        ["2B2D42", "EDF2F4"],  // Twilight: Dark Slate & Light Mist
        ["3B4252", "ECEFF4"],  // Nordic Night: Deep Steel & Frost White
        ["FFFFFF", "1F2937"],  // Classic White: Pure White & Deep Blue-Gray
        ["F8F9FA", "343A40"],  // Minimalist Gray: Soft White & Dark Steel
        ["FAF3E0", "3D405B"],  // Warm Beige: Creamy Sand & Muted Blue-Gray
        ["E8F5E9", "1B5E20"],  // Soft Green: Misty Mint & Forest Green
        ["FBEAE7", "8B2635"],  // Cozy Blush: Light Peach & Deep Rose
        ["FF5733", "C70039"],  // Sunset: Vivid Orange & Deep Red
        ["900C3F", "FFC300"],  // Sunrise: Dark Magenta & Bright Yellow
        ["581845", "DAF7A6"],  // Grape: Deep Purple & Light Green
        ["1C1C1C", "F2F2F2"],  // Monochrome: Jet Black & Light Gray
        ["4A235A", "F7DC6F"],  // Royal: Deep Purple & Soft Yellow
        ["154360", "76D7C4"],  // Ocean: Deep Blue & Aqua
        ["7D3C98", "FAD7A0"],  // Lavender: Soft Purple & Light Peach
        ["1B4F72", "D5DBDB"],  // Steel: Dark Blue & Light Gray
        ["0E6655", "ABEBC6"],  // Forest: Dark Green & Light Mint
        ["FFB6C1", "8B0000"],  // Light Pink & Dark Red
        ["FFD700", "8B4513"],  // Gold & Saddle Brown
        ["00FF00", "006400"],  // Lime & Dark Green
        ["00FFFF", "4682B4"],  // Aqua & Steel Blue
        ["FF00FF", "800080"],  // Magenta & Purple
        ["FF4500", "2E8B57"],  // Orange Red & Sea Green
        ["DAA520", "556B2F"],  // Goldenrod & Dark Olive Green
        ["B22222", "FFFAF0"],  // Firebrick & Floral White
        ["8A2BE2", "D8BFD8"],  // Blue Violet & Thistle
        ["5F9EA0", "F0FFFF"]   // Cadet Blue & Azure
    ]


    function nextTheme(theme){
        root.style.setProperty('--main-color', "#"+theme[theme_num][0]);
        root.style.setProperty('--text-color', "#"+theme[theme_num][1]);
        theme_num++;
        if(theme_num > theme.length-1){
            theme_num = 0;
        }
    }

    function randomTheme(theme){
        let randomNum = Math.ceil(Math.random() * theme.length);
        root.style.setProperty('--main-color', "#"+theme[randomNum][0]);
        root.style.setProperty('--text-color', "#"+theme[randomNum][1]);

    }

    function setSavedTheme(){
        $.get("http://127.0.0.1:5048/get_theme").done(function(res){
            root.style.setProperty('--main-color', "#"+res[1]);
            root.style.setProperty('--text-color', "#"+res[0]);
        })

    }


    //Get Weather Details | Render on page
    const default_city = $('.card-grid');

    async function checkWeather(city) {
        //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3b7d95ef4a86b41f16d97906434e5180&units=metric`);
        const response = await fetch(`https://wwa-h9.onrender.com/get_preset_city?city=${city}`);
        var data = await response.json()
        console.log(data);

        function round(num){
            return Math.round(num)
        }
        

        const weather_data = {
            country: data['sys']['country'],
            city: data['name'],
            "average_temp": data['main']['temp'],
            "wind":['speed',data['wind']['speed'],'km/h'],
            "humidity": ['precipitation', data['main']['humidity'], '%'],
            "pressure": ['density', data['main']['pressure'], 'atm'],
            "ico": data["weather"][0]["icon"],
            "description": data["weather"][0]["description"]
        }

        $('.descript').html(weather_data["description"])
        $('.num').html(round(weather_data["average_temp"]))
        $('#w-img').attr('src', `https://openweathermap.org/img/wn/${weather_data["ico"]}@4x.png`)
        document.querySelector('.place').innerHTML = weather_data['city']


        let components = ['wind', 'humidity', 'pressure']

        default_city.html('')

        function renderElement(list){
            list.forEach(component => {
                console.log(component);
                default_city.append(
                    `
                <div class="card f-col f-center-left">
                    <div class="card-title">${component}</div>
                    <div class="card-ico">
                        <i class="fas fa-${component == "wind"? "wind": component == "pressure"? "cloud" : "droplet"}"></i>
                    </div>
                    <h4 class="merit">
                        ${weather_data[component][1]} <small>${weather_data[component][2]}</small>
                    </h4>
                </div>
                    `
                )
            });
        }

        renderElement(components);
    }


    $('#search').on('click', function(){
        checkWeather($('#info').val());
        console.log(getHour())
        console.log($('#info').val());
    })

    $('#themer').on('click', function(){
        nextTheme(themes_list);
    })
})
