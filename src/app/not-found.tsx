import Link from 'next/link';
import React from 'react';

async function notFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-text-light">
      <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
      <p className="text-lg text-text-dark">Oops! The page you are looking for does not exist.</p>
      <Link href="/dashboard" legacyBehavior>
        <a className="mt-4 px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary">Go back to home</a>
      </Link>
    </div>
  );
}

export default notFound;
