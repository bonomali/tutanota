//@flow

import type {AllIconsEnum} from "./Icon"
import {Icon} from "./Icon"
import m from "mithril"
import {MessageBoxN} from "./MessageBoxN"
import {px, size} from "../size"
import {BootIcons} from "./icons/BootIcons"
import {theme} from "../theme"

export const BannerType = Object.freeze({
	Info: "info",
	Warning: "warning",
})
export type BannerTypeEnum = $Values<typeof BannerType>

export type Attrs = {
	icon: AllIconsEnum,
	title: string,
	message: string,
	helpLink: string,
	buttonText: string,
	buttonClick: () => mixed,
	type: BannerTypeEnum
}

export class Banner implements MComponent<Attrs> {
	view({attrs}: Vnode<Attrs>) {
		const colors = getColors(attrs.type)
		const isVertical = attrs.type === BannerType.Warning
		return m(MessageBoxN, {
			style: {
				marginTop: px(size.vpad),
				maxWidth: "100%",
				backgroundColor: colors.bg,
				color: colors.fg,
				border: colors.border,
				"text-align": "left",
				display: "flex",
				"justify-content": "start",
				"align-items": "center",
				paddingTop: isVertical ? "16px" : "8px",
				paddingBottom: isVertical ? "16px" : "8px",
			},
		}, [
			m(Icon, {icon: attrs.icon, style: {fill: colors.button}, class: "icon-xl ml-m mr-m"}),
			m(".flex.col", [
				m("", [
					m("span.text-break" + (attrs.type === BannerType.Warning ? ".b" : ""), attrs.title),
					isVertical ? m("br") : m("span", " "),
					m("span.text-break", attrs.message),
				]),
				m("button.border-radius.mt-s", {
					style: {
						border: `2px solid ${colors.button}`,
						background: "transparent",
						color: colors.fg,
						width: "min-content",
						padding: px(size.hpad_button),
					},
					onclick: () => attrs.buttonClick(),
				}, attrs.buttonText)
			]),
			m(".flex-grow"),
			m("a", {
				style: {"align-self": "end", background: "transparent"},
				href: attrs.helpLink,
				target: "_blank",
			}, m(Icon, {icon: BootIcons.Help, large: true, style: {fill: colors.button, display: "block"}}))
		]);
	}
}

function getColors(type: BannerTypeEnum): Colors {
	if (type === BannerType.Warning) {
		return {bg: "#ca0606", fg: "white", button: "white", border: "none"}
	} else {
		return {bg: "transparent", fg: theme.content_fg, button: theme.content_button, border: `2px solid ${theme.content_border}`}
	}
}

type Colors = {
	bg: string,
	fg: string,
	border: string,
	button: string,
}