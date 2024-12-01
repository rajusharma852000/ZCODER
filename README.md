# Zcoder - A Collaborative Coding Platform

![Zcoder Logo](https://drive.google.com/uc?export=view&id=13_Nk6UCb2kPLmVpiZvqj9w2wJBvgt_IG)  
*Your one-stop platform to organize, share, and discuss coding problems.*

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [How to Use](#how-to-use)
- [Challenges and Solutions](#challenges-and-solutions)
- [Impact and Outcomes](#impact-and-outcomes)
- [Live Demo](#live-demo)
- [Contributing](#contributing)
- [License](#license)

---

## Project Overview

Zcoder is a coding platform designed to simplify the process of managing coding problems and solutions from various platforms in one place. The platform enhances collaborative learning by enabling users to share and discuss coding problems, helping them improve their problem-solving skills together.

The project was assigned to me by the Coding Club at IIT Guwahati, and I began working on it in June. The goal was to create a feature-rich application for students to store, organize, and collaborate on coding problems efficiently.

![Platform Screenshot](https://drive.google.com/uc?export=view&id=1CD3pfRoJvOdx3swc-iKAjhKdZJ6OwWeT)  
*Screenshot showing the dashboard and coding problem view.*

---

## Features

- **User Authentication:**  
  Implemented JWT authentication for secure login and logout functionality. This ensures that only authorized users can access private questions and participate in discussions.
  
- **Public and Private Questions:**  
  Users can create and upload coding questions, mark them as public (accessible to everyone) or private (visible only to the uploader).
  
- **Question Management:**  
  Features for creating, updating, saving, and marking questions as important. Users can control the visibility of each question.

- **Commenting System:**  
  Public questions come with a comment section, where users can discuss and share ideas or suggestions on solutions. Users must create a profile to comment.

- **Search Functionality:**  
  Integrated search capabilities for users to find specific questions quickly based on keywords or tags.

- **Discussion Rooms:**  
  Enabled anonymous chat rooms where users can discuss topics without sharing personal information.

---

## Technologies Used

- **Frontend:**  
  Built with **ReactJS** and styled with **Tailwind CSS** for a responsive and clean user interface.

- **Backend:**  
  Developed using **NodeJS** and **ExpressJS** to handle RESTful API calls and ensure a smooth backend experience.

- **Database:**  
  **MongoDB** is used to store user profiles, coding questions, and comments, with proper indexing for efficient searches.

- **Authentication:**  
  **JWT tokens** are used for secure user authentication, ensuring a safe and efficient login/logout process.

- **Routing:**  
  **React Router** helps in managing the routing of various pages and components efficiently.

---

## How to Use

1. **Sign Up or Log In:**  
   To fully enjoy Zcoder’s features, create an account or log in using your credentials.
   
2. **Browse Public Questions:**  
   You can view all the public coding questions without signing up.

3. **Add Your Own Questions:**  
   As a registered user, you can add your own coding problems and solutions, control their visibility, and mark them as important.

4. **Join Discussions:**  
   Participate in discussions on public questions or create anonymous chat rooms for more interactive learning.

5. **Search Questions:**  
   Use the search functionality to find problems that match your interests or needs.

---

## Challenges and Solutions

- **User Authentication:**  
  Ensuring secure authentication was a priority, and **JWT** tokens were implemented to handle login/logout securely.

- **Visibility and Access Control:**  
  Managing the visibility of questions (public vs private) posed a challenge, but was solved through proper backend logic and access control mechanisms.

- **Commenting and Real-Time Updates:**  
  Enabling real-time commenting and ensuring data integrity across the platform was difficult. This was addressed by efficient database queries and API caching techniques.

- **Time Management:**  
  Balancing multiple responsibilities and meeting deadlines was a challenge. Prioritization and time-blocking helped meet deadlines.

![Feature Screenshot](https://drive.google.com/uc?export=view&id=1jAKb7rgm3i7bhFVQ4q9Q3dNUsPlRDHHR)  
*Showing the process of adding a question and managing visibility.*

---

## Impact and Outcomes

- **Usability:**  
  Zcoder makes it easy to organize and share coding problems, improving how coding enthusiasts collaborate and solve problems together.

- **Feedback:**  
  Peers have praised the platform’s intuitive interface and its ability to foster collaboration among users.

- **Scalability:**  
  The platform’s architecture supports future enhancements like problem-solving leaderboards, real-time coding challenges, and much more.

---

## Live Demo

Check out the live demo of Zcoder here:  
**[https://zcoder-frontend-7r3k.onrender.com/]**

---

