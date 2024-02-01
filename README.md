# Monokera WebTest - FullStack

## Description

This is a FullStack project using Next.js 14 with app routing.

## Project Structure

```bash
$ tree "monokera-web"
monokera-web
├── app
│ ├── policy
│ │ ├── [number]
│ │ └── layout
│ └── page.tsx
├── components
│ ├── Pagination
│ ├── Policies
│ ├── PolicySearch

├── mocks (Test mocks)
├── types (Types and interfaces)
├── utils (Function utils)
└── config (Constants)
```

## Local Development and Run Local

Make sure to create a `.env` file. You can use `.env.example` as a template.

1. Backend Project:

   - Run the backend project (`sg-policy-service`) on port `3000` `locahost:3000` by default.

2. Web Project:

   - Create `.env` file or copy from `.env.example` file to setup environment variables.

   - Run the web project on port 3001 using the following commands:

     ```bash
     npm install

     npm run dev
     # or
     turbo dev
     ```

   - Access the project at `http://localhost:3001`.

## Running Tests

Execute the following command to run tests:

```bash
npm run test
```

### Tests include:

- ./**tests**/pagination.test.tsx
- ./**tests**/policyList.test.tsx
- ./**tests**/policyDetails.test.tsx

## Future Improvements

Here are some potential improvements for the project:

### Pending Feature: Policy Creation Page

#### Overview

The policy creation page is a pending feature that needs to be implemented. This page is crucial for users to be able to create new insurance policies with specific details.

#### Requirements

The policy creation form should include fields for setting the policy's effective dates, holder information, insureds, and coverages.
Ensure that the effective start date is always greater than the current date; otherwise, display an error.
Validate that the end date is greater than the start date.
Each policy must have at least one insured, one coverage, and a policyholder.
