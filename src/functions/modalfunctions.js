import { setConfirmModal } from "../store/reducer/routereducer";

export const confirmPrompt = (dispatch) => (command) => {
	setConfirmModal(dispatch)(true, 0);
    
};
