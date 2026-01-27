import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import Swal from 'sweetalert2';

function useLogout() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useAuth();

    const logout = async () => {
        // Show confirmation dialog
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to logout?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, logout',
            cancelButtonText: 'Cancel',
            background: '#1e293b',
            color: '#f1f5f9',
            customClass: {
                popup: 'rounded-lg'
            }
        });

        // If user confirmed, proceed with logout
        if (result.isConfirmed) {
            setLoading(true);
            try {
                const url = "http://localhost:5003/api/users/logout";
                await axios.post(url, {}, {
                    withCredentials: true
                });

                // Clear localStorage
                localStorage.removeItem("Chatify");
                
                // Clear auth state
                setAuthUser(null);

                // Show success message
                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#1e293b',
                    color: '#f1f5f9'
                });

                // Redirect to login page
                navigate("/login");
            } catch (error) {
                console.log("Error during logout:", error?.message);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to logout. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#3b82f6',
                    background: '#1e293b',
                    color: '#f1f5f9'
                });
            } finally {
                setLoading(false);
            }
        }
    };

    return { logout, loading };
}

export default useLogout;
