# Social Media

## Overview

An online platform that allows users to create, share their content, and connect with friends. Users can post updates, photos, like and comment on others' posts, and attach their personal links to other social platforms.

## User Experience

Enhanced user experience with the addition of dark mode support and a responsive design optimized for smaller screens.

### Technologies

- **Frontend**:

  - **TypeScript**: Strongly typed programming language for improved code quality.
  - **React**: For building user interfaces.
  - **Context API**: For state management.
  - **React Query**: For server-side data management.
  - **Material UI**: For UI components and styling.
  - **Formik & Yup**: For form handling and validation.
  - **React Router**: For client-side routing.
  - **React Dropzone**: For image uploading.
  - **Media Queries**: For responsive design.

- **Backend**:

  - **TypeScript**: Strongly typed programming language for backend code.
  - **Node.js**: JavaScript runtime for the backend.
  - **Express**: Fast and minimalist web framework.
  - **MongoDB**: NoSQL database for data storage.
  - **JWT**: JSON Web Tokens for user authentication.
  - **Joi**: For backend validation.
  - **Multer**: For handling image uploads.
  - **Helmet**: For securing HTTP headers.

- **Testing**:

  - **Jest**: JavaScript testing framework for unit and integration tests.
  - **Supertest**: HTTP assertions for testing API endpoints.

- **Containerization**:
  - **Docker**: For containerizing the application and ensuring consistent environments across development and production.
  - **Docker Compose**: For defining and running multi-container Docker applications, including the frontend, backend, and database.

### Features

- **Authentication**: Secure user login and registration with JWT.
- **Authorization**: Role-based access control for different features.
- **Profile Management**: Users can update profiles, upload images, and manage their content.
- **Posts**: Create, like, comment on posts, and share content.
- **Dark Mode**: User-selectable dark mode for better usability.
- **Responsive Design**: Optimized for both mobile and desktop views.

### Additional Tools

- **Formik**: For building and managing forms.
- **Yup**: Schema builder for value parsing and validation.
- **Multer**: For handling image uploads and file management.
- **Supertest**: Simplifies HTTP assertions for testing API endpoints in Node.js applications.
- **React Dropzone**: For implementing drag-and-drop file uploads.
- **Helmet**: Securing Express apps by setting various HTTP headers.
- **React Hot Toast**: For showing notifications and feedback to users in a non-intrusive way.
