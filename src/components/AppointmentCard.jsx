import React from 'react';

const AppointmentCard = ({ appointment }) => (
    <li className="border p-4 rounded-lg shadow-sm bg-white">
        <div className="flex justify-between items-center">
            <div>
                <p className="font-bold text-purple-700">
                    {appointment.services && appointment.services.length > 0
                        ? appointment.services.map(s => s.name).join(', ')
                        : 'General Appointment'
                    }
                </p>
                <p className="text-sm text-gray-600">
                    {new Date(appointment.dateTime).toLocaleString('en-US', {
                        dateStyle: 'full',
                        timeStyle: 'short',
                    })}
                </p>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${appointment.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                {appointment.status}
            </span>
        </div>
    </li>
);

export default AppointmentCard;