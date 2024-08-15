import axios from "axios";
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "./useSnackbar";

const AuthContext = createContext();

// Function to set accessToken in localStorage
const setToken = (accessToken) => {
	localStorage.setItem("accessToken", accessToken);
};

// Function to get accessToken from localStorage
const getToken = () => {
	return localStorage.getItem("accessToken");
};

// Axios interceptor to add accessToken to headers
axios.interceptors.request.use(
	(config) => {
		const accessToken = getToken();
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export function AuthProvider({ children }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();

	const updateUser = (userData) => {
		setUser(userData);
	};
	function login({ email, password }) {
		return axios
			.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, { email, password })
			.then((response) => {
				if (response.status === 200) {
					setIsAuthenticated(true);
					setToken(response.data.accessToken);
					return Promise.resolve(response);
				} else {
					setIsAuthenticated(false);
					localStorage.removeItem("accessToken");
					return Promise.reject(new Error("Unauthorized"));
				}
			})
			.then((response) => {
				return axios.get(`${process.env.REACT_APP_SERVER_URL}/userdetails`, { params: { accessToken: response.data.accessToken } });
			})
			.then((userDetailsResponse) => {
				if (userDetailsResponse.status === 200) {
					updateUser(userDetailsResponse.data);
					console.log(userDetailsResponse.data);
					return Promise.resolve(userDetailsResponse);
				} else {
					setIsAuthenticated(false);
					localStorage.removeItem("accessToken");
					return Promise.reject(new Error("Unauthorized"));
				}
			})
			.catch((error) => {
				setIsAuthenticated(false);
				localStorage.removeItem("accessToken");
				return Promise.reject(error);
			});
	}
	function logout() {
		setUser(null);
		setIsAuthenticated(false);
		localStorage.clear();
		showSuccessSnackbar("Logged out succesfully!");
	}
	return <AuthContext.Provider value={{ login, logout, isAuthenticated, user }}>{children}</AuthContext.Provider>;
}

export default function AuthConsumer() {
	return useContext(AuthContext);
}

export const useAuth = () => {
	return useContext(AuthContext);
};
