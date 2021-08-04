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

export const initProfileState = {
    data: {},
    photos: {},
    fileUploadProcess: [],
    isSaveProfile: false,
    isModerator: false,
    authRequests: [],
    offers: [],
    uid: ''
}

export const initAppState = {
    needToUpdate: false,
    appLoaded: true,
    resetPassword: '',
    photoLoaded: true,
    lang: 'en',
    showInfoMessage: false
};

export const initPhotoObj = {
    xs: undefined,
    s: undefined,
    m: undefined,
    l: undefined,
    big: undefined
}

export const initUsersState = {
    photos: {},
    chatUser: '',
    requests: [],
    users: {}
};

export const initialState = {
    auth: initAuthState,
    app: initAppState
}
