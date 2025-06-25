import { useQuery } from '@tanstack/react-query';
import { axios } from '@mtbs/shared-lib';

const fetchAppointments = async () => {
    const { data: responseData } = await axios.get(`${process.env.API_BASE_URL}/api/v1/appointments`);

    // For debugging, it's always good to see the raw response
    console.log('Raw Appointments API Response:', responseData);

    // --- THIS IS THE FIX ---
    // First, check if the response data IS the array itself.
    if (Array.isArray(responseData)) {
        return responseData;
    }

    // As a fallback, also check for the { content: [...] } structure
    if (responseData && Array.isArray(responseData.content)) {
        return responseData.content;
    }

    // If the data is not in a recognized format, return an empty array to prevent crashes
    console.error("API response for appointments was not a recognized array format.");
    return [];
};

export const useAppointments = () => {
    return useQuery({
        queryKey: ['appointments'],
        queryFn: fetchAppointments,
    });
};