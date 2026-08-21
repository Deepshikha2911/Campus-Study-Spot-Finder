# Campus Study Spot Finder

Campus Study Spot Finder is a web application designed to help students discover the best places to study around their campus.

Students can explore different study locations based on important factors such as **noise level, Wi-Fi quality, availability of power outlets, crowd level, ratings, and reviews**. Users can also save their favorite study spots and share their experiences with other students.

The application provides a simple, user-friendly, and visually appealing interface to make finding the perfect study environment easier.

---

## Features

### User Authentication

- User registration using email and password
- Secure login using Firebase Authentication
- Protected routes for authenticated users
- Persistent login session
- User profile management
- Logout functionality

### Study Spot Discovery

Users can explore different study locations available around the campus.

Each study spot can include information such as:

- Location
- Noise level
- Wi-Fi quality
- Availability of power outlets
- Crowd level
- Ratings
- Reviews

### Search and Filter

Students can search and filter study spots based on their preferences.

Possible filters include:

- Quiet study spaces
- Good Wi-Fi
- Availability of power outlets
- Less crowded places

### Favorites

Users can save their preferred study locations to a personal favorites list.

Features include:

- Add a study spot to favorites
- Remove a study spot from favorites
- View all saved study spots

### Ratings and Reviews

Students can share their experiences by adding reviews and ratings for study locations.

This helps other students make better decisions when choosing a place to study.

### User Profile

Authenticated users can access their personal profile and view account information such as:

- User name
- Email address
- Account details

### Protected Pages

Certain pages are only accessible after authentication.

Protected pages include:

- Study Spots
- Spot Details
- Favorites
- Reviews
- User Profile

---

## Technologies Used

The project is built using the following technologies:

| Technology | Purpose |
|------------|---------|
| React | Frontend user interface |
| Vite | Development environment and build tool |
| JavaScript | Application logic |
| React Router DOM | Client-side routing |
| Firebase Authentication | User registration and login |
| Firebase | Authentication and backend services |
| CSS | Styling and responsive design |

---

## Project Structure

```text
Campus-Study-Spot-Finder/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── StudySpotCard.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx
│   │
│   ├── data/
│   │   └── studySpots.js
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── StudySpots.jsx
│   │   ├── SpotDetails.jsx
│   │   ├── Favorites.jsx
│   │   ├── Review.jsx
│   │   ├── About.jsx
│   │   └── Profile.jsx
│   │
│   ├── firebase.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
├── vite.config.js
└── README.md
```

---

## Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Deepshikha2911/Campus-Study-Spot-Finder.git
```

### 2. Navigate to the Project Folder

```bash
cd Campus-Study-Spot-Finder
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

The application will start locally and provide a URL similar to:

```text
http://localhost:5173/
```

Open the URL in your browser.

---

## Firebase Configuration

This project uses Firebase Authentication for user registration and login.

To configure Firebase:

1. Create a Firebase project.
2. Add a Web Application to the Firebase project.
3. Enable Email/Password authentication.
4. Make the .env file referring to .env.example file and paste your credentials in .env file.

---

## Authentication Flow

The application uses Firebase Authentication to manage user accounts.

```text
User
  │
  ├── Register
  │      ↓
  │   Firebase Authentication
  │      ↓
  │   Account Created
  │      ↓
  │   User Logged In
  │
  └── Login
         ↓
      Firebase Authentication
         ↓
      Authentication Verified
         ↓
      Access to Protected Pages
```

When a user logs out:

```text
Logout
   ↓
Firebase signOut()
   ↓
User Session Ends
   ↓
Protected Pages Become Inaccessible
```

---

## Application Pages

### Home

The landing page introduces the platform and allows users to start exploring the application.

### Login

Allows existing users to securely log in using their email and password.

### Register

Allows new users to create an account using Firebase Authentication.

### Study Spots

Displays available study locations around the campus.

### Spot Details

Shows detailed information about a selected study location.

### Favorites

Displays study locations saved by the user.

### Reviews

Allows students to share ratings and reviews about study locations.

### Profile

Displays information about the currently authenticated user.

### About

Provides information about the Campus Study Spot Finder platform.

---

## Project Objective

The main objective of Campus Study Spot Finder is to help students find a suitable environment for studying based on their personal preferences.

Instead of searching around the campus manually, students can use the platform to compare study spaces based on factors such as:

- Noise
- Wi-Fi quality
- Power outlets
- Crowd level
- Ratings
- Reviews

This can help students save time and choose a study environment that best supports their productivity.

---

## Future Improvements

Some features that can be added in future versions include:

- Real-time crowd level updates
- Google Maps integration
- Study spot photos uploaded by users
- Firebase Firestore database integration
- Personalized study spot recommendations
- Advanced search and filtering
- Profile picture upload
- Edit user profile
- Password reset functionality
- Dark mode
- Mobile application version

---

## Author

**Deepshikha Chaurasia**

B.Tech Computer Science Engineering Student

---

## License

This project is created for educational and learning purposes.

You are free to use and modify the project for educational purposes.

---

⭐ If you like this project, consider giving it a star!