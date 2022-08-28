import { sortString, sortDate } from './utils'

export const INCLUDED_DATA = 'login,name,email,gender,registered'
// export const SEED_NAME = 'app'
export const RESULTS_COUNT = 20

export const columns = [
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => sortString(a.name, b.name),
  },
  {
    title: "Email",
    dataIndex: "email",
    sorter: (a, b) => sortString(a.email, b.email),
  },
  {
    title: "Gender",
    dataIndex: "gender",
    sorter: (a, b) => sortString(a.gender, b.gender),
  },
  {
    title: "Registered Date",
    dataIndex: "registered_date",
    sorter: (a, b) => sortDate(a.unformat_registered_date, b.unformat_registered_date),
  },
];

