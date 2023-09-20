const {default: axios} = require("axios");

const foodAPI = {
  // config: {
  //   headers: {
  //     "x-api-key": "b379279f538a412dabf422f2f0b13eb7",
  //   },
  // },
  // apikey: "b379279f538a412dabf422f2f0b13eb7",
  // apikey: axios.defaults.headers["x-api-key"] =
  // "b379279f538a412dabf422f2f0b13eb7",
  nutritionix_id: axios.defaults.headers["x-app-id"] =`c77e135d`,
  nutritionix_api: axios.defaults.headers["x-app-key"] =`df9a1e155a2b2378799693c8349a11fd`,
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
    addRecipeNutrition=true&number=6&sort=random`;
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
    params=null,
  ) {
    const url = `https://www.nutritionix.com/track-api/v2/natural/nutrients`;
    try {
      const response = await axios.post(url, {
        query:"prata",
        include_subrecipe:true,
        use_raw_foods:false,
        line_delimited:true,
        claims:true,
        taxonomy:true,
        ingredient_statement:true,
      }
      );
      console.log(response.data);
      // return response.data;
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = foodAPI;

