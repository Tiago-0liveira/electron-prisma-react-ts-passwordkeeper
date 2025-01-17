import React, { useEffect, useState } from "react"
import PasswordApp from "../Apps/Passwords/index"
import Apps from "../Apps"
import "./styles.scss"
import clsx from "clsx"
import Mousetrap from "mousetrap"
import icons from "../Icons"
import { getCurrentWindow } from '@tauri-apps/api/window';

const Main: React.FC = () => {
	const [activeApp, setActiveApp] = useState<App>(PasswordApp)
	const [isSbopen, setisSbopen] = useState(true)
	const [extraLabel, setExtraLabel] = useState("")

	const toggleSideBar = () => { setisSbopen(value => !value) }
	const setApp = (index: number) => () => {
		setActiveApp(Apps[index])
	}
	const minimize = () => {
		getCurrentWindow().minimize();
	}
	const toggleMaximize = () => {
		const currentWindow = getCurrentWindow()
		currentWindow.isMaximized().then((maximized) => {
			if (maximized) {
				currentWindow.unmaximize()
			} else {
				currentWindow.maximize()
			}
		})
	}
	const exit = () => {
		getCurrentWindow().close()
	}

	const handleCtrlB = toggleSideBar
	useEffect(() => {
		Mousetrap.bind("ctrl+b", handleCtrlB)
		return () => {
			Mousetrap.unbind("ctrl+b")
		}
	})

	return (
		<div className="main">
			<div className="navbar">
				<div className="left">
					<div className="toggleSideBar-button" onClick={toggleSideBar}>
						{icons.main.bars}
					</div>
					<h3>
						<span>PasswordKeeper</span>
						<span className="divider"><b>/</b></span>
						<span>{activeApp.label}</span>
						{activeApp.extraLabel && <>
							<span className="divider"><b>/</b></span>
							{extraLabel && <span>{extraLabel}</span>}
						</>}
					</h3>
				</div>
				<div className="rigth">
					<div className="minimize" onClick={minimize}>
						{icons.main.minimize}
					</div>
					<div className="maximize" onClick={toggleMaximize}>
						{icons.main.maximize.maximized}
					</div>
					<div className="exit" onClick={exit}>
						{icons.main.exit}
					</div>
				</div>
			</div>
			<div className="content">
				<div className={clsx("sidebar", !isSbopen && "closed")}>
					{Apps.map((app, i) => (
						<div className={clsx("app", app.label === activeApp.label ? "active" : "", app.sidebarBottom && "sidebarBottom")} key={i} onClick={setApp(i)}>
							<p>
								{app.icon}<span className="label">{app.label}</span>
							</p>
							{icons.main.sidebarArrow}
						</div>
					))}
				</div>
				{Apps.map(app => {
					return (<div className={clsx("app-display", !isSbopen && "SbClosed", {active: activeApp.label === app.label})} key={app.label}>						
						<app.component setExtraLabel={setExtraLabel} />
					</div>)
				})}
			</div>
		</div>
	)
}

export default Main
