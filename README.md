# IVF Success Calculator - Setup & Run Instructions

A web application that calculates IVF success rates based on the CDC's formulas found here: https://www.cdc.gov/art/ivf-success-estimator/index.html

## Project Overview

This is a full-stack web application built with:
- Frontend: React with TypeScript
- Backend: NestJS (Node.js)

The application allows users to:
1. Input their personal data and medical history
2. Calculate their estimated IVF success rate
3. View the calculated success probability

## Installation

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone https://github.com/huhu42/IvfSuccessCalculator.git
cd IvfSuccessCalculator
```

2. Install dependencies:
```bash
npm run install:all
```

This will install dependencies for both the frontend and backend applications.

## Running the Application

### Start in Development Mode

To run both the frontend and backend concurrently:

```bash
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001

### Start Frontend Only

```bash
npm run start:frontend
```

### Start Backend Only

```bash
npm run start:backend
```

## Running Tests

To run the backend tests that verify the calculation accuracy:

```bash
npm run test:backend
```

This will execute the test suite which validates:
- All example cases from the documentation
- Formula selection logic
- BMI calculation accuracy
- Edge cases

## Building for Production

```bash
npm run build
```

This will build both the frontend and backend applications for production deployment.

## Project Structure

```
IvfSuccessCalculator/
├── frontend/             # React frontend application
│   ├── public/           # Static files
│   └── src/              # React source code
│       ├── components/   # React components
│       ├── services/     # API services
│       └── types/        # TypeScript types
│
├── backend/              # NestJS backend application
│   └── src/
│       ├── ivf-calculator/  # IVF calculator module
│       │   ├── models/      # Data models
│       │   └── services/    # Business logic
│       └── main.ts          # Application entry point
│
└── ivf_success_formulas.csv # Formula data
```

## How It Works

1. The backend loads the CDC's IVF success formulas from the CSV file
2. The frontend collects user inputs through a multi-section form
3. When the form is submitted, the data is sent to the backend API
4. The backend selects the appropriate formula based on user inputs
5. The success rate is calculated according to the CDC's methodology
6. The result is returned to the frontend and displayed to the user

## Formula Selection

The application selects from six different formulas based on:
- Whether the patient is using their own eggs
- Whether they've attempted IVF previously
- Whether they know the reason for their infertility

## Calculation Methodology

The calculation follows the methodology described in the CDC's IVF Success Estimator, including:
- BMI calculation
- Age and BMI linear and polynomial components
- Factors for various infertility reasons
- Prior pregnancy and live birth considerations