// Source: https://stackoverflow.com/questions/6177975/how-to-validate-date-with-format-mm-dd-yyyy-in-javascript

// Validates that the input string is a valid date formatted as "mm/dd/yyyy"
const validateDate = (date) => {
  const dateParts = date.split('/');
  const day = Number(dateParts[0]);
  const month = Number(dateParts[1]);

  const validDay = day > 0 && day <= 31;
  const validMonth = month > 0 && month <= 12;

  if (validDay && validMonth) return true;
  return false;
};

const checkDateFormat = (date) => /^\d{2}\/\d{2}\/\d{4}$/.test(date);

const checkDate = (date) => validateDate(date) && checkDateFormat(date);

module.exports = checkDate;
