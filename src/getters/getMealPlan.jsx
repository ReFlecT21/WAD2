const getMealPlan = (userId) => {
  fetch(
    `http://127.0.0.1:5001/wad2-395904/us-central1/app/getMealPlan/${userId}`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};

export default getMealPlan;
