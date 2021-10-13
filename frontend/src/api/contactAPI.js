const BASE_URL = "http://localhost:8000/";

const tryCatchFetch = async (url) => {
  try {
    let response = await fetch(url);
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
  return await tryCatchFetch(url);
};

const myExport = {
  getSubjects,
};

export default myExport;
