CREATE TABLE IF NOT EXISTS appUser(
    userID SERIAL PRIMARY KEY,
    isAdmin BOOLEAN NOT NULL,
    username VARCHAR(60) NOT NULL,
    hashedPassword CHAR(60) NOT NULL,
    email VARCHAR(100) NOT NULL CONSTRAINT unique_email UNIQUE
);

CREATE TABLE IF NOT EXISTS busRoute(
    routeID SERIAL PRIMARY KEY,
    routeName VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS bus(
    busID SERIAL,
    routeID INTEGER NOT NULL REFERENCES busRoute(routeID),
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    PRIMARY KEY(busID, routeID)
);

CREATE TABLE IF NOT EXISTS station(
    stationID SERIAL PRIMARY KEY,
    stationName VARCHAR(128) NOT NULL,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL
);

CREATE TABLE IF NOT EXISTS stationInRoute(
    stationID INTEGER NOT NULL REFERENCES station(stationID),
    routeID INTEGER NOT NULL REFERENCES busRoute(routeID),
    orderInRoute INTEGER NOT NULL,
    PRIMARY KEY (stationID, routeID)
);
