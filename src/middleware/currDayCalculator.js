export default function currDayCalculator(createdAt) {
    var createdDate = new Date(createdAt).setHours(0, 0, 0, 0);
    var today = new Date(Date.now()).setHours(0, 0, 0, 0)
    const timeDifference = today - createdDate;

    var currDay = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    return currDay;
}