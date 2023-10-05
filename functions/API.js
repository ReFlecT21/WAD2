const {default: axios} = require("axios");

const foodAPI = {
  // config: {
  //   headers: {
  //     "x-api-key": "b379279f538a412dabf422f2f0b13eb7",
  //   },
  // },
  // apikey: "b379279f538a412dabf422f2f0b13eb7",
  apikey: axios.defaults.headers["x-api-key"] =
  "b379279f538a412dabf422f2f0b13eb7",
  nutritionix_id: axios.defaults.headers["x-app-id"] =`02222df8`,
  nutritionix_api: axios.defaults.headers["x-app-key"] =`1446da501eb4f47527c7b14df764bd01`,
  // nutritionix_userID: axios.defaults.headers["x-remote-user-id"] = "0",
  APIRoot: "https://api.spoonacular.com/",
  getOne: async function(
    id,
    params = null,
  ) {
    console.log("starting API call");
    const url = `${this.APIRoot}recipes/${id}/information?includeNutrition=true`;
    try {
      const response = await axios.get(url, params);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  search: async function(
    params,
  ) {
    const url = `${this.APIRoot}recipes/complexSearch?addRecipeInformation=true&
    addRecipeNutrition=true&number=30&sort=random`;
    try {
      const response = await axios.get(url, params);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  random: async function(
    params,
  ) {
    const url = `${this.APIRoot}recipes/random?number=3`;
    try {
      const response = await axios.get(url, params);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  getBulk: async function(
    params,
  ) {
    const url = `${this.APIRoot}recipes/informationBulk?includeNutrition=true`;
    try {
      const response = await axios.get(url, params);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  manualSearch: async function(
    body,
  ) {
    // const url = `https://www.nutritionix.com/track-api/v2/natural/nutrients`;
    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
    try {
      const response = await axios.post(url, JSON.parse(body));
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  instantSearch: async function(
    params,
  ) {
    const url = `https://trackapi.nutritionix.com/v2/search/instant/?branded=false&common=true`;
    try {
      const response = await axios.get(url, params);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
  instantItem: async function(
    params,
  ) {
    const url = `https://trackapi.nutritionix.com/v2/search/item/`;
    try {
      const response = await axios.get(url, params);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = foodAPI;
