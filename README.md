# 🚦 Traffic Violation Management System

A web-based Traffic Violation Management System developed as part of the Advanced Web Technology Skill Based Lab.

The project is being developed as a single interconnected application using React.js, Node.js, Express.js and MongoDB.

## 👥 User Roles

The system is designed with three main roles:

- 👤 User
- 👮 Traffic Officer
- ⚙️ Admin

## 🛠️ Technologies Used

### Frontend
- React.js
- React Router
- React Hook Form
- jQuery
- Axios
- HTML
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv
- body-parser

### Database
- MongoDB Atlas

### Development Tools
- Git
- GitHub
- Visual Studio Code
- Node.js and npm

---

# 📋 Requirements Before Starting

Install the following software before running the project.

1. Open terminal inside the cloned project

You should be in:

Traffic-Violation-Management-System

Check:

git status

You should see something like:

On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
2. Check Node.js and npm

Run:

node --version
npm --version

You need Node.js and npm installed.

If these commands work, you're good.

3. Install frontend dependencies

Go into frontend:

cd frontend

Then:

npm install

This will recreate the node_modules folder on this machine from package.json.

Wait until it finishes.

Then return to the project root:

cd ..
4. Install backend dependencies

Now:

cd backend

Run:

npm install

Then return to the root:

cd ..

So your structure will now be:

Traffic-Violation-Management-System/
│
├── frontend/
│   └── node_modules/       ← recreated
│
├── backend/
│   └── node_modules/       ← recreated
│
├── README.md
└── .gitignore
5. VERY IMPORTANT — Create backend/.env

Remember, we intentionally did not push .env to GitHub because it contains your MongoDB credentials.

Go to:

backend/

Create:

.env

Put your MongoDB connection information in it.

It should look like:

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=5000

Use the same MongoDB Atlas connection string that was working on your old machine.

⚠️ Don't put .env on GitHub.

6. Check your backend

From the project root:

cd backend

Start the main backend:

node server.js

You should see:

TVMS Backend running on http://localhost:5000
MongoDB connected successfully

If you get both messages, the backend is ready. ✅

Keep this terminal running.
7. Start the React frontend

Open a second terminal.

Go to your cloned project:

cd "YOUR-PATH\Traffic-Violation-Management-System\frontend"

Then:

npm start

React should start on:

http://localhost:3000