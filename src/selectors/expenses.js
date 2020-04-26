import moment from 'moment';

export const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter((expense) => {
    const momentCreatedAt = moment(expense.createdAt);
    const startDateMatched = startDate ?  startDate.isSameOrBefore(momentCreatedAt) : true;
    const endDateMatched = endDate ? endDate.isSameOrAfter(momentCreatedAt) : true;
    const textMatched = expense.description.toLowerCase().includes(text.toLowerCase())

    console.log(startDateMatched, endDateMatched, textMatched)
    return startDateMatched && endDateMatched && textMatched;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt ? 1 : -1;
    } else if (sortBy === 'amount') {
      return a.amount < b.amount ? -1 : 1;
    }
  })
}