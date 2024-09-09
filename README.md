# Contact List CRUD App

A simple Contact List application that allows users to Create, Read, Update, and Delete contacts. This project is built using React for the frontend and a backend service to handle CRUD operations.

## Features

- **Create Contact**: Add new contacts to the list.
- **Read Contacts**: View the list of all contacts.
- **Update Contact**: Edit the details of existing contacts.
- **Delete Contact**: Remove contacts from the list.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask (Python)
- **Database**: SQLite

## Getting Started

### Prerequisites

- Node.js and npm (for frontend)
- Python and Flask (for backend)
- (Database) - SQLlite

### Installation

#### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd contact_form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

#### Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Set up a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask server:
   ```bash
   python app.py
   ```

### Usage

1. Open your browser and navigate to `http://localhost:3000` for the frontend.
2. Use the application to manage your contacts.

### API Endpoints

- **POST** `/contacts` - Create a new contact
- **PATCH** `/update_contact/:id` - Update an existing contact
- **DELETE** `/delete_contact/:id` - Delete a contact
- **GET** `/contacts` - Fetch all contacts

### Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Contact

For any questions or feedback, please contact [Hamza Asif](mailto:hamza.asif0087@gmail.com).

---

