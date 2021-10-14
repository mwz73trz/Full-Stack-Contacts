const BASE_URL = "http://localhost:8000/";

const getInit = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `JWT ${token}`,
    },
  };
};

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init);
    if (response.ok) {
      console.log("status", response.status);
      if (response.status !== 204) {
        let data = await response.json();
        return data;
      } else {
        return { success: true };
      }
    }
  } catch (error) {
    console.error(":ERR:", error);
    return null;
  }
};

const doLogin = async (credentials) => {
  let url = `${BASE_URL}login/`;
  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  return await tryCatchFetch(url, init);
};

const getSubjects = async (token) => {
  let url = `${BASE_URL}api/subjects/`;
  return await tryCatchFetch(url, getInit(token));
};

const getSubjectById = async (subjectId, token) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`;
  console.log(url);
  return await tryCatchFetch(url, getInit(token));
};

const createSubject = async (newSubject, token) => {
  let url = `${BASE_URL}api/subjects/`;
  let init = getInit(token);
  init["method"] = "POST";
  init["body"] = JSON.stringify(newSubject);
  return await tryCatchFetch(url, init);
};

const deleteSubject = async (subjectId, token) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`;
  let init = getInit(token);
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const getContactById = async (contactId, token) => {
  let url = `${BASE_URL}api/contacts/${contactId}/`;
  return await tryCatchFetch(url, getInit(token));
};

const createContact = async (newContactParams, token) => {
  let url = `${BASE_URL}api/contacts/`;
  let init = getInit(token);
  init["method"] = "POST";
  init["body"] = JSON.stringify(newContactParams);
  return await tryCatchFetch(url, init);
};

const editContact = async (contactId, updatedContact, token) => {
  let url = `${BASE_URL}api/contacts/${contactId}/`;
  let init = getInit(token);
  init["method"] = "PUT";
  init["body"] = JSON.stringify(updatedContact);
  return await tryCatchFetch(url, init);
};

const deleteContact = async (contactId, token) => {
  let url = `${BASE_URL}api/contacts/${contactId}/`;
  let init = getInit(token);
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const myExport = {
  doLogin,
  getSubjects,
  getSubjectById,
  createSubject,
  deleteSubject,
  getContactById,
  createContact,
  editContact,
  deleteContact,
};

export default myExport;
