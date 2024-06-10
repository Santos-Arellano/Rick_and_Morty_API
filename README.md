Rick and Morty Episode Tracker
Rick and Morty

Description
Rick and Morty Episode Tracker is a web application that allows users to explore episodes and characters from the TV series "Rick and Morty". Users can register, log in, and save their favorite episodes and characters to their profile. This application uses the Rick and Morty GraphQL API to retrieve up-to-date data about the series.

Features
User authentication (Registration, Login, Logout)
View episode list
View character list
Save favorite episodes
Save favorite characters
Search characters by name
Technologies Used
Node.js
Express
Passport.js (for authentication)
MySQL (database)
Handlebars (template engine)
Axios (for making API requests to Rick and Morty API)
Bootstrap (for styling)
Installation
Follow these steps to set up and run the project on your local machine.

Prerequisites
Node.js and npm (https://nodejs.org/)
MySQL (https://www.mysql.com/)
Clone the Repository
bash

Open In Editor
Edit
Run
Copy code
git clone https://github.com/your-username/rick-and-morty-tracker.git
cd rick-and-morty-tracker
Install Dependencies
bash

Open In Editor
Edit
Run
Copy code
npm install
Configure the Database
Create a database in MySQL and run the following script to create the necessary tables:
sql

Open In Editor
Edit
Copy code
CREATE DATABASE rickandmorty;

USE rickandmorty;

CREATE TABLE user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  episode_id INT,
  episode_name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE favorite_characters (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  character_id INT,
  character_name VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES user(id)
);
Create a keys.js file in the project root with the following configuration:
javascript

Open In Editor
Edit
Run
Copy code
module.exports = {
  database: {
    host: 'localhost',
    user: 'root',
    password: 'your-password',
    database: 'rickandmorty'
  }
};
Run the Application
bash

Open In Editor
Edit
Run
Copy code
npm start
The application will be available at http://localhost:4000.

Usage
Register and log in to the application.
Explore the episode and character lists.
Save your favorite episodes and characters.
View your profile to see your favorites.
Project Structure



Contributions
Contributions are welcome. You can fork the repository and create a pull request with your improvements.

License
This project is under the MIT License. See the LICENSE file for more details.
