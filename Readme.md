# Business Idea Generator Backend

## Overview

The Business Idea Generator Backend is a Node.js application designed to support a business idea generation platform. It provides APIs for user authentication, idea generation using OpenAI's GPT-3.5-turbo model, and subscription management with Razorpay integration.

**_Not Properly Tested._ Test Before Deployment.**

## Features

- **User Authentication**
  - **Registration**: Users can register with their email, password, and name.
  - **Login**: Registered users can log in to receive a JWT token for authenticated requests.
- **Idea Generation**
  - **Generate Business Ideas**: Users can generate business ideas based on their input or receive random tech business ideas.
  - **Idea History**: Users can view their previously generated ideas.
- **Subscription Management**
  - **Create Subscription Order**: Users can create a subscription order to upgrade to a premium plan.
  - **Verify Payment**: The backend verifies Razorpay payment signatures to confirm successful payments.
  - **Premium Features**: Premium users have access to enhanced features and higher rate limits.
- **Rate Limiting**
  - **Free Users**: Limited to 1 requests per 15 minutes.
  - **Premium Users**: Limited to 50 requests per 15 minutes.

## Use Case

This backend application is ideal for platforms that aim to provide users with innovative business ideas. It leverages AI to generate ideas and offers a subscription model to monetize premium features.

## Cloning the Repository

To clone the repository and set up the backend application, follow these steps:

1. **Clone the Repository**

```sh
 git clone https://github.com/sadhusoumik/business-idea-generator-backend.git
   cd business-idea-generator-backend
```
## Install Dependencies

```sh
npm install
```

**Set up Environment Variables Create a .env file in the root directory and add the following environment variables:**

```
PORT=5000
NODE_ENV=development
DB_USER=your_db_user
DB_HOST=localhost
DB_NAME=business_ideas_db
DB_PASSWORD=your_db_password
DB_PORT=5432
OPENAI_API_KEY=your_openai_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h
RATE_LIMIT_WINDOW=900000 # 15 minutes in milliseconds
RATE_LIMIT_MAX=100 # Maximum requests per window
```

## Run the Application

```sh
npm start
```

The server should now be running on http://localhost:5000.

## API Endpoints

**Authentication ->**

**POST /api/auth/register:** Register a new user.

**POST /api/auth/login:** Log in an existing user.


**Ideas ->**

**POST /api/ideas/generate:** Generate a new business idea.

**GET /api/ideas/history:** Get the user's idea history.


**Subscription ->**

**POST /api/subscription/create-order:** Create a new subscription order.

**POST /api/subscription/verify-payment:** Verify a payment
