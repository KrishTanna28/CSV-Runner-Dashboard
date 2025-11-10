# CSV Runner Dashboard

A modern, interactive web application built with Next.js and shadcn/ui for analyzing running data from CSV files. Upload your running logs and get instant visualizations, metrics, and insights.

## Project Overview

**Challenge**: CSV Runner Dashboard  
**Built With**: Next.js 16 (App Router), React, shadcn/ui, Recharts, TailwindCSS, PapaParse

This application allows users to upload CSV files containing running data (date, person, miles) and provides:
- Comprehensive data validation with detailed error reporting
- Beautiful, interactive visualizations (line charts, bar charts, pie charts)
- Overall and per-person statistical analysis
- Responsive design that works on all devices
- Accessible UI with proper ARIA labels and keyboard navigation

## Assumptions

1. **CSV Format**: The CSV file must contain exactly three columns with headers: `date`, `person`, and `miles` (case-insensitive).
2. **Date Format**: Dates can be in multiple formats (YYYY-MM-DD, MM/DD/YYYY, or any valid JavaScript Date string).
3. **Miles Value**: Miles must be a positive number. Values over 200 miles trigger a warning but are still accepted.
4. **Data Quality**: Empty rows are automatically skipped. Invalid rows are reported with specific error messages.
5. **Browser Support**: Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge).
6. **Client-Side Processing**: All CSV parsing and processing happens in the browser for privacy and speed.

## Prerequisites

- **Node.js**: Version 18.17 or higher (tested with Node 18.x and 20.x)
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Modern Web Browser**: Chrome, Firefox, Safari, or Edge (latest versions)
- **Operating System**: Windows, macOS, or Linux

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- React 19
- shadcn/ui components
- Recharts for visualizations
- PapaParse for CSV parsing
- TailwindCSS for styling
- Lucide React for icons

### 2. Environment Configuration

This project does not require any environment variables or API keys. All processing is done client-side.

**No `.env` file needed** - The application works out of the box!

### 3. Seed Data

A sample CSV file is included at `/public/sample-running-data.csv` with 30 days of running data for 4 different runners. You can use this to test the application immediately.

## Run & Verify

### Development Mode

```bash
npm run dev
```

The application will start at [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm start
```

The optimized production build will run at [http://localhost:3000](http://localhost:3000)

### Linting

```bash
npm run lint
```

## Step-by-Step Verification

### 1. Upload Valid CSV

1. Open the application at `http://localhost:3000`
2. Click "Choose File" button
3. Select the sample CSV from `/public/sample-running-data.csv`
4. **Expected Result**: Dashboard appears with visualizations and metrics

### 2. View Overall Statistics

1. After uploading, you should see the "Overall Statistics" tab (default view)
2. **Verify**:
   - Four metric cards showing: Total Miles, Average Miles, Total Runs, Unique Runners
   - Range statistics showing minimum and maximum miles
   - Line chart displaying "Miles Over Time"
   - Bar chart showing "Miles by Runner"
   - Pie chart showing "Distribution by Runner"

### 3. View Per-Person Analysis

1. Click the "Per-Person Analysis" tab
2. **Verify**:
   - Runner selection buttons at the top
   - Four metric cards for the selected runner (Total, Average, Min, Max)
   - Line chart showing the runner's progress over time
   - Comparison table showing all runners' statistics

### 4. Test CSV Validation - Missing Headers

1. Create a CSV file without proper headers:
   ```csv
   2024-01-01,John,5.2
   ```
2. Upload this file
3. **Expected Result**: Error message stating "Missing required columns: date, person, miles"

### 5. Test CSV Validation - Invalid Data Types

1. Create a CSV with invalid miles value:
   ```csv
   date,person,miles
   2024-01-01,John Doe,abc
   ```
2. Upload this file
3. **Expected Result**: Error message "Row 2, miles: Invalid miles value: 'abc'. Must be a number"

### 6. Test CSV Validation - Negative Miles

1. Create a CSV with negative miles:
   ```csv
   date,person,miles
   2024-01-01,John Doe,-5.2
   ```
2. Upload this file
3. **Expected Result**: Error message "Row 2, miles: Miles cannot be negative: -5.2"

### 7. Test CSV Validation - Invalid Date

1. Create a CSV with invalid date:
   ```csv
   date,person,miles
   invalid-date,John Doe,5.2
   ```
2. Upload this file
3. **Expected Result**: Error message "Row 2, date: Invalid date format"

### 8. Test Empty CSV

1. Create an empty CSV or CSV with only headers
2. Upload this file
3. **Expected Result**: Error or empty state message

### 9. Test Reset Functionality

1. After uploading a valid CSV
2. Click "Upload New File" button
3. **Expected Result**: Returns to upload screen, ready for new file

### 10. Test Responsive Design

1. Resize browser window to mobile size (< 768px)
2. **Verify**:
   - Layout adjusts to single column
   - Charts remain readable
   - All buttons and controls are accessible
   - No horizontal scrolling

## Features & Limitations

### ✅ Implemented Features

- **CSV Upload & Parsing**
  - Drag-and-drop or click to upload
  - Supports .csv files
  - Case-insensitive header matching
  - Multiple date format support

- **Data Validation**
  - Header validation (checks for required columns)
  - Type validation (date, string, number)
  - Range validation (negative numbers, unrealistic values)
  - Detailed error reporting with row and field information

- **Visualizations**
  - Line chart: Miles over time (overall)
  - Bar chart: Total miles by runner
  - Pie chart: Distribution of miles by runner
  - Line chart: Individual runner progress over time

- **Metrics Calculation**
  - Overall: Total miles, average, min, max, total runs, unique runners
  - Per-person: Total miles, average, min, max, run count
  - All metrics computed accurately with proper rounding

- **User Interface**
  - Modern, clean design with shadcn/ui components
  - Responsive layout (mobile, tablet, desktop)
  - Dark mode support
  - Loading states
  - Error states with helpful messages
  - Empty states

- **Accessibility**
  - Semantic HTML
  - ARIA labels on interactive elements
  - Keyboard navigation support
  - Focus indicators
  - Screen reader friendly
  - Proper color contrast ratios

### ⚠️ Known Limitations

1. **File Size**: Large CSV files (>10,000 rows) may cause performance issues as processing is done client-side
2. **Browser Storage**: No data persistence - uploaded data is lost on page refresh
3. **Export**: No ability to export processed data or charts
4. **Date Range Filtering**: Cannot filter data by date range
5. **Comparison**: Cannot compare multiple CSV files side-by-side
6. **Advanced Analytics**: No trend analysis, predictions, or pace calculations

### 🚀 Future Improvements

- Add data persistence using localStorage or IndexedDB
- Implement date range filtering
- Add export functionality (PDF, PNG, CSV)
- Support for additional metrics (pace, elevation, heart rate)
- Multi-file comparison view
- Advanced analytics and trend predictions
- User accounts and cloud storage
- Mobile app version
- Real-time collaboration features

## Architecture & Technical Details

### Folder Structure

```
csv-runner-dashboard/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with fonts
│   ├── page.js                   # Main page with upload UI
│   └── globals.css               # Global styles and Tailwind
├── components/                   # React components
│   ├── Dashboard.js              # Main dashboard container
│   ├── OverallView.js            # Overall statistics view
│   ├── PersonView.js             # Per-person analysis view
│   └── ui/                       # shadcn/ui components
│       ├── alert.js
│       ├── button.js
│       ├── card.js
│       ├── input.js
│       ├── label.js
│       ├── table.js
│       └── tabs.js
├── lib/                          # Utility functions
│   ├── csvParser.js              # CSV parsing and validation
│   ├── metricsCalculator.js      # Metrics computation
│   └── utils.js                  # Helper functions
├── public/                       # Static assets
│   └── sample-running-data.csv   # Sample CSV file
├── package.json                  # Dependencies
└── README.md                     # This file
```

### Key Components

#### `app/page.js`
- Main entry point
- Handles file upload
- Manages application state (data, errors, loading)
- Conditionally renders upload UI or dashboard

#### `components/Dashboard.js`
- Container for analytics views
- Manages tab navigation (Overall vs Per-Person)
- Displays file information and reset button

#### `components/OverallView.js`
- Displays aggregate statistics across all runners
- Renders multiple chart types (line, bar, pie)
- Shows metric cards with icons

#### `components/PersonView.js`
- Individual runner selection and analysis
- Per-runner metrics and progress chart
- Comparison table for all runners

#### `lib/csvParser.js`
- CSV file parsing using PapaParse
- Comprehensive validation logic
- Error collection and reporting
- Data normalization

#### `lib/metricsCalculator.js`
- Statistical calculations (sum, average, min, max)
- Data aggregation by person and date
- Sorting and formatting utilities

### State Management

- **Local Component State**: Using React's `useState` hook
- **No Global State**: Application is simple enough to not require Redux/Context
- **Data Flow**: Unidirectional (parent to child via props)

### Data Processing Approach

1. **Upload**: User selects CSV file
2. **Parse**: PapaParse converts CSV to JavaScript objects
3. **Validate**: Custom validation checks headers and data types
4. **Transform**: Data normalized (dates formatted, numbers parsed)
5. **Calculate**: Metrics computed from validated data
6. **Render**: Charts and tables display processed data

### Performance Considerations

- **Client-Side Processing**: No server required, instant feedback
- **Memoization**: Could be added for large datasets
- **Lazy Loading**: Charts only render when tab is active
- **Responsive Charts**: Recharts handles resizing efficiently

## Accessibility & UI

### Accessibility Features

1. **Semantic HTML**
   - Proper heading hierarchy (h1, h2, h3)
   - Semantic elements (main, section, article)
   - Form labels associated with inputs

2. **ARIA Labels**
   - `role="alert"` for error messages
   - `aria-label` on icon buttons
   - `aria-describedby` for form fields

3. **Keyboard Navigation**
   - All interactive elements are keyboard accessible
   - Logical tab order
   - Focus indicators visible
   - Enter/Space activate buttons

4. **Screen Reader Support**
   - Descriptive labels on all inputs
   - Error messages announced
   - Chart data accessible via tables

5. **Color Contrast**
   - WCAG AA compliant contrast ratios
   - Text readable on all backgrounds
   - Dark mode support with proper contrast

### UI/UX Design Decisions

1. **Typography**
   - Geist Sans for body text (clean, modern)
   - Geist Mono for code/data (monospace)
   - Clear hierarchy with font sizes and weights

2. **Spacing**
   - Consistent padding and margins using Tailwind scale
   - Adequate white space for readability
   - Responsive spacing (smaller on mobile)

3. **Color Palette**
   - Blue: Primary actions and data
   - Purple: Secondary data and accents
   - Orange/Red: Warnings and errors
   - Green: Success and positive metrics
   - Slate: Neutral backgrounds and text

4. **Layout**
   - Card-based design for content grouping
   - Grid system for responsive layouts
   - Sticky header for navigation
   - Maximum width for readability

5. **Interactions**
   - Hover states on all interactive elements
   - Loading states during processing
   - Smooth transitions and animations
   - Immediate feedback on actions

6. **Error Handling**
   - Inline validation messages
   - Clear error descriptions
   - Suggestions for fixing issues
   - Non-blocking errors when possible

## Testing Checklist

- [x] CSV upload works with valid file
- [x] Error shown for missing headers
- [x] Error shown for invalid date format
- [x] Error shown for non-numeric miles
- [x] Error shown for negative miles
- [x] Overall metrics calculated correctly
- [x] Per-person metrics calculated correctly
- [x] Line chart displays correctly
- [x] Bar chart displays correctly
- [x] Pie chart displays correctly
- [x] Tab navigation works
- [x] Runner selection works
- [x] Reset button returns to upload screen
- [x] Responsive design on mobile
- [x] Responsive design on tablet
- [x] Responsive design on desktop
- [x] Dark mode works correctly
- [x] Keyboard navigation works
- [x] Screen reader accessible

## Technology Stack

- **Framework**: Next.js 16 (App Router, React Server Components)
- **Language**: JavaScript (ES6+)
- **UI Library**: React 19
- **Component Library**: shadcn/ui (Radix UI primitives)
- **Styling**: TailwindCSS 4
- **Charts**: Recharts
- **CSV Parsing**: PapaParse
- **Icons**: Lucide React
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is created for the Daynt Tech Services LLP internship assignment.

## Author

Created as part of the Daynt Tech Services LLP technical assessment.

---

**Note**: This is a demonstration project showcasing modern web development practices, clean code architecture, and attention to detail in both functionality and user experience.
