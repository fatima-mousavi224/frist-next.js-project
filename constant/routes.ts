const ROUTES = {
    HOME : "/",
    SIGN_IN: "sign-in",
    SIGN_UP: "sign-up",
    COMMUNITIES: (id: string) => `/communities/${id}`,
    TAGS : (id: string) => `/tag/${id}`,
    ASK_QUESTIONS: "/ask-question",
    QUESTIONS: (id: string) => `/questions/${id}`,
}

export default ROUTES;

