import moment from 'moment';

const filtersDeafultState = {
  text: "",
  sortBy: "date",
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
};

export default (state = filtersDeafultState, action) => {
  switch (action.type) {
    case "UPDATE_TEXT_FILTER":
      return {
        ...state,
        text: action.text
      }
    case "SORT_BY_AMOUNT":
      return {
        ...state,
        sortBy: 'amount'
      }
    case "SORT_BY_DATE":
      return {
        ...state,
        sortBy: 'date'
      }
    case "SET_START_DATE":
      return {
        ...state,
        startDate: action.date
      }
    case "SET_END_DATE":
      return {
        ...state,
        endDate: action.date
      }
    default:
      return state;
  }
};