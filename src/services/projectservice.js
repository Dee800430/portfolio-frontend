import API, { authAPI } from "./api"

export const getprojects = async () => {
    return await API.get("/project");
}

export const getProjectById = async (id) => {
    return await API.get(`/project/${id}`);
}
export const saveProject = async (data) => {
    return await authAPI.post("/project/save", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}


export const deleteProject = async (id) => {
    return await authAPI.delete(`/project/${id}`);
}
