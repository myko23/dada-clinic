import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useGetFetchQuery = (key) => {
	const queryClient = useQueryClient();
	return queryClient.getQueryData(key);
};

const api = axios.create({
	baseURL: "https://dada-clinic-backend.onrender.com",
});

//GET FUNCTIONS

export const fetchPatientsAPI = async (userId) => {
	const response = await api.get("/patients", {
		params: { user_id: userId },
	});
	return response.data;
};
export const fetchConsultationsAPI = async () => {
	const response = await api.get("/consultations");
	return response.data;
};
export const fetchAdmissionAPI = async () => {
	const response = await api.get("/admissions");
	return response.data;
};

//POST FUNCTIONS

export const useAddPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((body) => api.post("/patients", body), {
		onSuccess: () => {
			queryClient.refetchQueries("patients");
		},
	});
};
export const useAddConsultationMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((body) => api.post("/consultations", body), {
		onSuccess: () => {
			queryClient.refetchQueries("consultations");
		},
	});
};
export const useAddAdmissionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((body) => api.post("/admissions", body), {
		onSuccess: () => {
			queryClient.refetchQueries("admissions");
		},
	});
};

//PUT
export const useEditPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(
		(content) =>
			api.put("/patients/" + content.id.toString(), content.body),
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
			api.put("/consultations/" + content.id.toString(), content.body),
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
			api.put("/admissions/" + content.id.toString(), content.body),
		{
			onSuccess: () => {
				queryClient.refetchQueries("admissions");
			},
		}
	);
};
//LOGIN
export const useLoginMutation = () => {
	return useMutation((body) => api.post("/users/login", body));
};
