import { useState } from "react";

export var fetcher = async (endpoint) => {
    const [data, setData] = useState(null)

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json()
      setData(result)
      console.log(JSON.stringify(result, null, 4));

    } catch (err) {
      console.log(err.message);
    };

    return data
  };