import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "@/redux/user/userSlice";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
    userId: string;
    email: string;
    name?: string;
    addressLine1?: string;
    userName?: string;
    token?: string;
};

export const useCreateMyUser = () => {
    const dispatch = useDispatch();

    const createMyUserRequest = async (user: CreateUserRequest) => {
        const response = await fetch(`${API_BASE_URL}/api/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", //  Required for cookie-based auth
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create user");
        }

        const data = await response.json();
        return data;
    };

    return useMutation(createMyUserRequest, {
        onSuccess: (data) => {
            dispatch(signInSuccess(data)); //  Dispatch success on mutation
        },
        onError: (error: any) => {
            dispatch(signInFailure(error.message)); //  Dispatch failure on error
        },
    });
};
