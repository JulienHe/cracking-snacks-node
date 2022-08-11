function getToday() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

function isToday(dateOne, dateTwo) {
  const dateOneString = new Date(dateOne.replace(/-/g, "/")).toDateString();
  const dateTwoString = new Date(dateTwo).toDateString();
  return dateOneString === dateTwoString;
}

module.exports = { getToday, isToday };
