import Cookie from "js-cookie"

const setCookie = (cookieName, usrin) => {
    Cookie.set(cookieName, usrin, {
        expires: 10,
        secure: true,
        sameSite: "production",
        path: "/",
    });
}

export default setCookie;