# Arvyax Wellness Session Platform

This is a full-stack MERN application built for the Arvyax Full Stack Internship assignment. It's a secure, interactive platform where users can register, log in, view public wellness sessions, and create, draft, and publish their own custom sessions with an auto-save feature.

---

## 🚀 Live Demo

* **Frontend (Vercel):** [https://arvyax-wellness-platform.vercel.app/](https://arvyax-wellness-platform.vercel.app/)
* **Backend API (Render):** [https://arvyax-wellness-api.onrender.com](https://arvyax-wellness-api.onrender.com)

---

## ✨ Features Implemented

### Core Features
-   [x] **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens).
-   [x] **Password Hashing:** Passwords are never stored in plain text, thanks to `bcryptjs`.
-   [x] **Protected Routes:** Backend middleware protects sensitive routes, ensuring only authenticated users can access their own data.
-   [x] **Session Management:** Full CRUD functionality for creating, viewing, and managing wellness sessions.
-   [x] **Draft & Publish System:** Users can save sessions as drafts and publish them when ready.

### Bonus Features
-   [x] **Auto-Save:** The session editor automatically saves a draft in the background after 2 seconds of inactivity.
-   [x] **Auto-Save Feedback:** A "Saving..." and "Draft saved!" toast message provides clear feedback to the user.
-   [x] **Fully Working Logout:** Users can securely log out, clearing their session token.
-   [x] **Deployed Demo:** The frontend and backend are deployed on Vercel and Render, respectively.
-   [x] **Clean System Design:** A clear separation of concerns between the frontend and backend, with a well-organized project structure.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Vite, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (with Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcryptjs
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🏁 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v14 or later)
* npm
* Git

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/rohithrajv007/arvyax-wellness-platform/tree/main)
    cd arvyax-wellness-platform
    ```

2.  **Setup the Backend:**
    ```sh
    # Navigate to the backend folder
    cd backend

    # Install NPM packages
    npm install

    # Create a .env file in the /backend root and add the following variables
    # (see .env.example)
    ```
    **`.env` file for backend:**
    ```env
    NODE_ENV=development
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    JWT_EXPIRES_IN=30d
    ```sh
    # Run the server
    npm run dev
    ```

3.  **Setup the Frontend:**
    ```sh
    # Navigate to the frontend folder from the root directory
    cd my-frontend

    # Install NPM packages
    npm install

    # Create a .env.local file in the /my-frontend root
    ```
    **`.env.local` file for frontend:**
    ```env
    VITE_API_URL=http://localhost:5000
    ```sh
    # Run the client
    npm run dev
    ```

---

##  API Documentation

### Auth Routes
Base Path: `/api/auth`

| Method | Endpoint     | Description         | Access  |
| :----- | :----------- | :------------------ | :------ |
| `POST` | `/register`  | Register a new user | Public  |
| `POST` | `/login`     | Login a user        | Public  |

### Session Routes
Base Path: `/api/sessions`

| Method | Endpoint           | Description                             | Access  |
| :----- | :----------------- | :-------------------------------------- | :------ |
| `GET`  | `/`                | Get all **published** sessions          | Public  |
| `GET`  | `/my-sessions`     | Get all sessions for the logged-in user | Private |
| `GET`  | `/my-sessions/:id` | Get a single session by its ID          | Private |
| `POST` | `/save-draft`      | Create or update a draft session        | Private |
| `POST` | `/publish`         | Publish a draft session                 | Private |

---
