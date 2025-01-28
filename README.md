# BID_SYSTEM_APPLICATION

## Project Overview
BID_SYSTEM_APPLICATION is a web application that allows users to create and manage bids. It includes user authentication, bid management, and PDF generation functionalities.

## Folder Structure
```
BID_SYSTEM_APPLICATION/
├── .env
├── package-lock.json
├── package.json
├── Config/
│   └── connection.js
├── Controller/
│   ├── bidController.js
│   ├── loginController.js
│   ├── pdfController.js
│   └── userController.js
├── JWT/
│   ├── generateToken.js
│   └── verfiyToken.js
├── logs/
│   └── application.log
├── Middleware/
│   ├── Logger/
│   │   └── Log.js
│   └── Validation/
│       ├── Schema.js
│       └── Validate.js
├── Model/
│   ├── Bid.js
│   ├── Login.js
│   └── User.js
├── Public/
│   ├── index.html
│   ├── CSS/
│   │   └── style.css
│   └── JS/
│       └── script.js
├── Routes/
│   ├── bidRouter.js
│   ├── loginRoute.js
│   ├── pdfRouter.js
│   ├── Router.js
│   └── userRouter.js
├── Service/
│   ├── bidService.js
│   ├── loginService.js
│   ├── pdfService.js
│   └── userService.js
└── src/
    ├── app.js
    └── BidReport.pdf
```

## API Endpoints

### User API Endpoints:
1. **POST /user/CreateUser**
   - Creates a new user.
   - Validation: Validates the user data.

2. **GET /user/getAllUser**
   - Fetches all users.
   - Authorization: Requires a valid token.

3. **DELETE /user/deleteUser**
   - Deletes a user by ID.
   - Authorization: Requires a valid token and the role of 'Owner'.
   - Validation: Validates the user ID.

4. **PUT /user/updateUser**
   - Updates a user's information.
   - Validation: Validates the update user data.

### Bid API Endpoints:
1. **POST /bid/CreateBid**
   - Creates a new bid.
   - Authorization: Requires a valid token and the role of 'Owner'.
   - Validation: Validates the bid data.

2. **POST /bid/placeBid**
   - Places a bid on an existing bid.
   - Authorization: Requires a valid token and the role of 'Bidder'.
   - Validation: Validates the placement bid data.

3. **GET /bid/getAllBid**
   - Fetches all bids.
   - Authorization: Requires a valid token.

4. **GET /bid/getApproveBids**
   - Fetches all approved bids.
   - Authorization: No specific authorization required.

5. **POST /bid/confirmBid**
   - Confirms a bid by ID.
   - Authorization: Requires a valid token and the role of 'Owner'.
   - Validation: Validates the confirmation bid data.

### Login API Endpoint:
1. **POST /login/**
   - Authenticates a user.
   - Validation: Validates the login data.

### PDF API Endpoint:
1. **GET /pdfGenerator/**
   - Generates and returns a PDF document.

## Used Libraries
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **dotenv**: Module to load environment variables from a `.env` file.
- **bcrypt**: Library for hashing passwords.

## Roles and Responsibilities
1. **Owner**:
   - Can create bids.
   - Can view and manage their own bids.
   - Can view bidders associated with their bids.

2. **Bidder**:
   - Can place bids on existing bids created by owners.
   - Can view their own bids and their statuses.

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and set the required environment variables.
4. Start the application using `node src/app.js`.


## Project Overview
BID_SYSTEM_APPLICATION is a web application that allows users to create and manage bids. It includes user authentication, bid management, and PDF generation functionalities.

## Folder Structure
```
BID_SYSTEM_APPLICATION/
├── .env
├── package-lock.json
├── package.json
├── Config/
│   └── connection.js
├── Controller/
│   ├── bidController.js
│   ├── loginController.js
│   ├── pdfController.js
│   └── userController.js
├── JWT/
│   ├── generateToken.js
│   └── verfiyToken.js
├── logs/
│   └── application.log
├── Middleware/
│   ├── Logger/
│   │   └── Log.js
│   └── Validation/
│       ├── Schema.js
│       └── Validate.js
├── Model/
│   ├── Bid.js
│   ├── Login.js
│   └── User.js
├── Public/
│   ├── index.html
│   ├── CSS/
│   │   └── style.css
│   └── JS/
│       └── script.js
├── Routes/
│   ├── bidRouter.js
│   ├── loginRoute.js
│   ├── pdfRouter.js
│   ├── Router.js
│   └── userRouter.js
├── Service/
│   ├── bidService.js
│   ├── loginService.js
│   ├── pdfService.js
│   └── userService.js
└── src/
    ├── app.js
    └── BidReport.pdf
```

## API Endpoints

### User API Endpoints:
1. **POST /user/CreateUser**
   - Creates a new user.
   - Validation: Validates the user data.

2. **GET /user/getAllUser**
   - Fetches all users.
   - Authorization: Requires a valid token.

3. **DELETE /user/deleteUser**
   - Deletes a user by ID.
   - Authorization: Requires a valid token and the role of 'Owner'.
   - Validation: Validates the user ID.

4. **PUT /user/updateUser**
   - Updates a user's information.
   - Validation: Validates the update user data.

### Bid API Endpoints:
1. **POST /bid/CreateBid**
   - Creates a new bid.
   - Authorization: Requires a valid token and the role of 'Owner'.
   - Validation: Validates the bid data.

2. **POST /bid/placeBid**
   - Places a bid on an existing bid.
   - Authorization: Requires a valid token and the role of 'Bidder'.
   - Validation: Validates the placement bid data.

3. **GET /bid/getAllBid**
   - Fetches all bids.
   - Authorization: Requires a valid token.

4. **GET /bid/getApproveBids**
   - Fetches all approved bids.
   - Authorization: No specific authorization required.

5. **POST /bid/confirmBid**
   - Confirms a bid by ID.
   - Authorization: Requires a valid token and the role of 'Owner'.
   - Validation: Validates the confirmation bid data.

### Login API Endpoint:
1. **POST /login/**
   - Authenticates a user.
   - Validation: Validates the login data.

### PDF API Endpoint:
1. **GET /pdfGenerator/**
   - Generates and returns a PDF document.

## Used Libraries
- **Express**: Web framework for Node.js.
- **Mongoose**: MongoDB object modeling tool.
- **jsonwebtoken**: Library for generating and verifying JWT tokens.
- **dotenv**: Module to load environment variables from a `.env` file.
- **bcrypt**: Library for hashing passwords.

## Roles and Responsibilities
1. **Owner**:
   - Can create bids.
   - Can view and manage their own bids.
   - Can view bidders associated with their bids.

2. **Bidder**:
   - Can place bids on existing bids created by owners.
   - Can view their own bids and their statuses.

## Setup Instructions
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create a `.env` file in the root directory and set the required environment variables.
4. Start the application using `node src/app.js`.
