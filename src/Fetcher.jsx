import { useState, useEffect } from "react";

export async function fetcher(endpoint, params, setter){
  // const [data, setData] = useState(null);

  // // fetch(endpoint + new URLSearchParams(params).toString())
  // // .then(res => res.json())
  // // .then(data => console.log(data))
  // // .catch(error => console.log(error));

  useEffect(() => {
    fetch(endpoint + new URLSearchParams(params).toString()
    )
      .then(res => res.json())
      .then(data => setter(data["results"]))
      .catch(error => console.log(error));
  }, []);

  // return data
}