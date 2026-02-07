# To-Do Application – Frontend

## Tech Stack Used

- React (Vite)
- Tailwind CSS
- Axios
- React Router

## Setup Instructions (Local Run)

1. Clone the repository.

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

The application will run on:
http://localhost:5173

Note:
Ensure the backend server is running on http://localhost:3000

## Assumptions & Design Decisions

- The frontend communicates with backend APIs using Axios.
- JWT token is stored in localStorage after successful login.
- Protected routes are accessed only when a valid token exists.
- Minimal and clean UI design was chosen for clarity and usability.
- Tasks are fetched after authentication and filtered server-side per user.

