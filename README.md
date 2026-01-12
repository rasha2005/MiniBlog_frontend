# Mini Blogging Platform (JWT Auth)

## Overview
This is a **secure mini-blogging platform** built with **MERN stack**.  
Authenticated users can **register, login, create, read, edit, and delete their own posts**. JWT authentication is used for security, and ownership is enforced.

---

## Features

- **User Authentication**: Register/Login with JWT  
- **Post Management**: Create, Read, Edit, Soft Delete posts  
- **Ownership enforcement**: Only authors can edit/delete their posts  
- **Frontend**: React + TailwindCSS, protected routes, loading & error states  

---

## Tech Stack

- Frontend: React, React Router, TailwindCSS, Axios  
- Backend: Node.js, Express, MongoDB, Mongoose  
- Authentication: JWT  
- Password Hashing: bcrypt  

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login and get JWT |

### Posts
| Method | Endpoint           | Description                | Auth |
|--------|------------------|----------------------------|------|
| POST   | /create-post        | Create post                | Yes  |
| GET    | /my-posts | Get logged-in user's posts | Yes   |
| DELETE | /delete-post/:id    | Soft delete post           | Yes   |
| PUT | /edit-post/:id    | update the post           | Yes   |
| GET | /getPostById/:id    | Fetch a particular post using its ID | Yes   |

---

## Authentication Flow

- Backend returns JWT on login/register  
- Token stored in **localStorage**  
- Axios interceptor attaches token to requests  
- Backend verifies token using `authMiddleware`  
- Only authenticated users can access protected routes  

**Reason for using localStorage instead of cookies:**  
Although cookies are more secure against XSS, localStorage is used here because:
1. Simpler implementation for machine test  
2. Easy access for Axios interceptors  
3. Fast setup under time constraints  

> In production, HTTP-only cookies are recommended for better security.

---
