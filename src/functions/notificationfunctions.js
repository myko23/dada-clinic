import { NotificationManager } from "react-notifications";

export const Notify = (title, message, type, timeout) => {
	const defaultTimeout = 1500;
	const defaultMessage = message || "Default Message";
	const defaultTitle = (title || "Default Title").toUpperCase();
	switch (type) {
		case "success":
			NotificationManager.success(
				defaultMessage,
				defaultTitle,
				defaultTimeout
			);
			break;
		case "error":
			NotificationManager.error(
				defaultMessage,
				defaultTitle,
				defaultTimeout
			);
			break;
		case "warning":
			NotificationManager.warning(
				defaultMessage,
				defaultTitle,
				defaultTimeout
			);
			break;
		case "info":
			NotificationManager.info(
				defaultMessage,
				defaultTitle,
				defaultTimeout
			);
			break;
		default:
			NotificationManager.success(
				defaultMessage,
				defaultTitle,
				defaultTimeout
			);
			break;
	}
};
