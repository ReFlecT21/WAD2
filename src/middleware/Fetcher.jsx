import axios from "axios";
import { useState, useEffect } from "react";

export async function fetcher(endpoint, params, setter) {


  useEffect(() => {
    axios.get(endpoint + new URLSearchParams(params).toString())
      .then((res) => {
        // console.log(res.data)
        if (endpoint === "/foodAPI/search/?") {
          setter(res.data["results"]);
        } else {
          setter(res.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  // return data
}

export async function fetcherPOST(endpoint, body) {
  try {

    // const res = await axios.post(endpoint, JSON.stringify(body));
    // console.log(res); // Assuming your API response is in response.data
    // // return res.data;

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
    console.log(response);
    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error(error);
  }
}

export async function fetcherGET(endpoint, params, setter, dayIdx = null) {

  // axios.get(endpoint + new URLSearchParams(params).toString())
  //     .then((res) => {
  //       // console.log(res.data)
  //       if (endpoint === "/foodAPI/search/?") {
  //         setter(res.data["results"]);
  //       } else {
  //         setter(res.data);
  //       }
  //     })
  //     .catch((error) => console.log(error));
  fetch(endpoint + new URLSearchParams(params).toString())
    .then((res) => res.json())
    .then(async (data) => {
      if (endpoint === "/foodAPI/search/?") {
        // console.log(data["results"])
        setter(data["results"]);
      } else {
        // console.log(data)
        if (dayIdx != null) {
          setter(data, dayIdx);
        } else {
          setter(data);
        }
      }
    })
    .catch((error) => console.log(error));
}
