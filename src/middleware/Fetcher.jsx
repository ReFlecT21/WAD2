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
  }, []);

  // return data
}

export async function fetcherPOST(endpoint, body) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetcherGET(endpoint, params, setter) {
  fetch(endpoint + new URLSearchParams(params).toString())
    .then((res) => res.json())
    .then((data) => {
      if (endpoint === "/foodAPI/search/?") {
        setter(data["results"]);
      } else {
        // console.log(data)
        setter(data);
      }
    })
    .catch((error) => console.log(error));
}
