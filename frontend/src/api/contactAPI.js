const BASE_URL = "http://localhost:8000/";

const getInit = () => {
  return {
    headers: {
      "Content-Type": "application/json",
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

const getSubjects = async () => {
  let url = `${BASE_URL}api/subjects/`;
  return await tryCatchFetch(url, getInit());
};

const getSubjectById = async (subjectId) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`;
  console.log(url);
  return await tryCatchFetch(url, getInit());
};

const createSubject = async (newSubject) => {
  let url = `${BASE_URL}api/subjects/`;
  let init = getInit();
  init["method"] = "POST";
  init["body"] = JSON.stringify(newSubject);
  return await tryCatchFetch(url, init);
};

const deleteSubject = async (subjectId) => {
  let url = `${BASE_URL}api/subjects/${subjectId}/`;
  let init = getInit();
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const getContactById = async (contactId) => {
  let url = `${BASE_URL}api/contacts/${contactId}/`;
  return await tryCatchFetch(url, getInit());
};

const createContact = async (newContactParams) => {
  let url = `${BASE_URL}api/contacts/`;
  let init = getInit();
  init["method"] = "POST";
  init["body"] = JSON.stringify(newContactParams);
  return await tryCatchFetch(url, init);
};

const editContact = async (contactId, updatedContact) => {
  let url = `${BASE_URL}api/contacts/${contactId}/`;
  let init = getInit();
  init["method"] = "PUT";
  init["body"] = JSON.stringify(updatedContact);
  return await tryCatchFetch(url, init);
};

const deleteContact = async (contactId) => {
  let url = `${BASE_URL}api/contacts/${contactId}/`;
  let init = getInit();
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const myExport = {
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
