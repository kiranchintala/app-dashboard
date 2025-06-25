import React, { useState } from 'react';
import AppointmentCard from '../components/AppointmentCard';
import EmptyState from '../components/EmptyState';


const DashboardView = ({ upcoming = [], past = [] }) => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const getTabClassName = (tabName) => {
    const isActive = activeTab === tabName;
    return `py-4 px-1 text-center border-b-2 font-medium text-sm cursor-pointer transition-colors duration-200 ease-in-out ${isActive ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcoming.length > 0 ? (
          <ul className="space-y-4 pt-8">
            {upcoming.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)}
          </ul>
        ) : (
          <EmptyState message="There are no upcoming appointments associated with your account." showBookingButton />
        );
      case 'history':
        return past.length > 0 ? (
          <ul className="space-y-4 pt-8">
            {past.map(appt => <AppointmentCard key={appt.id} appointment={appt} />)}
          </ul>
        ) : (
          <EmptyState message="You have no past appointments." />
        );
      case 'favorites':
        return <EmptyState message="Your favorite services will be shown here." />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="pb-5 border-b border-gray-200 sm:pb-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Appointments</h1>
        <p className="mt-2 text-sm text-gray-500">
          View favorites, upcoming Appointments, and history.
        </p>
        {/* Tab Navigation */}
        <div className="mt-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('favorites')} className={getTabClassName('favorites')}>
              Favorites
            </button>
            <button onClick={() => setActiveTab('upcoming')} className={getTabClassName('upcoming')}>
              Upcoming Appointments
            </button>
            <button onClick={() => setActiveTab('history')} className={getTabClassName('history')}>
              History
            </button>
          </nav>
        </div>
      </div>

      {/* Conditionally Rendered Content */}
      <div className="mt-4">
        {renderContent()}
      </div>
    </div>
  );
};

export default DashboardView;