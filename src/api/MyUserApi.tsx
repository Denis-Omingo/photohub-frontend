import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from "@/redux/user/userSlice";
import { toast } from "sonner";
import { User } from "@/types";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "@/redux/users/allUsersSlice";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//Get current user
export const useGetMyUser=()=>{

    const getMyUserRequest=async():Promise<User>=>{
        const token = localStorage.getItem("auth_token");
        if (!token) throw new Error("Authentication token is missing");
        

        const response=await fetch(`${API_BASE_URL}/api/user`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${token}`,
                "Content-Type":"application/json",
            },
        });
    

        if(!response.ok){
            throw new Error("Failed to fetch user");
            
        }
        return response.json();
    }

    const{data:currentUser,isLoading,error}=useQuery("fetchCurrentUser",getMyUserRequest)
    if(error){
        toast.error(error.toString());
    }
    return {currentUser,isLoading};
};


type CreateUserRequest = { user: User; token: string };
type CreateUserResponse = User;

export const useCreateMyUser=() =>{ 
    const dispatch = useDispatch();

    const createMyUserRequest = async ({ user }: CreateUserRequest): Promise<CreateUserResponse> => {
        const { email} = user;

        if (!email ) {
            throw new Error("Missing required fields: email and name are mandatory.");
        }
        const response = await fetch(`${API_BASE_URL}/api/user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(user), 
        });
       
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to create user");
        }

        const data = await response.json();
        console.log("Response: ", data)
        localStorage.setItem("auth_token", data.token); // Store token securely

        return data.user;
    };

    const mutation = useMutation<CreateUserResponse, Error, CreateUserRequest>(createMyUserRequest, {
        onSuccess: (user) => {
            dispatch(signInSuccess(user));
            toast.success("Signed in successfully!");
        },
        onError: (error) => {
            dispatch(signInFailure(error.message));
            toast.error(error.message);
        },
    });

    return {
        createUser: mutation.mutateAsync, //  Ensure function reference is stable
        isLoading: mutation.isLoading, 
        isError: mutation.isError, 
        error: mutation.error,
    };
}

export default useCreateMyUser;

type UpdateMyUserRequest = {
    name: string;
    userName: string;
    addressLine1: string;
    city: string;
    country: string;
};

export const useUpdateMyUser = () => {
  const dispatch = useDispatch();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest): Promise<User> => {
    const token = localStorage.getItem("auth_token");
    if (!token) throw new Error("Authentication token is missing");

    dispatch(updateUserStart()); 

    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    console.log("Request Payload:", formData);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user");
    }

    const data = await response.json();
    console.log("Updated User Response:", data);

    if (!data.user) {
      throw new Error("Invalid response format: 'user' field missing.");
    }

    return data.user; 
  };

  const mutation = useMutation(updateMyUserRequest, {
    onSuccess: (user) => {
      dispatch(updateUserSuccess(user)); 
      toast.success("User updated successfully!");
    },
    onError: (error: any) => {
      console.error("Update failed:", error);
      dispatch(updateUserFailure(error.message));
      toast.error(error.message);
    },
  });

  return {
    updateUser: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    isError: mutation.isError,
    error: mutation.error,
  };
};

 export const useFetchAllUsers = () => {
   const dispatch = useDispatch();
 

   const { allUsers: users, loading: isLoading, error: isError } = useSelector(
     (state: any) => state.allUsers
   );
 
 
   const fetchUsers = async (): Promise<User[]> => {
     const token = localStorage.getItem("auth_token");
     if (!token) throw new Error("Authentication token is missing");
 
     dispatch(fetchUsersStart());
 
     try {
       const response = await fetch(`${API_BASE_URL}/api/user/all-users`, {
         method: "GET",
         headers: {
           Authorization: `Bearer ${token}`,
           "Content-Type": "application/json",
         },
       });
 
       if (!response.ok) {
         throw new Error("Failed to fetch users");
       }
 
       const data = await response.json();
       console.log("API Response:", data); // Debugging step
 
       const fetchedUsers = Array.isArray(data) ? data : data.users;
 
       if (!fetchedUsers) {
         throw new Error("Invalid response format: 'users' field missing.");
       }
 
       dispatch(fetchUsersSuccess(fetchedUsers)); // Dispatch success action
       return fetchedUsers;
     } catch (error: any) {
       dispatch(fetchUsersFailure(error.message)); // Dispatch failure action
       throw error;
     }
   };
 
   // Use React Query to manage fetching
   useQuery({
     queryKey: ["fetchUsers"],
     queryFn: fetchUsers,
     retry: 1,
     enabled: users.length === 0, // Fetch only if users are empty
   });
 
   return {
     users,
     isLoading,
     isError,
   };
 };
 



  

