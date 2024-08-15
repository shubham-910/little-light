import React from "react";

const Button = ({ type, label }) => {
	return (
		<button type="button" className={`btn btn-${type}`}>
			{label}
		</button>
	);
};

export const PrimaryButton = ({ label }) => <Button type="primary" label={label} />;
export const SecondaryButton = ({ label }) => <Button type="secondary" label={label} />;
export const SuccessButton = ({ label }) => <Button type="success" label={label} />;
export const DangerButton = ({ label }) => <Button type="danger" label={label} />;
export const WarningButton = ({ label }) => <Button type="warning" label={label} />;
export const InfoButton = ({ label }) => <Button type="info" label={label} />;
export const LightButton = ({ label }) => <Button type="light" label={label} />;
export const DarkButton = ({ label }) => <Button type="dark" label={label} />;
export const LinkButton = ({ label }) => <Button type="link" label={label} />;
