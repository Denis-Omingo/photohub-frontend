
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/components/forms/user-profile-form/UserProfileForm";


const UpdateMyUserProfilePage = () => {

  const{ currentUser, isLoading:isGetLoading}=useGetMyUser();
  const { updateUser, isLoading:isUpdateLoading } = useUpdateMyUser();
  if(isGetLoading){
    return <span>Loading...</span>
  }

  if (!currentUser) {
    return <p>User not found</p>;
  }

  return (
    <div>
      <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isUpdateLoading} />
    </div>
  );
};

export default UpdateMyUserProfilePage;
