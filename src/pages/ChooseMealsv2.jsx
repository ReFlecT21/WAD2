import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


import { Container, Row, Button} from "react-bootstrap";
import { NavBar } from "../components";
import StepProgressBar from "../components/StepProgressBar";
import { pageDataGetter } from "../components/pageDataGetter";


import { RecipeOverlay } from "../atoms/recipeOverlay";
import { useAtom } from "jotai";
import { CreateMealPlanContentFinalise, CreateMealPlanContentv2 } from "../components/CreateMealPlanContentv2";




export default function ChooseMealsV2() {
    const [overlayData, setOverlayData] = useAtom(RecipeOverlay);

    const [activePage, setActivePage] = useState(1);

    const [breakfastSelected, setBreakfastSelected] = useState([]);
    const [lunchSelected, setLunchSelected] = useState([]);
    const [dinnerSelected, setDinnerSelected] = useState([]);

    console.log(breakfastSelected, lunchSelected, dinnerSelected);
 


    // ------------------------ api data on mount
    const [response, setResponse] = useState(null);
    const [apiData, setApiData] = useState({
            1: {
                hasFetched: false,
                data: null,
            },
            2: {
                hasFetched: false,
                data: null,
            },
            3: {
                hasFetched: false,
                data: null,
            },
        });
    const paramList = {
        1:[["breakfast, morning meal, brunch"], localStorage.getItem("calories")*0.3 , "Breakfast", setBreakfastSelected, breakfastSelected],
        2:[["lunch, side dish, main course, main dish"], localStorage.getItem("calories")*0.4, "Lunch", setLunchSelected, lunchSelected],
        3:[["dinner, main course"], localStorage.getItem("calories")*0.3 , "Dinner", setDinnerSelected, dinnerSelected]
    }

    console.log(localStorage.getItem("calories"));

    if (!localStorage.getItem("calories")) {
        console.log("calories does not exist");
    }

    useEffect(() => {
        for (const data in apiData) {
          if (!apiData[data].hasFetched) {
            // console.log(paramList[data][0], paramList[data][1])
            pageDataGetter(
              paramList[data][0],
              paramList[data][1],
              (response) => {
                setApiData((prevApiData) => ({
                  ...prevApiData,
                  [data]: {
                    hasFetched: true,
                    data: response,
                  },
                }));
              }
            );
          }
        }
    }, [apiData]);
    console.log(apiData);
    // ------------------------ api data on mount  



    return (
        <>
            <NavBar />
            {overlayData}
            <Container>
                <Row>
                <StepProgressBar
                    page={activePage}
                    onPageNumberClick={setActivePage}
                />
                </Row>
                <Row>
                    {/* <h1>Choose Meals v2</h1> */}
                    {activePage <4 ? (<CreateMealPlanContentv2 
                        pageNum={activePage} 
                        mealType={paramList[activePage][2]}
                        setActivePage={setActivePage}
                        recipes={apiData[activePage].data}
                        selected={paramList[activePage][4]}
                        selectedSetter={paramList[activePage][3]}
                    />)
                    :  (<CreateMealPlanContentFinalise 
                            info={{
                                "Breakfast": {data: breakfastSelected, setter: setBreakfastSelected},
                                "Lunch": {data: lunchSelected, setter: setLunchSelected},
                                "Dinner": {data: dinnerSelected, setter: setDinnerSelected},
                            }}
                            // breakfastSelected={breakfastSelected}
                            // lunchSelected={lunchSelected}
                            // dinnerSelected={dinnerSelected}
                            // breakfastSelectedSetter={setBreakfastSelected}
                            // lunchSelectedSetter={setLunchSelected}
                            // dinnerSelectedSetter={setDinnerSelected}
                    />)
                    }
                </Row>

            </Container>
        </>
    )
}








