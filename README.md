# MyWallet (Api)
_MyWallet is a robust web application built to streamline your personal finance management. With a secure and user-friendly interface, it empowers users to take control of their financial habits and track income and expenses effortlessly._. 

Try it out now in back-end at https://mywallet-api-zi0v.onrender.com

## About this Project
MyWallet is a powerful REST API designed to serve as your comprehensive financial management solution, built on the Node.js framework. With MyWallet, you have the capability to securely create, track, and manage all your financial transactions effortlessly.

This versatile tool allows you to manage your income, expenses, and financial goals, providing valuable insights into your financial health. The standout feature? Your financial data is safeguarded through robust encryption, ensuring maximum security and user-centric accessibility.

- **Users** 
- (`/cadastro`) 
  - Account Creation:
    - Users can create accounts by providing a name, valid email, a secure password and confirming password correctly.

- (`/`)
  - Account Access:
    - Users can log in using their email and password.
    - After successful login, they receive a token for authentication in all future requests.
    
- **Transactions** 
- (`/home`) 🔒
  - Transaction Retrieval:
    - Users can list all their transactions.

- **(`/nova-transacao/:tipo`)**
  - (`/nova-transacao/:entrada`)
    - Users can create a new transaction.
    - A incoming transaction.

  - (`/nova-transacao/:saida`)
    - Users can create a new transaction.
    - A outgoing transaction.

- (`/home/:id`) 🔒
  - Transaction Deletion:
    - Users can delete a transaction by ID.

- **Update Transactions** (`/editar-registro/:tipo/:id`) 🔒
  - Users can update a transaction by ID.
  - The parameter (`:tipo`) must be `entrada` ou `saida`.

## Why
This project has been an incredible source of inspiration for me, driven by its comprehensive scope and innovative features. It incorporates a robust API structure built using the Node.js framework, a highly relevant and powerful technology in today's development landscape.

This endeavor has provided me with a profound understanding of Node.js, allowing me to harness its capabilities to create a resilient and efficient REST API.

What sets this project apart is its meticulous attention to detail in designing secure routes and implementing complex user registration processes. It goes beyond the fundamentals, offering a wide array of endpoints and sophisticated business rules that add depth and sophistication to the application.

In essence, this project has served as an invaluable learning experience, enabling me to delve deeply into Node.js, master the intricacies of route security, and navigate the intricacies of user registration and business logic within the context of an API. MyWallet stands as a testament to this expertise, providing users with a powerful and secure financial management solution.

## Technologies
The following badges are the tools and technologies used in the construction of the project: 

- [![Node.js](https://img.shields.io/badge/Node.js-Latest%20Version-brightgreen)](https://nodejs.org/)

- [![bcrypt](https://img.shields.io/badge/bcrypt-Password%20Hashing-pink)](https://www.npmjs.com/package/bcrypt)

- [![mongodb](https://img.shields.io/badge/mongodb-NoSQL%20Database-green)](https://www.mongodb.com/)

- [![cors](https://img.shields.io/badge/cors-CORS%20Middleware-brightgreen)](https://www.npmjs.com/package/cors)

- [![dayjs](https://img.shields.io/badge/dayjs-Date%20and%20Time%20Library-brightgreen)](https://day.js.org/)

- [![dotenv](https://img.shields.io/badge/dotenv-Environment%20Variables-yellow)](https://www.npmjs.com/package/dotenv)

- [![express](https://img.shields.io/badge/express-Web%20Framework-red)](https://expressjs.com/)

- [![joi](https://img.shields.io/badge/joi-Data%20Validation-lightblue)](https://github.com/sideway/joi)

- [![uuid](https://img.shields.io/badge/uuid-UUID%20Generation-blue)](https://www.npmjs.com/package/uuid)


## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
$ npm i
```

3. Connect to the MongoDb client following the next steps
4. Configure the `.env` file using the `.env.example` file (see "Running application locally or inside docker section" for details)

5. Run the back-end in a development environment:

```bash
$ npm run start

$ npm run dev
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
