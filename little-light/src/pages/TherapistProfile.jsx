import { Button } from "@mui/material";
import { useEffect } from "react";
import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import FormInputText from "../components/FormInputText";
import { useForm } from "react-hook-form";
import { useSnackbar } from "../hooks/useSnackbar";
import useAuth from "../hooks/useAuth";

const Header = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 20px;
`;

const Icon = styled(FaUserCircle)`
	font-size: 60px;
	margin-right: 20px;
	color: #3498db;
`;

const Heading = styled.h1`
	margin: 0;
`;

const SubHeading = styled.h3`
	margin: 0;
	color: #555;
`;

const TherapistProfile = () => {
	const { control, handleSubmit, reset } = useForm({ mode: "onChange" });
	const { showSuccessSnackbar, showErrorSnackbar } = useSnackbar();
	const { user } = useAuth();

	useEffect(() => {
		// Fetch therapist data when the component mounts
		const fetchData = async () => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				try {
					const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/therapist`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					if (response.ok) {
						const data = await response.json();
						reset(data);
					} else {
						showErrorSnackbar("Failed to fetch therapist data");
					}
				} catch (error) {
					console.log(error);
					showErrorSnackbar("Error fetching therapist data:", error);
				}
			}
		};

		fetchData();
	}, []);

	const onSubmit = async (values) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			try {
				const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/profiles/therapist`, {
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(values),
				});

				if (response.ok) {
					showSuccessSnackbar("Your changes have been saved successfully!");
				} else {
					showErrorSnackbar("Failed to update therapist data");
				}
			} catch (error) {
				showErrorSnackbar("Error updating therapist data:", error);
			}
		}
	};

	return (
		<div className="container-fluid h-100">
			<div className="row h-100">
				<div className="offset-3 col-6 h-100 p-5 ll-bg">
					<div className="row border p-5 rounded h-100 shadow bg-white position-relative">
						<Header>
							<Icon />
							<div>
								<Heading>Account Settings</Heading>
								<SubHeading>Email: {user.email}</SubHeading>
							</div>
						</Header>
						<form onSubmit={handleSubmit(onSubmit)} noValidate>
							<div className="row">
								<div className="col-6">
									{/* <Label>First Name</Label>
                      <Input
                                  type="text"
                                  name="firstName"
                                  value={formData.firstName}
                                  onChange={handleChange}
                                  />
                      {errors.firstName && <ErrorMessage>{errors.firstName}</ErrorMessage>} */}
									<FormInputText control={control} name="firstName" label="First Name" required={true} />
								</div>

								<div className="col-6">
									{/* <Label>Last Name</Label>
                                      <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                                      {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>} */}
									<FormInputText control={control} name="lastName" label="Last Name" required={true} />
								</div>
								<div className="col-6">
									{/* <Label>Phone</Label>
									<Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
									{errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>} */}
									<FormInputText
										control={control}
										name="phoneNumber"
										label="Phone Number"
										required={true}
										rules={{ pattern: { value: /^\d{10}$/i, message: "Invalid phoneNumber number" } }}
									/>
								</div>
								<div className="col-6">
									{/* <Label>Last Name</Label>
                                      <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                                      {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>} */}
									<FormInputText control={control} name="professionalDetails" label="Profession Details" required={true} />
								</div>
								<div className="col-6">
									{/* <Label>Last Name</Label>
                                      <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                                      {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>} */}
									<FormInputText control={control} name="areaOfSpecialization" label="Area of Specialization" required={true} />
								</div>
								<div className="col-6">
									{/* <Label>Last Name</Label>
                                      <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                                      {errors.lastName && <ErrorMessage>{errors.lastName}</ErrorMessage>} */}
									<FormInputText control={control} name="yearsOfExperience" label="Years of Experience" required={true} />
								</div>
							</div>
							<div className="d-flex justify-content-center gap-2 mt-4">
								<Button type="submit" variant="contained" size="large" className="px-5">
									Update
								</Button>
								{/* <Button type="button" variant="outline" size="large" onClick={reset}>
									Cancel
								</Button> */}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TherapistProfile;
