import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { profileServices } from "../../services/profile.service";
import ProfileForm from "../../screen/profile/components/ProfileForm";

const Profile = () => {
  const [userProfileData, setUserProfileData] = useState(null);
  const { user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileServices.getMyProfile(user?._id);
        setUserProfileData(response?.data);
      } catch (err) {
        // Error handled silently
      }
    };

    if (user?._id) fetchProfile();
  }, [user]);


  const handleUpdateProfile = async (data) => {
    try {
      const response = await profileServices.updateProfile(user?._id, data);
      setUserProfileData(response?.data);
    } catch (err) {
      throw err;
    }
  };


  if (!userProfileData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-6">
        <div className="h-32 w-32 rounded-full bg-slate-300 animate-pulse"></div>
        <div className="h-6 w-48 bg-slate-300 rounded animate-pulse"></div>
        <div className="h-4 w-64 bg-slate-300 rounded animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="h-48 bg-slate-900 relative flex justify-center items-center">
          <img
            src={
              userProfileData?.imageUrl ||
              "https://via.placeholder.com/150"
            }
            className="h-32 w-32 rounded-full border-4 border-white absolute -bottom-16 shadow-xl"
            alt="profile"
          />
        </div>

        {/* Content */}
        <div className="pt-20 pb-12 px-8 text-center space-y-6">

          <h1 className="text-3xl font-bold text-slate-800">
            {userProfileData?.name}
          </h1>

          <p className="text-gray-500 max-w-lg mx-auto">
            {userProfileData?.bio ||
              "Add your bio to make your profile more attractive ✨"}
          </p>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-5 mt-8">

            <div className="bg-slate-50 p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold break-words">
                {userProfileData?.email}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-semibold">
                {userProfileData?.phone || "Add phone"}
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Role</p>
              <p className="font-semibold">
                {userProfileData?.role}
              </p>
            </div>

          </div>

          {/* Edit Button */}
          <button
            onClick={() => setOpenEdit(true)}
            className="mt-10 px-10 py-3 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition shadow-lg"
          >
            Edit Profile
          </button>

        </div>
      </div>

      {/* ⭐ Profile Edit Modal */}
      {openEdit && (
        <ProfileForm
          setOpenProfile={setOpenEdit}
          onUpdate={handleUpdateProfile}
          defaultValues={userProfileData}
        />
      )}

    </div>
  );
};

export default Profile;