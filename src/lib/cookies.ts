import Cookies from "js-cookie"

export function getAccessToken(): string | undefined {
	return Cookies.get("accessToken")
}

export function getRefreshToken(): string | undefined {
	return Cookies.get("refreshToken")
}

export function setAccessToken(token: string) {
	Cookies.set("accessToken", token, { secure: true, sameSite: "strict" })
}

export function setRefreshToken(token: string) {
	Cookies.set("refreshToken", token, { secure: true, sameSite: "strict" })
}

export function removeAccessToken() {
	Cookies.remove("accessToken")
}

export function removeRefreshToken() {
	Cookies.remove("refreshToken")
}
