# 🛡️ Secure Student Portal

A modern, full-stack web application demonstrating a **Two-Level Encryption Architecture**. This project ensures sensitive student data is secured both in transit (Level 1) and at rest in the database (Level 2), wrapped in an elegant, lightning-fast UI.

---

## 💻 Tech Stack

### Frontend (`/frontend`)
* **Framework:** React 18 + Vite (TypeScript)
* **Styling:** Tailwind CSS
* **Icons:** Lucide React
* **HTTP Client:** Axios
* **Cryptography:** CryptoJS (AES-256)

### Backend (`/server`)
* **Runtime:** Node.js + Express (TypeScript)
* **Database:** MongoDB (via Mongoose)
* **Test DB:** MongoDB Memory Server
* **Cryptography:** Native Node.js `crypto` module
* **Security:** JSON Web Tokens (JWT), CORS

---

## 🔐 How Encryption is Implemented

This application utilizes a strict **Dual-Layer Encryption** model to protect sensitive data (like passwords).

1. **Level 1 Encryption (Client-Side / In-Transit Security):**
   * When a user registers or logs in, the React frontend intercepts the plain-text password.
   * Using `crypto-js`, it encrypts the password with a static **Frontend Secret Key** (AES-256) before the payload ever leaves the browser.
   * The network only sees the encrypted cipher, protecting against man-in-the-middle attacks even if SSL/TLS is compromised.

2. **Level 2 Encryption (Server-Side / At-Rest Security):**
   * The Node.js backend receives the Level-1 encrypted payload.
   * Before saving to MongoDB, the backend applies a second layer of encryption using Node's native `crypto` module and a highly secure **Backend Secret Key**.
   * The database stores a double-encrypted string. 

3. **The Authentication Flow:**
   * During login, the backend looks up the user by their plain-text email.
   * It pulls the double-encrypted password from the DB and decrypts it once (removing Level 2).
   * It then compares this resulting Level 1 string with the incoming Level 1 string from the frontend. If they match, a JWT is issued and access is granted.

---

## 🚀 Setup Instructions

Follow these steps to get the project running on your local machine.

### Prerequisites
* [Node.js](https://nodejs.org/) (v18+ recommended)
* Git

### 1. Backend Setup

Open a terminal and navigate to the `server` directory:

Code output

```bash
cd server
npm install
Create a .env file in the root of the server folder and add your configuration:

Code snippet
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_here
L2_SECRET_KEY=12345678901234567890123456789012  # Must be exactly 32 characters
Start the backend development server:

Bash
npm run dev
(The backend will automatically spin up an in-memory MongoDB instance for testing).

2. Frontend Setup
Open a second terminal window and navigate to the frontend directory:

Bash
cd frontend
npm install
Start the Vite development server:

Bash
npm run dev
Click the http://localhost:5173 link provided in your terminal to open the application in your browser.
"""

📝 Testing Note
Because this project utilizes mongodb-memory-server for frictionless testing, the database exists entirely in your computer's RAM. Every time the backend server restarts, the database is wiped clean. You will need to register a new user to test the dashboard after a restart.

