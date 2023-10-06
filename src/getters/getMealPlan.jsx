const getMealPlan = async (userId) => {
  try {
    const response = await fetch(
      `https://us-central1-wad2-395904.cloudfunctions.net/app/getMealPlan/${userId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default getMealPlan;
