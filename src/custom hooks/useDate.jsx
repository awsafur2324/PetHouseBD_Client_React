const useDate = () => {
  // Get current date and time components
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); // Adding leading zero if necessary
  var day = ("0" + currentDate.getDate()).slice(-2); // Adding leading zero if necessary
  var hours = ("0" + currentDate.getHours()).slice(-2); // Adding leading zero if necessary
  var minutes = ("0" + currentDate.getMinutes()).slice(-2); // Adding leading zero if necessary
  var seconds = ("0" + currentDate.getSeconds()).slice(-2); // Adding leading zero if necessary

  // Construct the date and time string in the desired format
  var formattedDateTime =
    day +
    "," +
    month +
    "," +
    year +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return formattedDateTime;
};

export default useDate;
