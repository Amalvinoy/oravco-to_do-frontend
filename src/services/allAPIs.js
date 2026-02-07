import serverURL from "./serverURL";
import commonAPI from "./commonAPI";

//Register User API
export const registerUserAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/api/registerUser`, reqBody, {});
}

//Login User API
export const loginUserAPI = async (reqBody) => {
    return await commonAPI("POST",`${serverURL}/api/loginUser`, reqBody, {});
}

//Create Task API
export const createTaskAPI = async (reqBody,token) => {
    const reqHeaders={
        Authorization: `Bearer ${token}`
    }
    return await commonAPI("POST",`${serverURL}/api/createtask`, reqBody, reqHeaders);
}

//Get Tasks API
export const getTasksAPI = async (token) => {
    const reqHeaders={
        Authorization: `Bearer ${token}`
    }
    return await commonAPI("GET",`${serverURL}/api/tasks`, {}, reqHeaders);
}

//Update Task API
export const updateTaskStatusAPI = async (taskId,reqBody,token) => {
    const reqHeaders={
        Authorization: `Bearer ${token}`
    }
    return await commonAPI("PUT",`${serverURL}/api/updatetask/${taskId}`, reqBody, reqHeaders);
}   

//Delete Task API
export const deleteTaskAPI = async (taskId,token) => {
    const reqHeaders={
        Authorization: `Bearer ${token}`
    }
    return await commonAPI("DELETE",`${serverURL}/api/deletetask/${taskId}`, {}, reqHeaders);
}   

