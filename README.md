# PlotsCart - Plot Listing Platform

A full-stack web application for buying and selling plots of land. Built with React frontend and Spring Boot Java backend.

## Features

### 🏡 Plot Management
- **Browse Plots**: View all available plots with detailed information
- **Search & Filter**: Search plots by location, title, or keywords
- **Post New Plots**: Add your plots with multiple images and detailed information
- **Plot Details**: View comprehensive plot information with image carousel

### 💝 Wishlist System
- **Add to Wishlist**: Save interesting plots for later
- **Manage Wishlist**: View and remove plots from your wishlist
- **Wishlist Counter**: See how many plots you've saved

### 📞 Communication Features
- **Direct Phone Calls**: Click to call plot owners
- **WhatsApp Integration**: Direct WhatsApp chat with pre-filled messages
- **Owner Contact Info**: Access to plot owner details

### 🎨 Modern UI/UX
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Image Carousel**: Browse multiple plot images with navigation
- **Modern Interface**: Clean, professional design with Tailwind CSS
- **Mobile Navigation**: Bottom navigation bar for mobile devices

## Technology Stack

### Frontend (React)
- **React 18** - Modern JavaScript framework
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Responsive Design** - Mobile-first approach

### Backend (Java Spring Boot)
- **Spring Boot 2.7** - Java application framework
- **Spring Data JPA** - Database abstraction layer
- **H2 Database** - In-memory database for development
- **Spring Web** - RESTful API development
- **Spring Validation** - Input validation

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 16 or higher)
- **Java JDK** (version 8 or higher)
- **Maven** (version 3.6 or higher)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Tejakrishna4988/PlotsCart.git
cd PlotsCart
```

### 2. Backend Setup (Spring Boot)

#### Step 1: Navigate to backend directory
```bash
cd backend
```

#### Step 2: Clean and build the project
```bash
mvn clean package -DskipTests
```

#### Step 3: Run the backend server
```bash
java -jar target/plotscart-backend-0.0.1-SNAPSHOT.jar
```

**Alternative method (if above doesn't work):**
```bash
mvn spring-boot:run
```

The backend server will start on `http://localhost:8010`

**Note**: Keep this terminal open. The backend needs to keep running.

### 3. Frontend Setup (React)

#### Step 1: Open a new terminal and navigate to project root
```bash
cd /path/to/PlotsCart
```

#### Step 2: Install Node.js dependencies
```bash
npm install
```

#### Step 3: Start the React development server
```bash
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000` or `http://localhost:3001`

## Quick Start Commands

### For first-time setup:
```bash
# 1. Clone and navigate to project
git clone https://github.com/Tejakrishna4988/PlotsCart.git
cd PlotsCart

# 2. Setup backend (Terminal 1)
cd backend
mvn clean package -DskipTests
java -jar target/plotscart-backend-0.0.1-SNAPSHOT.jar

# 3. Setup frontend (Terminal 2 - new terminal)
cd /path/to/PlotsCart
npm install
npm start
```

### For subsequent runs:
```bash
# Terminal 1: Start backend
cd backend
java -jar target/plotscart-backend-0.0.1-SNAPSHOT.jar

# Terminal 2: Start frontend
npm start
```

## Troubleshooting

### Backend Issues:
- **Port 8010 already in use**: Kill existing process with `lsof -ti:8010 | xargs kill -9`
- **Java version error**: Make sure you have Java 8 or higher installed
- **Maven not found**: Install Maven or use `./mvnw` instead of `mvn`

### Frontend Issues:
- **Port 3000 already in use**: The app will automatically use port 3001
- **npm command not found**: Install Node.js from https://nodejs.org/
- **Dependencies error**: Delete `node_modules` and run `npm install` again

### Database Access:
- **H2 Console**: Visit `http://localhost:8010/api/h2-console`
  - JDBC URL: `jdbc:h2:mem:plotscart`
  - Username: `sa`
  - Password: `password`

## API Endpoints

### Plot Management
- `GET /api/plots` - Get all active plots
- `GET /api/plots/{id}` - Get plot by ID
- `POST /api/plots` - Create new plot
- `PUT /api/plots/{id}` - Update plot
- `DELETE /api/plots/{id}` - Deactivate plot
- `GET /api/plots?search={keyword}` - Search plots
- `GET /api/plots?location={location}` - Filter by location

### Wishlist Management
- `GET /api/wishlist?userId={userId}` - Get user wishlist
- `POST /api/wishlist/{plotId}?userId={userId}` - Add to wishlist
- `DELETE /api/wishlist/{plotId}?userId={userId}` - Remove from wishlist
- `GET /api/wishlist/check/{plotId}?userId={userId}` - Check wishlist status

## Application Structure

```
PlotsCart/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/plotscart/
│   │       ├── PlotsCartApplication.java
│   │       ├── config/      # Configuration classes
│   │       ├── controller/  # REST controllers
│   │       ├── model/       # Entity classes
│   │       ├── repository/  # Data repositories
│   │       └── service/     # Business logic
│   └── pom.xml
├── src/                     # React frontend
│   ├── components/          # React components
│   │   ├── PlotsList.js
│   │   ├── PostPlot.js
│   │   ├── PlotDetails.js
│   │   └── Wishlist.js
│   ├── App.js              # Main App component
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Usage Guide

### 1. Browsing Plots
- Visit the homepage to see all available plots
- Use the search bar to find specific plots
- Click on any plot card to view detailed information
- Use the heart icon to add/remove plots from your wishlist

### 2. Posting a Plot
- Click "Post Plot" in the navigation
- Fill in all required information:
  - Plot title and description
  - Dimensions and location
  - Price and owner details
  - Contact information
  - Image URLs (at least one required)
- Submit the form to list your plot

### 3. Contacting Owners
- View plot details to see owner information
- Click the phone icon to call directly
- Click the WhatsApp button for instant messaging
- WhatsApp messages include pre-filled plot information

### 4. Managing Wishlist
- Click the heart icon on any plot to add to wishlist
- Visit the "Wishlist" page to see all saved plots
- Remove plots from wishlist using the trash icon

## Sample Data

The application includes sample plot data with:
- **Plot 1**: Prime Commercial Plot in BTM Layout (₹45 Lakhs)
- **Plot 2**: Residential Plot near Electronic City (₹32 Lakhs)
- **Plot 3**: Agricultural Land in Mysore Road (₹25 Lakhs)

All sample plots use the phone number `7780270405` for demonstration.

## Database

- **Development**: H2 in-memory database
- **Console**: Access at `http://localhost:8010/api/h2-console`
  - JDBC URL: `jdbc:h2:mem:plotscart`
  - Username: `sa`
  - Password: `password`

## Development Notes

### CORS Configuration
The backend is configured to accept requests from `http://localhost:3000` and `http://localhost:3001` for development.

### Image Handling
Currently uses image URLs. In production, consider implementing:
- File upload functionality
- Cloud storage integration (AWS S3, Cloudinary)
- Image optimization and resizing

### Authentication
Currently uses a simple "guest" user system. For production:
- Implement user registration/login
- Add JWT authentication
- User-specific wishlists and plot management

## Production Deployment

### Backend Deployment
1. Configure production database (PostgreSQL/MySQL)
2. Update `application.yml` for production settings
3. Build JAR file: `mvn clean package`
4. Deploy to cloud service (AWS, Heroku, etc.)

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to static hosting (Netlify, Vercel, AWS S3)
3. Update API base URL for production backend

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support or questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Happy Plot Hunting! 🏡**
