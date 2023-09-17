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
    addRecipeNutrition=true&number=3&sort=random`;
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
    const url = `${this.APIRoot}recipes/informationBulk`;
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
