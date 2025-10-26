# 🎯 YourTutor - Online Learning Platform — Backend API

This is the **backend of a learning management system** (LMS).
It’s built with **Express + TypeScript + MongoDB** and handles authentication, courses, enrollment, payment, meetings, reviews, and more.

Frontend developers can easily use these APIs to connect their React / Next.js frontend.

---

## 🚀 Tech Stack

* **Express.js (v5)** — Server framework
* **TypeScript** — For type safety
* **MongoDB + Mongoose** — Database
* **Zod** — Request validation
* **Cloudinary** — File upload (images, videos)
* **JWT + Cookies** — Authentication
* **Multer** — Handle file uploads
* **Nodemailer** — Send emails for verification

---

## 🧩 Project Structure

```
server/
│
├── src/
│   ├── modules/
│   │   ├── auth/           → user, student, mentor, admin
│   │   ├── course/         → courses, modules, videos, quiz
│   │   ├── enrollment/     → course enrollment & progress
│   │   ├── review/         → course reviews
│   │   ├── meeting/        → class meeting links
│   │   ├── payment/        → payment gateway routes
│   │   └── category/       → course categories
│   │
│   ├── middlewares/        → auth, role, validator, error handler
│   ├── utils/              → multer, cloudinary, mailer, etc.
│   └── config/             → env setup
│
└── package.json
```

---

## 🪄 How Authentication Works

All users (student, mentor, admin) login and register using email/password.
When you log in:

* Backend sets **two cookies**: `token` and `refreshToken`
* These cookies are **httpOnly** (safe for frontend)
* You must send them in every request (axios should include credentials)

### 👉 Frontend setup for axios:

```js
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true, // this is very important
});
```

---

## 👤 User Routes

| Route                    | Method | Description                                                       |
| ------------------------ | ------ | ----------------------------------------------------------------- |
| `/user/register`         | POST   | Register new user (handled separately for student, mentor, admin) |
| `/user/login`            | POST   | Login user                                                        |
| `/user/profile`          | GET    | Get logged-in user info                                           |
| `/user/updateProfile`    | PUT    | Update user profile                                               |
| `/user/deleteUser`       | PUT    | Soft delete user                                                  |
| `/user/changePassword`   | PUT    | Change password                                                   |
| `/user/logout`           | POST   | Logout user                                                       |
| `/user/sendSignUpCode`   | POST   | Send verification email                                           |
| `/user/verifySignUpCode` | POST   | Verify code before register                                       |

### 🔹 For Specific Roles

| Role    | Route                    |
| ------- | ------------------------ |
| Student | `/user/student/register` |
| Mentor  | `/user/mentor/register`  |
| Admin   | `/user/admin/register`   |

---

## 🧑‍🏫 Admin Routes

| Route                           | Method | Description              |
| ------------------------------- | ------ | ------------------------ |
| `/user/admin/register`          | POST   | Create new admin         |
| `/user/admin/mentors`           | GET    | Get all mentors          |
| `/user/admin/students`          | GET    | Get all students         |
| `/user/admin/requestedMentors`  | GET    | Mentor approval requests |
| `/user/admin/approveMentor/:id` | PUT    | Approve mentor           |
| `/user/admin/rejectMentor/:id`  | PUT    | Reject mentor            |
| `/user/admin/block/:id`         | PUT    | Block user               |
| `/user/admin/unblock/:id`       | PUT    | Unblock user             |
| `/user/admin/blockedAccount`    | GET    | Get all blocked users    |
| `/user/admin/delete/:id`        | PUT    | Soft delete              |
| `/user/admin/undodelete/:id`    | PUT    | Undo delete              |

**Note:** All admin routes need admin role and token.

---

## 🎓 Course Routes

| Route                          | Method | Description                      |
| ------------------------------ | ------ | -------------------------------- |
| `/course/create-course`        | POST   | Create a new course (Admin only) |
| `/course/get-courses`          | GET    | Get all courses                  |
| `/course/get-featured-courses` | GET    | Get featured courses             |
| `/course/get-popular-courses`  | GET    | Get popular courses              |
| `/course/:id`                  | GET    | Get single course                |
| `/course/update/:id`           | PUT    | Update course                    |
| `/course/delete/:id`           | PUT    | Soft delete course               |

### 📸 Upload course thumbnail

When creating or updating a course, send thumbnail using **multipart/form-data**.

Example:

```js
const formData = new FormData();
formData.append("thumbnail", file);
formData.append("title", "MERN Stack Bootcamp");
```

---

## 📦 Category Routes

| Route                   | Method | Description                   |
| ----------------------- | ------ | ----------------------------- |
| `/category/addCategory` | POST   | Add new category (Admin only) |
| `/category/`            | GET    | Get all categories            |
| `/category/delete/:id`  | DELETE | Delete a category             |

---

## 🎥 Video Routes

| Route                                                     | Method | Description                    |
| --------------------------------------------------------- | ------ | ------------------------------ |
| `/video/addVideo`                                         | POST   | Add a new video (Admin/Mentor) |
| (Requires title, description, videoUrl, duration, isFree) |        |                                |

---

## 🧩 Module Routes

| Route                      | Method | Description            |
| -------------------------- | ------ | ---------------------- |
| `/module/addModule/:id`    | POST   | Add module to a course |
| `/module/updateModule/:id` | POST   | Update module          |
| `/module/deleteModule/:id` | POST   | Delete module          |

---

## 🧑‍🎓 Enrollment Routes

| Route                                    | Method | Description                    |
| ---------------------------------------- | ------ | ------------------------------ |
| `/enrollment/enroll/:id`                 | POST   | Enroll in a course             |
| `/enrollment/getMyEnrollments`           | GET    | Get user enrolled courses      |
| `/enrollment/updateEnrollmentStatus/:id` | PUT    | Update enrollment (Admin only) |

---

## 💬 Review Routes

| Route                          | Method | Description     |
| ------------------------------ | ------ | --------------- |
| `/review/addReview/:courseId`  | POST   | Add review      |
| `/review/getReviews/:courseId` | GET    | Get all reviews |
| `/review/delete/:id`           | DELETE | Delete review   |

---

## 🧠 Quiz Routes

| Route                      | Method | Description         |
| -------------------------- | ------ | ------------------- |
| `/quiz/addQuiz/:courseId`  | POST   | Add quiz            |
| `/quiz/updateQuiz/:quizId` | PUT    | Update quiz         |
| `/quiz/deleteQuiz/:quizId` | DELETE | Delete quiz         |
| `/quiz/getQuiz/:moduleId`  | GET    | Get quiz for module |

---

## 🕐 Meeting Routes

| Route                               | Method | Description                   |
| ----------------------------------- | ------ | ----------------------------- |
| `/meeting/createMeeting/:courseId`  | POST   | Create meeting link           |
| `/meeting/getMeeting/:meetingId`    | GET    | Get single meeting            |
| `/meeting/getMeetings/:courseId`    | GET    | Get all meetings for a course |
| `/meeting/updateMeeting/:meetingId` | PUT    | Update meeting                |
| `/meeting/deleteMeeting/:meetingId` | DELETE | Delete meeting                |

---

## 💰 Payment Routes

| Route                  | Method | Description              |
| ---------------------- | ------ | ------------------------ |
| `/payment/payBill/:id` | POST   | Start payment            |
| `/payment/success/:id` | POST   | Payment success callback |
| `/payment/fail/:id`    | POST   | Payment fail callback    |
| `/payment/cancel/:id`  | POST   | Payment cancel callback  |

---

## ✉️ Email System

* Nodemailer is used for sending verification and password reset codes.
* Environment variables required:

  ```
  GMAIL_USER=your_email@gmail.com
  GMAIL_PASS=your_app_password
  ```

---

## ☁️ Cloudinary Setup

Used for uploading course thumbnails or profile images.

Environment variables:

```
CLOUDINARY_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

---

## 🧠 Important for Frontend Devs

✅ Always call APIs using **axiosInstance** with `withCredentials: true`
✅ Protected routes (like `/profile`, `/create-course`, etc.) require cookies
✅ Handle `401` response → logout user automatically
✅ Use `FormData` for image or file upload
✅ For filters (like `?limit=4&sort=desc`), send them as `params`

---

## 🧾 Example (Frontend Fetch)

```js
// get courses
const res = await axiosInstance.get("/course/get-courses", {
  params: { limit: 4, sort: "desc" },
});
console.log(res.data);
```

```js
// create a course (Admin)
const formData = new FormData();
formData.append("title", "Next.js Mastery");
formData.append("price", 2999);
formData.append("thumbnail", file);

await axiosInstance.post("/course/create-course", formData);
```

---

## 🧑‍💻 For Local Setup

1. Clone repo
2. Run `npm install`
3. Create `.env` file (use variables below)
4. Run `npm run start`

Example `.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
NODE_ENV=development

GMAIL_USER=your@gmail.com
GMAIL_PASS=app_password

CLOUDINARY_NAME=cloud_name
CLOUDINARY_API_KEY=key
CLOUDINARY_API_SECRET=secret
```

---

## ✅ Quick Notes

* All data are soft deleted (not removed from DB).
* Admin can undo deletes or un-block users.
* Some routes need file upload (use `multipart/form-data`).
* Every important API uses **Zod validation**, so you’ll get clear error messages.
