import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetFetchQuery = (key) => {
	const queryClient = useQueryClient();
	return queryClient.getQueryData(key);
};

//GET FUNCTIONS

export const fetchPatientsAPI = async (userId) => {
	const response = await axios.get("http://localhost:3001/patients", {
		params: { user_id: userId },
	});
	return response.data;
};
export const fetchConsultationsAPI = async () => {
	const response = await axios.get("http://localhost:3001/consultations");
	return response.data;
};
export const fetchAdmissionAPI = async () => {
	const response = await axios.get("http://localhost:3001/admissions");
	return response.data;
};

//POST FUNCTIONS

export const useAddPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(body) => axios.post("http://localhost:3001/patients", body),
		{
			onSuccess: () => {
				queryClient.refetchQueries("patients");
			},
		}
	);
};
export const useAddConsultationMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(body) => axios.post("http://localhost:3001/consultations", body),
		{
			onSuccess: () => {
				queryClient.refetchQueries("consultations");
			},
		}
	);
};
export const useAddAdmissionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(body) => axios.post("http://localhost:3001/admissions", body),
		{
			onSuccess: () => {
				queryClient.refetchQueries("admissions");
			},
		}
	);
};

//PUT
export const useEditPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(content) =>
			axios.put(
				"http://localhost:3001/patients/" + content.id.toString(),
				content.body
			),
		{
			onSuccess: () => {
				queryClient.refetchQueries("patients");
			},
		}
	);
};
export const useEditConsultationMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(content) =>
			axios.put(
				"http://localhost:3001/consultations/" + content.id.toString(),
				content.body
			),
		{
			onSuccess: () => {
				queryClient.refetchQueries("consultations");
			},
		}
	);
};
export const useEditAdmissionsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(content) =>
			axios.put(
				"http://localhost:3001/admissions/" + content.id.toString(),
				content.body
			),
		{
			onSuccess: () => {
				queryClient.refetchQueries("admissions");
			},
		}
	);
};
//LOGIN
export const useLoginMutation = () => {
	return useMutation((body) =>
		axios.post("http://localhost:3001/users/login", body)
	);
};
