const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
  checkAndCreateTables();
});

function checkAndCreateTables() {
  const tables = [
    {
      name: 'Guests',
      query: `
        CREATE TABLE IF NOT EXISTS Guests (
          id INT AUTO_INCREMENT PRIMARY KEY,
          firstname VARCHAR(50),
          lastname VARCHAR(50),
          gender VARCHAR(10),
          email VARCHAR(100) UNIQUE
        )
      `
    },
    {
      name: 'Staff',
      query: `
        CREATE TABLE IF NOT EXISTS Staff (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(50),
          gender VARCHAR(10),
          position VARCHAR(50),
          email VARCHAR(100) UNIQUE
        )
      `
    },
    {
      name: 'Rooms',
      query: `
        CREATE TABLE IF NOT EXISTS Rooms (
          id INT AUTO_INCREMENT PRIMARY KEY,
          type VARCHAR(50),
          description TEXT,
          status ENUM('available', 'occupied') DEFAULT 'available'
        )
      `
    },
    {
      name: 'Payments',
      query: `
        CREATE TABLE IF NOT EXISTS Payments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          amount DECIMAL(10, 2),
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          guestid INT,
          paymentmethod VARCHAR(50)
        )
      `
    },
    {
      name: 'Bookings',
      query: `
        CREATE TABLE IF NOT EXISTS Bookings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          guestid INT,
          staffid INT,
          roomid INT,
          checkout_date DATE,
          checkin_date DATE,
          paymentid INT,
          status ENUM('confirmed', 'pending', 'cancelled') DEFAULT 'pending'
        )
      `
    },
    {
      name: 'Services',
      query: `
        CREATE TABLE IF NOT EXISTS Services (
          id INT AUTO_INCREMENT PRIMARY KEY,
          ServiceName VARCHAR(100),
          staffId INT,
          price DECIMAL(10, 2),
          FOREIGN KEY (staffId) REFERENCES Staff(id)
        )
      `
    },
    {
      name: 'ServiceRecords',
      query: `
        CREATE TABLE IF NOT EXISTS ServiceRecords (
          id INT AUTO_INCREMENT PRIMARY KEY,
          guestid INT,
          staffid INT,
          amountpaid DECIMAL(10, 2),
          date DATE,
          paymentid INT,
          status VARCHAR(50),
          FOREIGN KEY (guestid) REFERENCES Guests(id),
          FOREIGN KEY (staffid) REFERENCES Staff(id),
          FOREIGN KEY (paymentid) REFERENCES Payments(id)
        )
      `
    }
  ];

  tables.forEach((table) => {
    db.query(table.query, (err, result) => {
      if (err) {
        console.error(`Error creating table ${table.name}:`, err);
      } else {
        console.log(`Table ${table.name} is ready.`);
      }
    });
  });

  // Add foreign keys after all tables are created
  addForeignKeys();
}

function addForeignKeys() {
  const foreignKeys = [
    {
      name: 'Bookings_paymentid_fk',
      query: `
        ALTER TABLE Bookings
        ADD CONSTRAINT Bookings_paymentid_fk FOREIGN KEY (paymentid) REFERENCES Payments(id)
      `
    },
    {
      name: 'Bookings_guestid_fk',
      query: `
        ALTER TABLE Bookings
        ADD CONSTRAINT Bookings_guestid_fk FOREIGN KEY (guestid) REFERENCES Guests(id)
      `
    },
    {
      name: 'Bookings_staffid_fk',
      query: `
        ALTER TABLE Bookings
        ADD CONSTRAINT Bookings_staffid_fk FOREIGN KEY (staffid) REFERENCES Staff(id)
      `
    },
    {
      name: 'Bookings_roomid_fk',
      query: `
        ALTER TABLE Bookings
        ADD CONSTRAINT Bookings_roomid_fk FOREIGN KEY (roomid) REFERENCES Rooms(id)
      `
    },
    {
      name: 'Payments_Bookingid_fk',
      query: `
        ALTER TABLE Payments
        ADD CONSTRAINT Payments_Bookingid_fk FOREIGN KEY (Bookingid) REFERENCES Bookings(id)
      `
    }
  ];

  foreignKeys.forEach((fk) => {
    db.query(fk.query, (err, result) => {
      if (err) {
        console.error(`Error adding foreign key ${fk.name}:`, err);
      } else {
        console.log(`Foreign key ${fk.name} added.`);
      }
    });
  });
}

module.exports = db;
