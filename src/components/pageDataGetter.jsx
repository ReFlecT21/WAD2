import { useState } from "react"
import { fetcher } from "../Fetcher"

export async function pageDataGetter(type){
  // mealType = "breakfast", "lunch, main course"
  
  const [data, setData] = useState(null)
      
  fetcher("/foodAPI/search/?",{
    type:type
  })
    .then(res => setData(res))
  return data

  // const [data, setData] = useState(null)

  // useEffect(() => {
  //   fetcher("/foodAPI/search/?",{
  //     type: "breakfast",
  //   })
  //     .then(res => setData(res))
  // }, []);

  // console.log(data)
  // return data

}