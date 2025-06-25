import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarX } from 'lucide-react';

const EmptyState = ({ message, showBookingButton = false }) => (
    <div className="text-center py-16 sm:py-24">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <CalendarX className="h-10 w-10 text-gray-400" aria-hidden="true" />
        </div>
        <p className="mt-5 text-base text-gray-600">
            {message}
        </p>
        {showBookingButton && (
            <div className="mt-6">
                <Link
                    to="/booking" // Assumes your booking page is at this route
                    className="inline-flex items-center rounded-md bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 transition-colors"
                >
                    BOOK AN APPOINTMENT
                </Link>
            </div>
        )}
    </div>
);

export default EmptyState;