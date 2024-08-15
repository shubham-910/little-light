import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import LoginLayout from "./components/LoginLayout";
import ResetPassword from "./pages/ResetPassword";
import Homepage from "./pages/Homepage";
import FAQPage from "./components/FAQPage";
import Layout from "./components/Layout";
import ContactUs from "./pages/ContactUs";
import Booking from "./pages/Booking.jsx";
import RequestStatus from "./pages/RequestStatus.jsx";
import AppointmentRequests from "./pages/AppointmentRequest.jsx";
import Journal from "./pages/Journal";
import TherapistDashboard from "./pages/TherapistDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import UserProfile from "./pages/UserProfile";
import TherapistProfile from "./pages/TherapistProfile";
import BlogHome from "./pages/BlogHome";
import BlogView from "./pages/BlogView";
import CreateBlog from "./pages/CreateBlog";
import UpdateBlog from "./pages/UpdateBlog";
import MusicPage from "./pages/MusicPage.jsx";
import useAuth from "./hooks/useAuth";

function RequireAuth({ children }) {
	const { isAuthenticated } = useAuth();
	const location = useLocation();
	console.log("isAuthenticated", isAuthenticated);
	return isAuthenticated === true ? children : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}

function App() {
	return (
		<Routes>
			<Route
				index={true}
				element={
					<Layout>
						<Homepage />
					</Layout>
				}
			/>
			<Route
				path="/login"
				element={
					<LoginLayout title="Login" subtitle="Use your credentials to login">
						<Login />
					</LoginLayout>
				}
			/>
			<Route
				path="/sign-up"
				element={
					<LoginLayout title="Sign Up" subtitle="Create a new account and let's connect">
						<SignUp />
					</LoginLayout>
				}
			/>
			<Route
				path="/forgot-password"
				element={
					<LoginLayout title="Forgot Password" subtitle="Use your email to reset the password">
						<ForgotPassword />
					</LoginLayout>
				}
			/>
			<Route
				path="/reset-password"
				element={
					<LoginLayout title="Reset Password" subtitle="Change your password">
						<ResetPassword />
					</LoginLayout>
				}
			/>
			<Route
				path="/faq"
				element={
					<Layout>
						<FAQPage />
					</Layout>
				}
			/>
			<Route
				path="/contact-us"
				element={
					<Layout>
						<ContactUs />
					</Layout>
				}
			/>
			<Route
				path="/music/*"
				element={
					<Layout>
						<MusicPage />
					</Layout>
				}
			/>
			<Route
				path="/booking"
				element={
					<Layout>
						<Booking />
					</Layout>
				}
			/>
			{/* Only for people dealing with mental health illness */}
			<Route
				path="/request-status"
				element={
					<Layout>
						<RequestStatus />
					</Layout>
				}
			/>
			{/* Only for people dealing with mental health illness */}
			<Route
				path="/appointment-requests"
				element={
					<Layout>
						<AppointmentRequests />
					</Layout>
				}
			/>{" "}
			{/* Only for therapists */}
			<Route
				path="/booking"
				element={
					<Layout>
						<Booking />
					</Layout>
				}
			/>
			<Route
				path="/blogs"
				element={
					<Layout>
						<BlogHome />
					</Layout>
				}
			/>
			<Route
				path="/blogs/:id"
				element={
					<Layout>
						<BlogView />
					</Layout>
				}
			/>
			<Route
				path="/create-blog"
				element={
					<Layout>
						<CreateBlog />
					</Layout>
				}
			/>
			<Route
				path="/blogs/:id/update"
				element={
					<Layout>
						<UpdateBlog />
					</Layout>
				}
			/>
			<Route
				path="/journal"
				element={
					<Layout>
						<Journal />
					</Layout>
				}
			></Route>
			<Route
				path="/therapist-dashboard"
				element={
					<Layout>
						<TherapistDashboard />
					</Layout>
				}
			></Route>
			{/* Therapist dashboard route */}
			<Route
				path="/user-dashboard"
				element={
					<Layout>
						<UserDashboard />
					</Layout>
				}
			></Route>
			{/* User dashboard route */}
			<Route
				path="/userprofile"
				element={
					<Layout>
						<UserProfile />
					</Layout>
				}
			></Route>
			<Route
				path="/therapistprofile"
				element={
					<Layout>
						<TherapistProfile />
					</Layout>
				}
			></Route>
			<Route path="*" element={<Navigate to="/" />} />
		</Routes>
	);
}

export default App;
