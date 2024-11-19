"use client";
// context/NotificationContext.js

import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
	const [notification, setNotification] = useState(null);

	const sendNotification = (message) => {
		setNotification(message);
		toast.success(message);
	};

	return (
		<NotificationContext.Provider value={{ sendNotification }}>
			{children}
		</NotificationContext.Provider>
	);
};

export const useNotification = () => {
	return useContext(NotificationContext);
};
