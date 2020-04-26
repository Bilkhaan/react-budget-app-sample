import moment from 'moment';

export default [
  {
    id: '1',
    description: 'Rent bill',
    note: 'Last month rent',
    amount: 2300,
    createdAt: 0
  },
  {
    id: '2',
    description: 'Coffee bill',
    note: 'Last month rent',
    amount: 220,
    createdAt: 10333234
  },
  {
    id: '3',
    description: 'Cable bill',
    note: 'Last month rent',
    amount: 1200,
    createdAt: moment(0).subtract(4, 'days').valueOf()
  },
  {
    id: '4',
    description: ' Car bill',
    note: 'Last month rent',
    amount: 3200,
    createdAt: moment(0).add(4, 'days').valueOf()
  }
];