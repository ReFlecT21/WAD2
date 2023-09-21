import { useState, useEffect } from "react";

export async function fetcher(endpoint, params, setter){
  // const [data, setData] = useState(null);

  // // fetch(endpoint + new URLSearchParams(params).toString())
  // // .then(res => res.json())
  // // .then(data => console.log(data))
  // // .catch(error => console.log(error));

  useEffect(() => {
    fetch(endpoint + new URLSearchParams(params).toString())
      .then(res => res.json())
      .then(data => {
        if(endpoint==="/foodAPI/search/?"){
          setter(data["results"])
        } else {
          // console.log(data)
          setter(data)
        }
      })
      .catch(error => console.log(error));
  }, []);

  // return data
}

export async function fetcherPOST(endpoint, body, setter){

  // try {
  //   const response = await fetch(endpoint, {
  //     method:"POST",
  //     body: JSON.stringify(body)
  //   });
  //   const data = await response.json();
  //   setter(data);
  // } catch (error) {
  //   console.error(error);
  // }


  // useEffect(()=>{
    fetch(endpoint, {
      method:"POST",
      body: JSON.stringify(body)
    })
    .then(res => res.json())
    .then(data => setter(data))
    .catch(error => console.log(error))
  // }, [])

}