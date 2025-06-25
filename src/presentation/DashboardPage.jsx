import React, { useMemo } from 'react';
import { useAppointments } from '../hooks/useAppointments';
import DashboardView from './DashboardView';
import { CircularProgress, Alert } from '@mui/material';

const DashboardPage = () => {
    const { data: allAppointments, isLoading, isError } = useAppointments();

    // Memoized logic to filter and sort appointments
    const { upcoming, past } = useMemo(() => {
        if (!allAppointments) {
            return { upcoming: [], past: [] };
        }

        const now = new Date();
        const upcomingAppointments = [];
        const pastAppointments = [];

        allAppointments.forEach(appt => {
            const apptDateTime = new Date(appt.dateTime);
            if (apptDateTime > now) {
                upcomingAppointments.push(appt);
            } else {
                pastAppointments.push(appt);
            }
        });

        // Sort appointments by date
        upcomingAppointments.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
        pastAppointments.sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));

        return { upcoming: upcomingAppointments, past: pastAppointments };
    }, [allAppointments]);

    // Handle Loading State
    if (isLoading) {
        return <div className="flex justify-center items-center h-48"><CircularProgress /></div>;
    }

    // Handle Error State
    if (isError) {
        return <Alert severity="error">Failed to load appointments.</Alert>;
    }

    return <DashboardView upcoming={upcoming} past={past} />;
};

export default DashboardPage;