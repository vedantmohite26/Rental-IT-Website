# RentIT

RentIT is a rental marketplace web application that allows users to browse, search, and rent products while enabling owners to register, manage listings, and receive bookings/orders.

The project is split into two main parts:

- `RentIT_Backend`: Node.js + Express REST API with SQLite database and file uploads
- `RentIT_Frontend`: Static HTML, CSS, and JavaScript pages for the user and owner interface

## Overview

This application supports:

- User sign-up and login
- Owner sign-up and login
- Product listing with images and invoices
- Product search and category browsing
- Multi-product cart rental requests with per-item dates and stock validation
- Supplier approval, stock reservation, and simulated payment completion
- Owner dashboard for managing inventory and product information

## Tech Stack

### Backend
- Node.js
- Express.js
- SQLite3
- Multer for file uploads
- bcrypt for password hashing
- CORS and Express Session
- dotenv for environment configuration

### Frontend
- HTML
- CSS
- JavaScript
- Static pages served locally in the browser

## Project Structure

```text
RentIT/
├── .gitignore
├── README.md
├── RentIT_Backend/
│   ├── database/
│   ├── uploads/
│   ├── .env.example (if added manually)
│   ├── package.json
│   ├── server.js
│   └── node_modules/ (after npm install)
└── RentIT_Frontend/
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── owner_login.html
    ├── owner_reg.html
    ├── product_details.html
    ├── search_results.html
    ├── cart.html
    ├── payment.html
    ├── orders.html
    ├── admin_dash.html
    ├── owner_dash.html
    ├── manage_prod.html
    ├── list_product.html
    ├── addresses.html
    ├── youraccount.html
    ├── thankyou.html
    ├── contact.html
    ├── cameras.html
    ├── electro.html
    ├── access.html
    ├── forgot.html
    ├── login-security.html
    └── image/
```

## Prerequisites

Before running the project, make sure you have:

- Node.js v18 or later
- npm
- A modern browser such as Chrome or Edge
- Optional: VS Code with the Live Server extension for serving front-end pages

## Backend Setup

1. Open a terminal and navigate to the backend folder:

```bash
cd RentIT/RentIT_Backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the backend server:

```bash
node server.js
```

The API will run on:

```text
http://localhost:3000
```

## Frontend Setup

The frontend is a collection of static HTML files. You can open them directly in a browser or serve them through a local web server.

For a simple setup with VS Code, use Live Server on the `RentIT_Frontend` folder.

## Main API Endpoints

The backend exposes routes for authentication, product management, and orders.

### User routes
- `POST /signup`
- `POST /login`
- `POST /rental-requests` (submits all cart items together)

### Owner routes
- `POST /owner-signup`
- `POST /owner-login`

### Product routes
- `POST /add-product`
- `GET /products/search`
- `GET /products`
- `GET /products/:id`

### Other features
- Image upload handling via `uploads/`
- Payment is marked completed when a supplier approves a rental request; no gateway is used
- Session management for app state

## Database

The project uses SQLite, with the database file created in:

```text
RentIT_Backend/database/rentit.db
```

The backend automatically creates tables such as:

- `users`
- `owners`
- `products`

## Features in Detail

### For Users
- Create a personal account
- Sign in securely
- Search products by name, category, or description
- Add multiple products to the cart, choose each item's rental dates, and submit one grouped request
- Track supplier approval, payment status, and rental status for each product
- View order-related pages and account details

### For Owners
- Register as a business or property owner
- Upload profile information and product images
- Add rental products with price, category, and description
- Manage products through owner dashboard pages

## Notes

- The frontend is static and depends on API requests to the backend server.
- Owner login and dashboard API calls use the `rentit.sid` session cookie. Serve the frontend through Live Server on `localhost:5500` or `localhost:5501` (do not open the HTML file directly), and use `localhost` consistently for both frontend and backend.
- Additional frontend origins can be allowed by setting `FRONTEND_ORIGINS` to a comma-separated list of exact origins, for example `https://rentit.example.com`. Credentialed CORS requests require an explicit allowed origin.
- In production, set a strong `SESSION_SECRET` and use HTTPS so the session cookie can be sent securely.
- Uploaded images and invoices are stored in `RentIT_Backend/uploads/`.

Cart items are submitted together as separate product orders sharing a cart-request ID. Each supplier approves or rejects their product separately. Approval rechecks overlapping accepted rentals, reserves stock for the date range, and marks payment completed; pending requests do not reserve inventory.

## Running the Project

To run the app locally:

1. Start the backend:

```bash
cd RentIT/RentIT_Backend
node server.js
```

2. Open the frontend in your browser or serve the `RentIT_Frontend` folder with Live Server.

3. Navigate to the app pages such as:

- `login.html`
- `signup.html`
- `owner_login.html`
- `owner_reg.html`
- `index.html`

## Future Improvements

Potential improvements for the project include:

- Adding a proper package script for `npm start`
- Adding environment validation and better error handling
- Creating a dedicated admin dashboard backend
- Improving product management and order tracking
- Adding deployment configuration for production hosting

## License

This project does not currently include a formal license file. If needed, add a license before publishing or distributing the code commercially.

## Contributing

Contributions are welcome. If you want to improve the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request
