import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useAppDispatch';
import { logout } from '../features/auth/authSlice';

export const useApiError = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleError = useCallback((error: any) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const status = error.response.status;
      const message = error.response.data?.message || 'An error occurred';

      if (status === 401) {
        // Unauthorized - clear auth state and redirect to login
        dispatch(logout());
        navigate('/login');
        return 'Your session has expired. Please log in again.';
      }

      if (status === 403) {
        // Forbidden - user doesn't have permission
        return 'You do not have permission to perform this action.';
      }

      if (status === 404) {
        // Not found
        return 'The requested resource was not found.';
      }

      if (status === 500) {
        // Server error
        return 'An internal server error occurred. Please try again later.';
      }

      return message;
    }

    if (error.request) {
      // The request was made but no response was received
      return 'No response from server. Please check your internet connection.';
    }

    // Something happened in setting up the request that triggered an Error
    return error.message || 'An unexpected error occurred.';
  }, [dispatch, navigate]);

  return { handleError };
}; 