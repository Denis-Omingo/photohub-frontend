import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import AuthButton from "../src/components/GoogleAuthButton";
import { Provider } from "react-redux";
import { store } from "../src/redux/store"; // Replace with your actual store import
import { signInStart, signInSuccess, signInFailure } from "../src/redux/user/userSlice";

// Mocks
vi.mock("@/api/MyUserApi", () => ({
    useCreateMyUser: () => ({
        createUser: vi.fn(),
        isLoading: false,
    }),
}));

vi.mock("firebase/auth", () => ({
    getAuth: vi.fn(),
    GoogleAuthProvider: vi.fn(),
    signInWithPopup: vi.fn(),
}));

describe("AuthButton", () => {
    it("renders the button with children text", () => {
        render(
            <Provider store={store}>
                <AuthButton>Sign in with Google</AuthButton>
            </Provider>
        );

        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
    });

    it("should call signInWithPopup when clicked and dispatch success on success", async () => {
        const signInWithPopupMock = vi.fn().mockResolvedValueOnce({
            user: {
                email: "test@example.com",
                displayName: "Test User",
                getIdToken: vi.fn().mockResolvedValue("token"),
            },
        });

        vi.mocked(require("firebase/auth").signInWithPopup).mockImplementation(signInWithPopupMock);

        const createUserMock = vi.fn().mockResolvedValueOnce({});
        vi.mocked(require("@/api/MyUserApi").useCreateMyUser).mockReturnValue({
            createUser: createUserMock,
            isLoading: false,
        });

        const dispatch = vi.fn();
        const wrappedComponent = (
            <Provider store={{ ...store, dispatch }}>
                <AuthButton>Sign in with Google</AuthButton>
            </Provider>
        );

        render(wrappedComponent);

        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);

        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith(signInStart());
            expect(createUserMock).toHaveBeenCalled();
            expect(dispatch).toHaveBeenCalledWith(
                signInSuccess({
                    email: "test@example.com",
                    name: "Test User",
                    userName: "",
                    addressLine1: "",
                    city: "",
                    country: "",
                })
            );
        });
    });

    it("should handle error and dispatch signInFailure", async () => {
       
        const signInWithPopupMock = vi.fn().mockRejectedValueOnce(new Error("Google sign-in failed"));
    
      
        vi.mock("firebase/auth", () => ({
            ...vi.importActual("firebase/auth"), 
            signInWithPopup: signInWithPopupMock, 
        }));
    
        const dispatch = vi.fn();
        const wrappedComponent = (
            <Provider store={{ ...store, dispatch }}>
                <AuthButton>Sign in with Google</AuthButton>
            </Provider>
        );
    
        render(wrappedComponent);
    
        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);
    
        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith(signInStart());
            expect(dispatch).toHaveBeenCalledWith(signInFailure("Google sign-in failed"));
        });
    });
    

    it("should disable the button when signing in", async () => {
        const dispatch = vi.fn();
        render(
            <Provider store={{ ...store, dispatch }}>
                <AuthButton>Sign in with Google</AuthButton>
            </Provider>
        );

        const button = screen.getByText("Sign in with Google");
        fireEvent.click(button);

        await waitFor(() => {
            expect(button).toHaveTextContent("Sign in with Google");
        });
    });
});
