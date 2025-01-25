# Along9ja

## DESCRIPTION

Along9ja App is a mobile and web-based application designed to solve navigation challenges for public transport passengers in Nigerian cities.
The app provides detailed, crowdsourced directions for getting from point A to B via public transportation.
With features like route recommendations, safety alerts, real-time updates, and AI-powered personalized suggestions,
this platform enhances urban mobility while prioritizing user safety and convenience.

## Features

- **Route Recommendations**: Discover the best public transport routes for your journey.
- **Real-Time Updates**: Stay informed with live traffic and safety alerts.
- **Crowdsourced Data**: Leverage contributions from other users for accurate and current route information.
- **Personalized Suggestions**: AI-driven recommendations tailored to your preferences and travel history.
- **Safety Alerts**: Alerts about potentially risky areas or incidents along the route.
- **Customized Routes**: Planning an event, create route directions for your guests.

---

## Installation

### Prerequisites

Ensure you have the following installed on your system:

- **Node.js** (v16.x or higher)
- **MongoDB** (or access to a hosted MongoDB instance)
- **React** (for Web development)

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/cherishegoyibo/along9ja.git
   cd along9ja/backend

   ```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add environment variables:

```plaintext
PORT=5500   # The port your backend server will run on
MONGO_URI=your-mongodb-connection-string # MongoDB connection string
JWT_SECRET=your-secret-key       # A secret key for signing and verifying JSON Web Tokens (JWTs)
GOOGLE_MAPS_API_KEY=your-google-maps-api-key # API key for Google Maps integration
```

4. Start the server:

```bash
npm start
```

### Frontend Setup (Web)

### Frontend Setup (Web)

1. Navigate to the root directory:

```bash
cd along9ja
```

2. Download and install [Node](http://nodejs.org/)

3. Run the following command in the command line to install dependencies:

```bash
npm install
```

4. Install Vite (if not already included in your dependencies):

```bash
npm install vite
```

5. Install Webpack (if not already included in your dependencies):

```bash
npm install webpack webpack-cli --save-dev
```

6. Now that you have everything installed, run

```bash
npm run dev
```

inside the root directory to start development server.

## Architecture

The application follows a modern, modular architecture to ensure scalability and maintainability.

- Frontend: React.js and JSX (web) for intuitive user interfaces.
- Backend: Node.js with Express.js for API handling and business logic.
- Database: MongoDB for storing route data, user contributions, and app metadata.
- Third-Party APIs: Google Maps API for mapping and route visualization.

## Contributing

We welcome contributions to the project! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Implement your feature or fix and commit:

```bash
git commit -m "Add your message here"
```

4. Push your changes to your branch:

```bash
git push origin feature/your-feature-name
```

5. Submit a pull request to merge your changes into the main branch.

## Challenges

1. Integrating Google Maps API and ensuring compliance with its terms of use.
2. Scaling the backend to handle real-time updates and high user traffic.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributors

- [Mathias Owa Martins](https://github.com/montybasquiart) - Frontend Engineer
- [OSIGWE EZECHIMEREM EBENEZER](https://github.com/Ebnen) - Backend Engineer
- [Cher](https://github.com/cherishegoyibo) - Frontend Engineer
- [Femi](https://github.com/megafemworld) - Backend Engineer
