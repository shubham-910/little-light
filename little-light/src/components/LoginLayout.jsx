import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LoginLayout = ({ title, subtitle, children }) => {
	return (
		<>
			<div className="container-fluid h-100">
				<div className="row h-100">
					<div className="offset-3 col-6 h-100 p-5 ll-bg">
						<div className="row border p-5 rounded h-100 shadow bg-white position-relative">
							<Link to="/">
								<Button className="position-absolute top-0 start-0 ms-3 mt-3 w-auto">
									<ArrowBack className="me-2"></ArrowBack>Back Home
								</Button>
							</Link>
							<div className="col-12 h-100 p-5 text-center">
								<div className="row h-100 align-items-center">
									<div className="col">
										<h1 className="fw-bold">{title}</h1>
										<p className="mb-5">{subtitle}</p>
										{children}
									</div>
								</div>
							</div>
							{/* <div className="offset-2 col-5 h-100"><HomePageSlider /></div> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginLayout;
