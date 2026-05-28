import API, { authAPI } from "./api";

const PROFILE_ENDPOINT = "/profile";

export const getProfile = async () => {
  return await authAPI.get(PROFILE_ENDPOINT);
};

export const getPublicProfile = async () => {
  return await API.get(`${PROFILE_ENDPOINT}/public`);
};

export const saveProfile = async (profile, files) => {
  const formData = new FormData();

  formData.append("fullName", profile.fullName);
  formData.append("email", profile.email || "");
  formData.append("mobile", profile.mobile || "");
  formData.append("about", profile.about);
  formData.append("experience", profile.experience);
  formData.append("githubUrl", profile.githubUrl);
  formData.append("linkedinUrl", profile.linkedinUrl);

  profile.skills.forEach((skill) => {
    formData.append("skills", skill);
  });

  if (files.profileImage) {
    formData.append("profileImage", files.profileImage);
  }

  if (files.resume) {
    formData.append("resume", files.resume);
  }

  return await authAPI.put(`${PROFILE_ENDPOINT}/save`, formData);
};
