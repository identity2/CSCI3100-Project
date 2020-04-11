# CSCI3100 Smart Bus System
This is a group project for the course CSCI3100 - Software Engineering at the Chinese University of Hong Kong.

## Project Structure
### Admin Page
This is the administration page for the managers of the bus system.

It is developed using html5 (Bootstrap, Ajax).

The admin page is hosted on [Google Compute Engine](http://35.201.158.77/).

### Backend
This is the backend RESTful APIs to bridge between the admin page and the mobile app.

It is developed in Go with PostgreSQL.

The backend is hosted on [Google Compute Engine](http://35.201.158.77:3100/ping).

### Mobile App
This is the mobile app for the end users (aka bus passengers).

It is developed using React Native (Expo).

### How to start up each component of the project?
There are instructions in the `readme.md` file in each directory.