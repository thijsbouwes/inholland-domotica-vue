<template>
    <div class="card">
        <div class="card-content">
            <span class="card-title">Weather</span>

            <div class="forecast" v-if="forecast">
                <div class="description">
                    <img :src="getIcon(forecast.weather[0].icon)" :alt="forecast.weather[0].description">
                    <span class="temp" v-html="formatCelsius(forecast.temp.day)"></span>
                </div>
                <div class="information">
                    <div>{{ weather_location.name }}</div>
                    <div class="weather_day">{{ formatTime(forecast.dt) | capitalize }}</div>
                    <div>{{ forecast.weather[0].description | capitalize }}</div>
                    <div>Humidity % {{ forecast.humidity }}</div>
                    <div>Luchtdruk hPa {{ forecast.pressure }}</div>
                    <div>Wind m/s {{ forecast.speed }}</div>
                    <div><a href="#!" class="btn-flat" :disabled="loading" @click="getLocation"><i class="material-icons left">sync</i>Locatie</a></div>
                </div>
            </div>

            <div class="weather_days">
                <div class="item" :class="{ active: active_forecast === index }" v-for="(weather, index) in weather_forecast" @click="updateForecast(index)">
                    <div class="weather_day">{{ formatDay(weather.dt) }}</div>
                    <img :src="getIcon(weather.weather[0].icon)" :alt="weather.weather[0].description">
                    <div class="temps">
                        <span class="temp_min" v-html="formatCelsius(weather.temp.min)"></span>
                        <span class="temp_max" v-html="formatCelsius(weather.temp.max)"></span>
                    </div>
                </div>
            </div>

            <div class="progress" v-show="loading">
                <div class="indeterminate"></div>
            </div>

            <a class="waves-effect waves-light btn" v-show="! latitude" @click="getLocation"><i class="material-icons right">location_on</i>Get location</a>
        </div>
    </div>
</template>

<script>
    import {ENDPOINTS} from "../config/api";
    import moment from 'moment';

    export default {
        data() {
            return {
                loading: false,
                timeFormat: "dddd HH:mm",
                dayFormat: "dd",
                latitude: null,
                longitude: null,
                weather_forecast: [],
                weather_location: { name: ""},
                active_forecast: 0,
                location_options: {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            }
        },

        computed: {
            forecast() {
                if (this.weather_forecast[this.active_forecast] !== undefined) {
                    return this.weather_forecast[this.active_forecast];
                }

                return null;
            }
        },

        created() {
            this.setLocationToLocalStorage();

            if (this.latitude !== null && this.longitude !== null) {
                this.loadWeather();
            }
        },

        methods: {
            getLocation() {
                this.loading = true;

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(this.processLocation, this.errorLocation, this.location_options);
                } else {
                    this.loading = false;
                    M.toast({ html: "Error: geolocation is not supported by this browser.", classes: "red" });
                }
            },

            processLocation(position) {
                localStorage.setItem('latitude', position.coords.latitude);
                localStorage.setItem('longitude', position.coords.longitude);
                this.setLocationToLocalStorage();

                this.loading = false;
                M.toast({ html: "Locatie succesvol opgehaald", classes: "green" });

                this.loadWeather();
            },

            setLocationToLocalStorage() {
                this.longitude = localStorage.getItem('longitude');
                this.latitude = localStorage.getItem('latitude');
            },

            errorLocation(error) {
                this.loading = false;
                M.toast({ html: "Error: " + error.code + ", " + error.message, classes: "red" });
            },

            formatTime(time) {
                return moment.unix(time).format(this.timeFormat);
            },

            formatDay(time) {
                return moment.unix(time).format(this.dayFormat);
            },

            formatCelsius(temp) {
                return Math.round(temp) + "&deg;";
            },

            loadWeather() {
                let options = {
                    baseURL: 'https://api.openweathermap.org',
                    params: {
                        lat: this.latitude,
                        lon: this.longitude,
                        cnt: 5,
                        lang: 'nl',
                        appid: '4307cdc9e2e0db4b488ea511971fb51e',
                        units: 'metric',
                    }
                };

                this.$http_external.get('/data/2.5/forecast/daily', options)
                    .then(response => {
                        this.weather_forecast = response.data.list;
                        this.weather_location = response.data.city;
                    })
                    .catch(error => console.log(error));
            },

            updateForecast(index) {
                this.active_forecast = index;
            },

            getIcon(code) {
                let name = this.getIconName(code);
                return '/static/weather_icons/' + name + '.png';
            },

            getIconName(code) {
                switch (code) {
                    case "01d":
                        return "clear-day";
                    case "02d":
                        return "mostly-cloudy";
                    case "03d":
                        return "cloudy-weather";
                    case "04d":
                        return "cloudy-weather";
                    case "09d":
                        return "rainy-weather";
                    case "10d":
                        return "rainy-day";
                    case "11d":
                        return "thunder-weather";
                    case "13d":
                        return "snow-weather";
                    case "50d":
                        return "haze-weather";
                    default:
                        return "unknown"
                }
            }
        }
    }
</script>
