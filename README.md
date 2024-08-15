# Group 13

## Authors
* [Anjali Benjamin](an653262@dal.ca) - *(Maintainer)* - [Git Branch: an653262](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13/-/tree/an653262?ref_type=heads)
* [Dhruvi Akhilesh Shah](dh368867@dal.ca) - *(Maintainer)* - [Git Branch: dhruvi1404](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13/-/tree/dhruvi1404?ref_type=heads)
* [Drishti Shantilal Patel](dr207990@dal.ca) - *(Maintainer)* - [Git Branch: jd800733](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13/-/tree/drishti8?ref_type=heads)
* [Judith Kurian: judith475](jd800733@dal.ca) - *(Maintainer)* - [Git Branch](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13/-/tree/judith475?ref_type=heads)
* [Shubham Dipakkumar Jethva](sh526033@dal.ca) - *(Maintainer)* - [Git Branch: sh526033](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13/-/tree/sh526033?ref_type=heads)
* [Vineeth Gudipalli](vn388445@dal.ca) - *(Maintainer)* - [Git Branch: vn388445](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13/-/tree/vn388445?ref_type=heads)

## Prerequisites
- Node.js: Install the latest version of Node.js from [here](https://nodejs.org/)
- Maven: Install the latest version of Maven from [here](https://maven.apache.org/install.html)

## Deployment
- Backend deployment link: [https://csci-5709-grp-13.onrender.com:8080](https://csci-5709-grp-13.onrender.com:8080)
- Frontend deployment link: [https://little-light.netlify.app/](https://little-light.netlify.app/)

## Group 13 Main Repository
- [Group 13 Git URL](https://git.cs.dal.ca/gudipalli/csci-5709-grp-13)

## Application Overview
Little Light is a comprehensive mental health web application designed to provide a safe and supportive space for individuals dealing with a wide range of mental health challenges, including stress, depression, anxiety, and more. Our platform offers an array of resources tailored to help users manage and improve their mental well-being.
At the heart of Little Light are our qualified mental health professionals who are available for booking one-on-one therapy sessions. Users can easily browse through physician list in the ‘Book Appointment’ tab after they log in to the website. In the physician list, along with the physician’s name, their specialization is also included by which the user can select the best match for their needs, making the often-daunting task of finding the right help a lot easier.


## Key Tasks
- **User Authentication and Onboarding**: Ensure a smooth and secure sign-up/sign-in process for users and therapists, with a focus on the safety of client data.
- **Journaling**: Provide users with a private diary feature where they can freely record their thoughts and experiences without external influence.
- **Music Listening**: Offer curated instrumental music to help reduce the severity of users' moods and improve mental well-being.
- **Profile Management**: Enable users and therapists to manage and update their profiles, including the ability to submit recommendations and feedback.
- **Blogs**: Create and maintain a collection of supportive and encouraging articles, accessible to all users.
- **Bookings**: Facilitate the scheduling of therapy sessions with professionals, ensuring a seamless experience for users.

## Technologies Used
- **React JS:** A JavaScript library used for building dynamic and responsive user interfaces, ensuring a seamless user experience.
- **Spring Boot:** A robust framework that simplifies the development of RESTful APIs and backend services, enabling secure and efficient data management.
- **MySQL:** A relational database management system used to store and retrieve application data, ensuring data integrity and security.

## Work Done in Developing the Proposed Application Prototype

### 1. **Frontend Development:**
   - **User Interface Design:** Designed a user-friendly interface using React JS and Material-UI. The UI ensures easy navigation, especially for users who may not be tech-savvy.
   - **User Authentication:** Integrated secure login and registration functionality using JWT for secure communication between the frontend and backend.
   - **Profile Management:** Developed components for users and therapists to manage and update their profiles, including the ability to upload profile pictures and update personal information.
   - **Journaling Feature:** Implemented a diary feature allowing users to securely write and save journal entries, ensuring privacy.
   - **Music Listening:** Integrated an audio player that allows users to listen to curated instrumental music, with a focus on mood improvement.
   - **Blogs:** Created a blog section where users can read articles related to mental health, self-care, and wellness.
   - **Appointment Booking:** Developed a booking system for users to schedule therapy sessions with mental health professionals.

### 2. **Backend Development:**
   - **API Development:** Built RESTful APIs using Spring Boot to handle user authentication, profile management, journaling, music library, and appointment booking.
   - **Database Integration:** Configured a MySQL database to store user data, therapist information, journal entries, and appointment bookings.
   - **Data Security:** Implemented encryption for sensitive data, ensuring that user information is stored securely.
   - **Session Management:** Developed a session management system to handle user sessions, ensuring that users remain logged in securely across their browsing experience.

### 3. **Deployment:**
   - **Frontend Deployment:** Deployed the frontend on Netlify, ensuring continuous integration and deployment for rapid updates.
   - **Backend Deployment:** Deployed the backend on Render, providing a scalable environment for the application.
   - **Version Control:** Utilized GitLab for version control, with individual branches for each team member to ensure smooth collaboration.


## Installation Instructions
### Frontend
1. Navigate to the frontend directory:
    ```sh
    cd little-light
    ```
2. Install the required dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start
    ```

### Backend
1. Navigate to the backend directory:
    ```sh
    cd backend
    ```
2. Install the required dependencies:
    ```sh
    mvn install
    ```
3. Start the backend server:
    ```sh
    mvn spring-boot:run
    ```

---

