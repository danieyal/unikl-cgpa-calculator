import React from 'react';
import { Link } from 'react-router-dom';

function Disclaimer() {
  return (
    <div className="container mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold mb-4">Disclaimer</h1>
      <div className="prose">
        <p>This CGPA Calculator is provided for informational purposes only. While we strive for accuracy, we cannot guarantee that the calculations are error-free or suitable for all academic institutions.</p>
        <p>Please note:</p>
        <ul>
          <li>The grading system used in this calculator may not match your institution's exact system.</li>
          <li>This tool should not be considered an official record of your academic performance.</li>
          <li>Always refer to your official academic transcript for accurate CGPA information.</li>
          <li>We are not responsible for any decisions made based on the results of this calculator.</li>
        </ul>
        <p>By using this calculator, you acknowledge that you understand and accept these limitations.</p>
      </div>
      <div className="mt-6">
        <Link to="/" className="text-blue-500 hover:text-blue-600 hover:underline">Back to Calculator</Link>
      </div>
    </div>
  );
}

export default Disclaimer;