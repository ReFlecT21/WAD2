import { useState } from "react"
import { fetcher } from "../Fetcher"

export async function pageDataGetter(type, setter){
  // mealType = "breakfast", "lunch, main course"
  
      
  fetcher(
    "/foodAPI/search/?",
    {
    type:type
    },
    setter
  )
  //   .then(res => setData(res))
  // return data

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