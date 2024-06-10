# Rick and Morty Episode Tracker

## Description
Rick and Morty Episode Tracker is a web application that allows users to explore episodes and characters from the TV series "Rick and Morty". Users can register, log in, and save their favorite episodes and characters to their profile. This application uses the Rick and Morty GraphQL API to retrieve up-to-date data about the series.


# Introduction
Rick and Morty Episode Tracker is a web application that allows users to explore episodes and characters from the "Rick and Morty" TV series. Users can register, log in, and save their favorite episodes and characters to their profile.

# Registration and Login
To use the application, you must first register. Click on the "Register" button and complete the form with your username and password. Once you have registered, you can log in to the application with the same credentials.

# Explore Episodes and Characters
Once you have logged in, you can explore the list of episodes and characters from the series. Click on "Episodes" or "Characters" in the navigation menu to view the corresponding lists.

# Save Favorites
If you find an episode or character you like, you can add it to your favorites. Simply click on the "Add to Favorites" button on the episode or character detail page.

# View Profile
You can view your profile by clicking on "Profile" in the navigation menu. Here you can see your favorite episodes and characters.

#Developer Documentation
Installation To install the application on your local machine, follow the steps in the installation section of the README.md file.

# Project Structure
The project follows a standard Node.js/Express project structure. The application files are located in the src folder, the configuration files in the config folder, and the database migrations in the migrations folder. Database The application uses MySQL as its database. The necessary tables are automatically created when running the database migrations.

# Authentication
User authentication is handled with Passport.js. The details of the Passport configuration can be found in the config/passport.js file.

# API
The application uses the Rick and Morty GraphQL API to obtain data about episodes and characters. API requests are made using the Axios library.

## Features
- User authentication (Registration, Login, Logout)
- View episode list
- View character list
- Save favorite episodes
- Save favorite characters
- Search characters by name

## Technologies Used
- Node.js
- Express
- Passport.js (for authentication)
- MySQL (database)
- Handlebars (template engine)
- Axios (for making API requests to Rick and Morty API)
- Bootstrap (for styling)

## Installation
Follow these steps to set up and run the project on your local machine.

### Prerequisites
- Node.js and npm (https://nodejs.org/)
- MySQL (https://www.mysql.com/)

1. Clone the repository:
  ```bash
  git clone https://github.com/your-username/Rick_and_Morty_API.git
  ```

2. Navigate to the project directory:
  ```bash
  cd Rick_and_Morty_API
  ```

3. Install the dependencies:
  ```bash
  npm install
  ```

4. Set up the database:
  - Create a new MySQL database.
  - Update the database configuration in the `config/config.json` file.

5. Run the database migrations:
  ```bash
  npx sequelize-cli db:migrate
  ```

6. Start the application:
  ```bash
  npm start
  ```

7. Open your web browser and visit `http://localhost:4000` to access the application.
