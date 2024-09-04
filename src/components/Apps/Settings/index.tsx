import React from "react"
import "./styles.scss"
//import ICONS from "../../Icons"
//import settingsIcon from "./assets/svg/settings.svg"

const SettingsComponent: React.FC = () => {
	return (
		<div className="SettingsComponent">
			Settings
			<b>WIP</b>
		</div>
	)
}


export default {
	label: "Settings",
	component: SettingsComponent,
	extraLabel: false,
	sidebarBottom: true
}
