# Gender Equality Incident Reporting App

A full-stack web application to report, view, and manage gender-based incidents. Built with **React**, **Node.js**, **Express**, and **MongoDB**, with simulated **MPESA payment integration** for demonstration purposes.

---

## 📝 Features

- **User Authentication**
  - Register, Login, Logout
  - Update profile and password
  - View logged-in user profile

- **Incident Reporting**
  - Report new incidents with title, description, category, and location
  - Categories: Harassment, Discrimination, Assault, Other
  - View only incidents reported by the logged-in user
  - Delete incidents (only by owner or admin)

- **Payment Mock Integration**
  - Simulated STK push payments (MPESA) for demonstration
  - Initiate, view, and confirm payments

- **Protected Routes**
  - Home page, profile, and incident management are secured
  - Unauthorized access redirects to login

- **Frontend**
  - Built with React and Vite
  - Responsive design with modern UI
  - Axios for API calls with token-based authentication

- **Backend**
  - Node.js + Express
  - MongoDB with Mongoose models
  - JWT authentication for secure APIs

---

## 🚀 Tech Stack

- **Frontend:** React, Vite, Tailwind CSS (optional)
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **Payments:** Simulated MPESA STK push
- **Deployment:** Netlify (frontend), Render (backend) or any preferred hosting

---

## 📁 Project Structure

frontend/
├─ src/
│ ├─ pages/ # Home, Login, Register, Profile, UpdateProfile
│ ├─ components/ # IncidentForm, IncidentList, Nav, ProtectedRoute
│ └─ context/ # AuthContext, LoadingContext
├─ index.html
└─ vite.config.js

backend/
├─ models/ # User.js, Incident.js
├─ routes/ # authRoutes.js, incidentRoutes.js, paymentMockRoutes.js
├─ middleware/ # authMiddleware.js
└─ server.js

.env # Environment variables (MongoDB URI, JWT secret)


---

## ⚙️ Installation

### Backend

```bash
cd backend
npm install

Create a .env file in backend with:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

Run the backend server:

npm run dev

Frontend

cd frontend
npm install

Create a .env file in frontend with:

VITE_API_BASE_URL=http://localhost:5000/api

Run the frontend development server:

npm run dev

🛠 Usage

    Register a new user.

    Login to access the Home page.

    Report new incidents using the form.

    View your incidents in the list.

    Delete your incidents or update your profile as needed.

    Use the Payment page to simulate a payment (STK push).

📦 Build for Production
Frontend (Vite)

npm run build

The production-ready folder is dist/. Deploy this folder to Netlify, Vercel, or any static hosting service.
Backend

Deploy backend to Render, Heroku, or any Node.js hosting service.
🔐 Authentication

    JWT-based authentication

    Protected routes using ProtectedRoute component

    Token stored in localStorage and sent via Axios headers

🛠 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login user
GET	/api/auth/me	Get logged-in user info
PUT	/api/auth/update-profile	Update name/email
PUT	/api/auth/update-password	Update password
DELETE	/api/auth/delete	Delete account
Incidents
Method	Endpoint	Description
POST	/api/incidents	Report a new incident
GET	/api/incidents	Get incidents of logged-in user
GET	/api/incidents/:id	Get a single incident
DELETE	/api/incidents/:id	Delete an incident (owner/admin)
Payments (Mock)
Method	Endpoint	Description
POST	/api/payment/stkpush	Initiate a payment
GET	/api/payment	Get all mock payments
PATCH	/api/payment/confirm/:id	Confirm payment
⚡ Notes

    Payment integration is simulated; no real MPESA transaction occurs.

    Ensure backend is deployed before deploying frontend so Axios requests work.

    For production deployment, update VITE_API_BASE_URL to the live backend URL.

🖇 Author

Robinhood Waweru – Full-stack developer
Email: robinhoodwaweru8@gmail.com

GitHub: Robinhood-j
📄 License

This project is licensed under the MIT License.