import React from "react";
import "./SideBar.css";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import HomeIcon from "@mui/icons-material/Home";

const Sidebar = () => {
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const navigate = useNavigate();

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
		if (index === 0) {
			navigate("/music");
		} else {
			navigate("/music/favourites");
		}
	};

	return (
		<List>
			<ListItem disablePadding>
				<ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
					<ListItemIcon>
						<MusicNoteIcon />
					</ListItemIcon>
					<ListItemText primary="Music" />
				</ListItemButton>
			</ListItem>
			<ListItem disablePadding>
				<ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Favorites" />
				</ListItemButton>
			</ListItem>
		</List>
	);
};

export default Sidebar;
