import { useState, useEffect } from "react";

export async function fetcher(endpoint, params){
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(endpoint + new URLSearchParams(params).toString()
    )
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.log(error));
  }, []);

  return data
}