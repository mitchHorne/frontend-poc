import moment from "moment";

function getDisplayDateAndExpiredStatus(expiry) {
  const oneMonthAgo = moment().subtract(1, "months");
  const expiryDate = moment(expiry);

  const expired = expiryDate.isBefore(oneMonthAgo);
  const displayDate = moment(expiryDate).format("DD/MM/YYYY");

  return { displayDate, expired };
}

export { getDisplayDateAndExpiredStatus };
