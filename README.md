# Grinder Grader

My dad loves the concept of "One Bite Pizza" and wants me to build a website for him to be able to rate sandwiches, so that's my goal.

## Running the Deployed Version

To access the deployed version of the app:

- **Frontend:** The web app is live at [https://grinder-grader.vercel.app/](https://grinder-grader.vercel.app/).
- **Backend:** The server is hosted at [https://grindergrader.onrender.com/](https://grindergrader.onrender.com/). You might need to click the link to start the server.

## Running Locally

If you want to run the application locally with your own database, follow these steps:

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- A MongoDB database (either locally or using a service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))

### Backend

1. **Navigate to the backend directory:**

    ```bash
    cd backend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `backend` directory with the following contents:

    ```bash
    PORT=3003
    MONGODB_URI=your-mongodb-uri
    ```

    Replace `your-mongodb-uri` with the URI of your MongoDB instance.

4. **Start the backend server:**

    ```bash
    npm start
    ```

   The backend server will start and listen on the specified port (usually `localhost:3003`).

### Frontend

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```
2. **Change to local server:**

    Change line 27 in `src\pages\BrowseRatingsPage.jsx` to:

    ```bash
    const response = await axios.get('http://localhost:3003/getallratings');
    ```

    Change line 18 in `src\pages\RateGrinderPage.jsx` to:

    ```bash
    const response = fetch('http://localhost:3003/savenewrating', {
    ```

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the frontend application:**

    ```bash
    npm start
    ```

   The frontend application will start and open in your default web browser (usually `http://localhost:3000`).
