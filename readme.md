This is a backend app for expense tracker. This uses express.js for http server. This app has many api written in it. The api format are mentioned below:

S.No.| url | method_type| body-data

1 | /api/auth/sign-up | post | {email, name, password,}

---

2 | /api/auth/sign-in | post | {email, name, password,}

---

| S.No. | url                      | method_type | body-data                                              |
| ----- | ------------------------ | ----------- | ------------------------------------------------------ |
| 1     | /api/auth/sign-up        | post        | {email, name, password,}                               |
| 2     | /api/auth/sign-in        | post        | {userId, password,}                                    |
| 3     | /api/expense/add-expense | post        | {amount, category, description, expenseDate(optional)} |
| 4     | /api/expense/get-expense | get         |                                                        |
