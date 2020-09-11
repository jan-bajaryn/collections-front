var axios = require("axios");


axios.interceptors.request.use(
    function(config) {
        let jwtToken = localStorage.getItem("authorization");
        if (jwtToken) {
            config.headers["authorization"] = "Bearer " + jwtToken;
        }
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);