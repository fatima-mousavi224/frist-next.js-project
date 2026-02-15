const ROUTES = {
    HOME : "/",
    SIGN_IN: "sign-in",
    SIGN_UP: "sign-up",
    COMMUNITIES: (id: string) => `/communities/${id}`,
    TAGS : (id: string) => `/tag/${id}`
}

export default ROUTES;

