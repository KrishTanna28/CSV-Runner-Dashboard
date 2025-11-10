# Quick Setup Guide

## Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd csv-runner-dashboard
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Mode
```bash
npm run build
npm start
```

## Testing with Sample Data

1. Start the development server
2. Open the application in your browser
3. Click "Choose File"
4. Navigate to `/public/sample-running-data.csv`
5. Upload the file
6. Explore the visualizations and metrics!

## No Environment Variables Required

This application runs entirely in the browser with no backend services or API keys needed.

## Troubleshooting

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
npm run dev -- -p 3001
```

### Dependencies Installation Failed
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Build Errors
Make sure you're using Node.js 18.17 or higher:
```bash
node --version
```

## Need Help?

Check the main README.md for detailed documentation.
