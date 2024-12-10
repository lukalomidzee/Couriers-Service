# Couriers Service Application

#### Video Demo: <https://www.youtube.com/watch?v=AFTV675iJqU>

#### Description:

This is the final project for CS50 - a Couriers Service Application built using NestJS. Its main purpose is to register and manage courier pickups efficiently.

---

## Technologies Used

- **Back-End:** NestJS for server-side processing and SQLite for database management.
- **Front-End:** Bootstrap for styling and HandlebarsJS for rendering templates.

---

## User Guide

### Sign In / User Creation

To use the application, users need to sign in. Click the **Log In** button in the top-right corner and then select **Create User** to register. After successfully registering, the user is automatically logged in.

### Main Features

After successful authorization, the application provides the following pages:

1. **Homepage:** The landing page of the application.
2. **Pickup List:** Displays a table of pickups for couriers. Users can create pickups using the Pickup Form.
3. **Pickup Form:** Allows users to create pickups by selecting the protocol, consignor, consignee sites, and courier.
4. **Dictionary:** Accessible only to Admin users. This page manages all selectable inputs, such as protocols, sites, and couriers.

---

## Application Details

### Pickup List

Users can view available pickups on the **Pickup List** page, which includes the following features:

- **Calendar:** Filter pickups by date.
- **Search:** Filter the list by courier.

New pickups are marked as 'Active' in database.

- **Actions:**
  1. **Complete Pickup:** Marks the pickup as 'Complete' and changes color to green (Requires the HAWB field to be filled, as it is crucial in logistics.)
  2. **Edit Pickup:** Opens the pickup editing form.
  3. **Cancel Pickup:** Marks the pickup as 'Canceled' and changes color to red.
  4. **Reactivate Pickup:** Re-opens or reactivates a completed pickup.

### Pickup Form

Users can create a pickup by navigating to the **Add Pickup** page from the navbar. The form includes the following fields:

1. **Pickup Date:** Calendar input.
2. **Protocol:** A fictional term for "Contract."
3. **HAWB:** Optional during creation but mandatory for completing a pickup.
4. **Consignor:** Includes fields for Site (Company), Name, Address, City, Contact Person, and Contact Number.
5. **Consignee:** Similar fields to Consignor.
6. **Courier:** Dropdown selector for choosing a courier.
7. **Comment:** Optional field for additional notes.
8. **Buttons:** Cancel, Clear Form, and Submit.

**Note:** The form is validated both on the front-end and back-end. Server-side validation ensures data integrity even if HTML attributes like `required="true"` are bypassed.

### Editing Pickups

When editing a pickup, users will see the same form with these differences:

- No **Clear Form** button.
- The courier selector does not have a blank option.

### Dictionary (Admin Only)

The **Dictionary** page, accessible only to Admin users (username: `admin`, password: `123`), manages the following database tables:

1. **Protocols**
2. **Sites**
3. **Couriers**

Each page in the Dictionary includes:

- **Input Field:** Adds data to the database.
- **Table:** Displays current data with an option to remove entries.

---

## Server-Side Details

The application runs on a NestJS server, listening on port 3000, and handles different requests:

First of all, we have different modules. Each module has its own **Controller** (which handles the different types of HTTP requests), **Service** (which stores the main functions of this module), and **Entity** (a class that defines how the table should look in the database). We have the following modules:

1. Users - To manage users;
2. Table - To manage the main table of couriers;
3. Pickup - To manage pickup forms;
4. Dictionary - To manage selectable inputs;

When the user sends a request to a specific URL, it reaches the controller. The controller analyzes the request and finds the appropriate function to execute in the Service. The Service executes the function and interacts with the Entity if necessary to modify the database table records.

In this application, we use following types of requests:

- **GET:** Fetches pages and data.
- **POST:** Adds new entries to tables like Pickups, Protocols, Sites, or Couriers.
- **PATCH:** Updates existing pickups.

### Key Features:

- **Session and Cookies:** Stores user session data, including User ID and error messages for validation feedback. After a successful login, the user details are stored in the session, which has a validity period. When we log out from the application, the user information is cleared from the session.
- **Server Validation:** Ensures that unauthorized users are redirected to the `/unauthorized` page and validates data for all requests.
- **Route Guards:** Uses `AuthGuard` and `AdminGuard` to enforce access control.

---

## Final Note

This application represents the final exercise/project of my CS50. Special thanks to CS50 for an incredible journey filled with insightful lectures and challenging exercises.

**Stay consistent! Stay hard! Push your limits!**

Luka Lomidze  
Tbilisi, Georgia,  
Email: lukalomidze2000@gmail.com  
Github: lukalomidzee
