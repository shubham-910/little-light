import { Box, MobileStepper } from "@mui/material";
import { useTheme } from "@emotion/react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useState } from "react";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
	{
		label: "San Francisco – Oakland Bay Bridge, United States",
		imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=4000&h=2500&q=60",
	},
	{
		label: "Bird",
		imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=4000&h=2500&q=60",
	},
	{
		label: "Bali, Indonesia",
		imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=4000&h=2500",
	},
	{
		label: "Goč, Serbia",
		imgPath: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=4000&h=2500&q=60",
	},
];

const HomePageSlider = () => {
	const theme = useTheme();
	const [activeStep, setActiveStep] = useState(0);
	const maxSteps = images.length;

	const handleStepChange = (step) => {
		setActiveStep(step);
	};

	return (
		<>
			<AutoPlaySwipeableViews
				axis={theme.direction === "rtl" ? "x-reverse" : "x"}
				index={activeStep}
				onChangeIndex={handleStepChange}
				className="h-100"
				enableMouseEvents
			>
				{images.map((step, index) => (
					<div key={step.label}>
						{Math.abs(activeStep - index) <= 2 ? (
							<Box
								component="img"
								sx={{
									height: "100%",
									display: "block",
									overflow: "hidden",
								}}
								src={step.imgPath}
								alt={step.label}
							/>
						) : null}
					</div>
				))}
			</AutoPlaySwipeableViews>
			<MobileStepper className="justify-content-center" steps={maxSteps} position="static" activeStep={activeStep} />
		</>
	);
};

export default HomePageSlider;
