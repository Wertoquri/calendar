# Calendar App - Backend Setup Guide

## Database Setup

### 1. Install MySQL
Make sure you have MySQL installed on your system.

### 2. Create Database and Tables
Run the SQL script to create the database and tables:

```bash
# Login to MySQL
mysql -u root -p

# Run the schema
source Server/schema.sql
```

Or manually execute the SQL commands from `Server/schema.sql` in MySQL Workbench or phpMyAdmin.

### 3. Configure Environment Variables

Create a `.env` file in the `Server` folder with your credentials:

```env
HOST=localhost
USER=root
PASSWORD=your_mysql_password
DATABASE=webcalendar
SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=3000
```

## Running the Application

### Start Backend Server

```bash
cd Server
npm run dev
```

The server will start on `http://localhost:3000`

### Start Frontend

```bash
cd calendar
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /register` - Register new user
  ```json
  {
    "login": "username",
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- `POST /login` - Login user
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Events (requires authentication)
- `GET /events` - Get all user events
- `POST /events` - Create new event
  ```json
  {
    "title": "Meeting",
    "date": "2026-03-25",
    "time": "14:00",
    "color": "#6366f1"
  }
  ```
- `PUT /events/:id` - Update event
- `DELETE /events/:id` - Delete event

All authenticated requests require header:
```
Authorization: Bearer <your_jwt_token>
```

## Default Port Configuration
- Frontend: `5173`
- Backend: `3000`

## Troubleshooting

### Connection Errors
- Make sure MySQL is running
- Check credentials in `.env` file
- Verify database `webcalendar` exists

### CORS Errors
- Ensure backend CORS is configured for `http://localhost:5173`
- Check that both frontend and backend are running

### Token Errors
- Clear localStorage and login again
- Check if SECRET key matches in .env
