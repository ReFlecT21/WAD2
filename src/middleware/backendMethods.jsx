import React, { useEffect } from "react";
import { db, auth, functions } from "../../firebase";

import { httpsCallable } from "firebase/functions";
import axios from "axios";

export const backendMethods = {
    funcPath: "https://us-central1-wad2-395904.cloudfunctions.net/",

    fetcher: async (endpoint, params, setter) => {
        useEffect(() => {
            axios.get(backendMethods.funcPath+endpoint + new URLSearchParams(params).toString())
              .then((res) => {
                // console.log(res.data)
                if (endpoint === "search/?") {
                  setter(res.data["results"]);
                } else {
                  setter(res.data);
                }
              })
              .catch((error) => console.log(error));
          }, []);
    },

    fetcherPOST: async (endpoint, body) => {
        try {
            const response = await fetch(backendMethods.funcPath+endpoint, {
                method: "POST",
                body: JSON.stringify(body),
            });
            // console.log(response);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    fetcherGET: async (endpoint, params, setter, dayIdx = null) => {

        fetch(backendMethods.funcPath+endpoint + new URLSearchParams(params).toString())
        .then((res) => res.json())
        .then(async (data) => {
            if (endpoint === "search/?") {
                setter(data["results"]);
            } else {
                if (dayIdx != null) {
                    setter(data, dayIdx);
                } else {
                    setter(data);
                }
            }
        })
        .catch((error) => {
            console.log(error);
            window.location.reload()
        });
    },
}


// export const backendMethods = {
//     get_use: async (endpoint, queryParams, setter) => {
//         useEffect(() => {
//             const getFunction = httpsCallable(functions, endpoint);
//             getFunction(queryParams)
//             .then((result) => {
//                 // Handle the result here
//                 console.log("hitting");
//                 console.log(result.data);

//                 // if (endpoint === "/foodAPI/search/?") {
//                 //     setter(res.data["results"]);
//                 // } else {
//                 //     setter(res.data);
//                 // }

//                 // setter(result.data);
//                 // return result.data;
//             })
//             .catch((error) => {
//                 // Handle errors here
//                 console.error(error);
//             });

//         }, []);

//     },

//     get: async (endpoint, queryParams, setter, dayIdx = null) => {
//         // fetch(endpoint + new URLSearchParams(params).toString())
//         // .then((res) => res.json())
//         // .then(async (data) => {
//         // if (endpoint === "/foodAPI/search/?") {
//         //     // console.log(data["results"])
//         //     setter(data["results"]);
//         // } else {
//         //     // console.log(data)
//         //     if (dayIdx != null) {
//         //     setter(data, dayIdx);
//         //     } else {
//         //     setter(data);
//         //     }
//         // }
//         // })
//         // .catch((error) => {
//         // console.log(error);
//         // window.location.reload()
//         // });
//         const getFunction = functions.httpsCallable(endpoint);
//         getFunction(queryParams)
//         .then((result) => {
//             // Handle the result here
//             console.log(result.data);


//             // if (endpoint === "/foodAPI/search/?") {
//             //     // console.log(data["results"])
//             //     setter(data["results"]);
//             // } else {
//             //     // console.log(data)
//             //     if (dayIdx != null) {
//             //     setter(data, dayIdx);
//             //     } else {
//             //     setter(data);
//             //     }
//             // }
            
//             // setter(result.data);
//             // return result.data;
//         })
//         .catch((error) => {
//             // Handle errors here
//             console.error(error);
//         });

//     },

//     post: async (endpoint, body) => {
//         try {
//             const getFunction = functions.httpsCallable(endpoint);
//             getFunction(body)
//             .then((result) => {
//                 // Handle the result here
//                 console.log(result.data);
//                 // return result.data;
//             })
//             .catch((error) => {
//                 // Handle errors here
//                 console.error(error);
//             });
//         }
//         catch (error) {
//             console.error(error);
//         }
//     },
// }


// // export const backendMethods = {
// //     search: async (queryParams) => {
// //         const searchFunction = functions.httpsCallable("search");
// //         searchFunction(queryParams)
// //         .then((result) => {
// //             // Handle the result here
// //             console.log(result.data);
// //             // return result.data;
// //         })
// //         .catch((error) => {
// //             // Handle errors here
// //             console.error(error);
// //         });

// //     },

// //     getbulk: async (queryParams) => {
// //         const getbulkFunction = functions.httpsCallable("getbulk");
// //         getbulkFunction(queryParams)
// //         .then((result) => {
// //             // Handle the result here
// //             console.log(result.data);
// //             // return result.data;
// //         })
// //         .catch((error) => {
// //             // Handle errors here
// //             console.error(error);
// //         });

// //     }
// // }
