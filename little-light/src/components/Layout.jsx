import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
	return (
		<div className="App">
			<Header></Header>
			<main className="main-content">{children}</main>
			<Footer></Footer>
		</div>
	);
};

export default Layout;
