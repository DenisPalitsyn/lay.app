export const initAuthState = {
    authError: {
        mfaInfo: {
            phoneNumber: '',
            verificationId: '',
            resolver: null,
            error: null
        },
        multiFactorError: false,
        signIn: {
            message: null,
            code: null
        },
        signUp: {
            message: null,
            code: null
        }
    },
    emailVerified: false
};

export const initAppState = {
    needToUpdate: false,
    appLoaded: true,
    resetPassword: '',
    photoLoaded: true,
    lang: 'en',
    showInfoMessage: false
};

export const initialState = {
    auth: initAuthState,
    app: initAppState
}
