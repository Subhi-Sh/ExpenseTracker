const months = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

// sorting the object of months.
const sortedMonths = Object.entries(months)
  .map(([name, number]) => ({ name, number }))
  .sort((a, b) => a.number - b.number);

export default sortedMonths;
