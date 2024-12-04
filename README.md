# user-auth-app
This application provides secure user registration, login, and profile management features. It uses Node.js with MongoDB and includes encryption and rate-limiting to ensure data security.

Steps to setup the application:

Prerequisites:
    Ensure you have the following installed:
    Node.js: Version 20.x or the latest version.
    MongoDB: Latest version.

Setup Instructions:
    Step 1: Clone the Repository   
            git clone https://github.com/codedfork/user-auth-app.git  

    Step 2: Install Dependencies
        cd user-auth-app  
        npm install

    Step 3: Configure Environment Variables
        PORT=3000  
        MONGODB_URI=mongodb://localhost:27017/yourDatabase  
        ENCRYPTION_KEY=yourEncryptionKey  
        JWT_SECRET=yourJWTSecret  

    Step 4: Run Tests
        npm test  

    Step 5: Start the Application
        npm start 

Note : Please use "docker-compose up --build" if using docker         


Features:
    User Registration and Login with password hashing.
    JWT Authentication for secure user sessions.
    Data Encryption for sensitive information.
    Rate Limiting to prevent abuse and protect against DDoS attacks.



