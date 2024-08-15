# Little Light

## Author
* [Shubham Dipakkumar Jethva](shubhamjethva92@gmail.com) - *(Maintainer)*

## Prerequisites
- Node.js: Install the latest version of Node.js from [here](https://nodejs.org/)
- Maven: Install the latest version of Maven from [here](https://maven.apache.org/install.html)
  
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
   - **Version Control:** Utilized Github for version control, with individual branches for each team member to ensure smooth collaboration.


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
   OR
   ```sh
   mvn clean package
   ```
3. Start the backend server:
    ```sh
    mvn spring-boot:run
    ```

---

