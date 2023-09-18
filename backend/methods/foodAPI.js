var axios = require("axios");

module.exports.foodAPI = {
    apiKey : axios.defaults.headers['x-api-key'] = '5b5bbd9be2ac4c65ae27b79d534684db',
    // apiKey : 'apiKey=5b5bbd9be2ac4c65ae27b79d534684db',
    // apiKey : '5b5bbd9be2ac4c65ae27b79d534684db',
    APIRoot: "https://api.spoonacular.com/",

    get: async function (
        id,
    ) {
        const url = `${this.APIRoot}recipes/${id}/information?includeNutrition=false`
        console.log(`API endpoint: ${url}`)

        // https://api.spoonacular.com/recipes/716429/information?includeNutrition=false
        // https://api.spoonacular.com/recipes/716429/information?apiKey=YOUR-API-KEY&includeNutrition=true
        // https://api.spoonacular.com/recipes/716429/information?apiKey=820c986d18224446a96733027154ad73&includeNutrition=true

        const API_res = await axios.get(url) 

        return API_res.data

    },

    getBulk: async function (
        id_array,
    ) {


    },


    // const fetchDetails = async () => {
    //     const resp = await fetch(
    //       `https://api.spoonacular.com/recipes/${params.id}/information?apiKey=${process.env.REACT_APP_FOOD_API_KEY}`
    //     );
    //     const data = await resp.json();
    //     return data;
    //   };
    
}

