import {initAuthState} from "../../constants/initialState";

const authReducer = (state = initAuthState, action) => {
    switch (action.type) {
        case 'EMAIL_IS_VERIFIED': {
            return {
                ...state,
                emailVerified: true
            }
        }
        case 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_SUCCESS':
        case 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS':
        case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_SUCCESS':
        case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_IN_PROGRESS': {
            return {
                ...state,
                authError: {
                    multiFactorError: false,
                    mfaInfo: {
                        phoneNumber: '',
                        verificationId: '',
                        resolver: null,
                        error: null
                    },
                    signIn: {
                        message: null,
                        code: null
                    },
                    signUp: {
                        message: null,
                        code: null
                    }
                }
            };
        }
        case 'SIGN_IN_WITH_EMAIL_AND_PASSWORD_ERROR': {
            return {
                ...state,
                authError: {
                    ...state.authError,
                    signIn: {
                        message: action.data.error,
                        code: action.data.code
                    }
                }
            };
        }
        case 'SIGN_UP_WITH_EMAIL_AND_PASSWORD_ERROR': {
            return {
                ...state,
                authError: {
                    ...state.authError,
                    signUp: {
                        message: action.data.error,
                        code: action.data.code
                    }
                }
            };
        }
        case 'LOGOUT_IN_SUCCESS':
        case 'LOGOUT_IN_PROGRESS':
        case 'LOGOUT_IN_ERROR': {
            return {
                ...state
            };
        }
        case 'MULTI_FACTOR_ERROR': {
            return {
                ...state,
                authError: {
                    ...state.authError,
                    multiFactorError: true
                }
            }
        }
        case 'UPDATE_MFA_INFO': {
            return {
                ...state,
                authError: {
                    ...state.authError,
                    mfaInfo: {
                        ...state.authError.mfaInfo,
                        ...action.data
                    }
                }
            }
        }
        default:
            return state;
    }
};

export default authReducer;
