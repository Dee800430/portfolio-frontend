import  API, { authAPI } from "./api";

const CONTACT_ENDPOINT = "/contact";

export const getContacts = async () => {
  return await API.get(CONTACT_ENDPOINT);
};

export const createContact = async (contact) => {
  return await authAPI.post(CONTACT_ENDPOINT, contact);
};

export const updateContact = async (id, contact) => {
  return await authAPI.put(`${CONTACT_ENDPOINT}/${id}`, contact);
};

export const deleteContact = async (id) => {
  return await authAPI.delete(`${CONTACT_ENDPOINT}/${id}`);
};
