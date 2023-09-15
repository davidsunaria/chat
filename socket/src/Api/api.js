import {axiosApi} from "./http";
const apiUrl = process.env.REACT_APP_PATIENTPORTAL_API;

export const login = async (formData) => {
	try {
		let response = await axiosApi.post(`${apiUrl}/auth/login`, formData);
		return response?.data;
	} catch (error) {
		console.log("api error",error)
		return error?.response?.data;
	}
};

export const logOut = async (formData) => {
	console.log("rhifuhrufherfu")
	try {
		let response = await axiosApi.post(`${apiUrl}user/logout`, formData);
		console.log("res",response)
		return response?.data;
	} catch (error) {
		console.log("api error",error)
		return error?.response?.data;
	}
};



export const getConversation = async (formData) => {
	console.log("api payload",formData.user_id)
	try {
	  let response = await axiosApi.get(`${apiUrl}chat/get-conversation?user_id=${formData.user_id}&page=${formData.page}&limit=${formData.limit}`);
	  console.log("api response",response)
	  return response?.data;
	} catch (error) {
	  return error?.response?.data;
	}
  };