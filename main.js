const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {

    const APIKey = '3a924561320840da8a2101631232004';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`)
      .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box .img');
            const ic = document.querySelector('.weather-box .icon');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            

            temperature.innerHTML = `${parseInt(json.current.temp_c)}<span>°C</span>`;
            description.innerHTML = `${json.current.condition.text}`;
            humidity.innerHTML = `${json.current.humidity}%`;
            wind.innerHTML = `${parseInt(json.current.wind_kph)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

            var isDay=`${parseInt(json.current.is_day)}`;
            var code=`${parseInt(json.current.condition.code)}`;
            console.log(code);
            fetch(`https://www.weatherapi.com/docs/weather_conditions.json`)
            .then(response => response.json())
            .then(data => {
                // So sánh biến code với các giá trị trong đối tượng JSON
                for (const item of data) {
                if (item.code == code) {
                    var icon = item.icon;
                    if(isDay==1){
                        ic.src='icon/day/'+icon+'.png';
                    }
                    else{
                        ic.src='icon/night/'+icon+'.png';
                    }
                    
                    break;
                }
                }
            })
            .catch(error => console.error(errorIcon));




        });


});
