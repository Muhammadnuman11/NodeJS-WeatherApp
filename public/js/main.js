// """"""""""""""""""""""""Time"""""""""""""""""""""""""""""""""""

let timeFun = () => {
    // New Date for Time
    let newDate = new Date();
    // Get Day Name
    let day = newDate.getDay();
    let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    dayName = dayName[day];
    // console.log(dayName);

    // Get Month Name
    let month = newDate.getMonth();
    let monthName = ['Jun', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    monthName = monthName[month];
    // console.log(monthName);

    // Get Date
    let date = newDate.getDate();
    if (date <= 9) {
        date = "0" + date;
    }
    // console.log(date);

    // Get Time
    let hrs = newDate.getHours();
    let min = newDate.getMinutes();
    let sec = newDate.getSeconds();
    if (hrs <= 12) {
        periods = "AM";
    }
    else {
        periods = "PM";
    }
    if (hrs > 12) {
        hrs = hrs - 12;
    }
    if (hrs <= 9) {
        hrs = "0" + hrs;
    }
    if (hrs == 00) {
        hrs = 12;
    }
    if (min <= 9) {
        min = "0" + min;
    }
    if (sec <= 9) {
        sec = "0" + sec;
    }
    let time = hrs + ":" + min + ":" + sec + " " + periods;
    // console.log(time);
    let getDay = document.getElementById('day').innerHTML = `${dayName}`;
    let getTime = document.getElementById('time').innerHTML = `${monthName} ${date}`;
    let getDate = document.getElementById('date').innerHTML = `${time}`;
}

setInterval(() => {
    timeFun();
}, 1000);

// Weather JavaScript
const cityInput = document.getElementById('cityInput');
const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const temp = document.getElementById('temp');
const tempStatus = document.getElementById('tempStatus');

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let inputVal = cityInput.value;
    if (inputVal === "") {
        cityName.innerText = `Plz write the city name before search`;
        temp.innerText = 0;
        tempStatus.innerHTML = ``;
        cityInput.value = "";
    }
    else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&units=metric&appid=8f661b5fb9fef821912fd95bc50e6ad3`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            cityName.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp.innerText = Math.floor(arrData[0].main.temp);
            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clear") {
                let newDate = new Date();
                let hours = newDate.getHours();
                if (hours >= 6 && hours <= 18) {
                    tempStatus.innerHTML = `<i style=" 
                color: #eccc68;" class="bi bi-brightness-high-fill"></i>`;
                }
                else {
                    tempStatus.innerHTML = `<i style=" 
                color: #fff;" class="bi bi-moon-fill"></i>`;
                }
            }

            else if (tempMood == "Clouds") {
                tempStatus.innerHTML = `<i style="color: #f1f2f6;" class="bi bi-cloud-fill"></i>`;
            }

            else if (tempMood == "Rain") {
                tempStatus.innerHTML = `<i  style="color: #a4b0be;" class="bi bi-cloud-drizzle-fill"></i>`;
            }

            cityInput.value = "";

        } catch (error) {
            cityName.innerText = `Plz enter the city name properly`;
            temp.innerText = 0;
            tempStatus.innerHTML = ``;
            cityInput.value = "";
        }
    }
})


