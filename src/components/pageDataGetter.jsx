import { useState } from "react"
import { fetcher } from "../Fetcher"

export async function pageDataGetter(mealType){
    // mealType = "breakfast", "lunch, main course"
    
    const [data, setData] = useState(null)

    fetcher("/foodAPI/search/?",{
      type: "breakfast",
    //   type: mealType
    })
      .then(res => setData(res))
    //   .then(res => console.log(res))


    console.log(data)
    return data

  }