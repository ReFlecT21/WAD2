import React, { useState } from "react";
import { fetcherPOST } from "./Fetcher";

const HomePage = () => {
  const body = {
    query:"prata",
    include_subrecipe:true,
    use_raw_foods:false,
    line_delimited:true,
    claims:true,
    taxonomy:true,
    ingredient_statement:true,
  }
  const [data, setData] = useState(null)

  fetcherPOST("/foodAPI/manualSearch", body, setData)

  console.log(data)

  return (
    <>
      <h1>Home</h1>
    </>

  );
};

export default HomePage;
