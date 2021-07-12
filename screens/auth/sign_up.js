import React, {useContext, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, HelperText, Text, TextInput, useTheme} from "react-native-paper";
import {SafeAreaView} from "react-native-safe-area-context";
import {validateEmail, validatePassword} from "../../utils/validation";
import {signInWithGoogle, signUpWithEmailAndPassword} from "../../store/actions/authActions";
import {useDispatch} from "react-redux";
import {LocalisationContext} from "../../localisation/context";

export default function SignUp({navigation}) {
    const {
        emailIsIncorrect,
        textFieldErrorText,
        confirmPasswordsError,
        emailAlreadyInUse,
        signInWithGoogle: signInWithGoogleText
    } = useContext(LocalisationContext);

    const dispatch = useDispatch();
    const theme = useTheme();

    const [values, setValues] = useState({
        email: '',
        password: '',
        confirm: ''
    });
    const initialErrors = {
        email: '',
        password: '',
        confirm: '',
        common: ''
    }
    const [errors, setErrors] = useState(initialErrors);
    const [securePassword, setSecurePassword] = useState(true);
    const [secureConfirm, setSecureConfirm] = useState(true);

    const inputHandler = (text, id) => {
        setValues({
            ...values,
            [id]: text
        });
        setErrors(initialErrors);
    }

    const errorHandler = (text, id) => {
        setErrors({
            ...initialErrors,
            [id]: text
        });
    }

    const signUpHandler = async () => {
        const {email, password, confirm} = values;
        const emailIsCorrect = validateEmail(email);
        const passwordIsCorrect = validatePassword(password);
        const confirmIsCorrect = password === confirm;

        if (!emailIsCorrect) {
            return errorHandler(emailIsIncorrect, 'email');
        }

        if (!passwordIsCorrect) {
            return errorHandler(textFieldErrorText.password, 'password');
        }

        if (!confirmIsCorrect) {
            return errorHandler(confirmPasswordsError, 'confirm');
        }

        try {
            await dispatch(signUpWithEmailAndPassword(email, password));
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                return errorHandler(emailAlreadyInUse, 'email')
            }
            return errorHandler(e.message, 'common');
        }
    }

    const googleHandler = async () => {
        try {
            await dispatch(signInWithGoogle());
        } catch (e) {
            return errorHandler(e.message, 'common');
        }
    }

    const logInLink = () => {
        navigation.navigate('LogIn');
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.action}>
                <Button onPress={googleHandler}>{signInWithGoogleText}</Button>
            </View>
            <View style={styles.action}>
                <TextInput
                    style={styles.input}
                    mode='outlined'
                    label={'Email'}
                    value={values.email}
                    onChangeText={text => inputHandler(text, 'email')}
                />
                <HelperText type="error" visible={errors.email}>
                    {errors.email}
                </HelperText>
            </View>
            <View style={styles.action}>
                <TextInput
                    style={styles.input}
                    mode='outlined'
                    label={'Password'}
                    value={values.password}
                    onChangeText={text => inputHandler(text, 'password')}
                    secureTextEntry={securePassword}
                    right={<TextInput.Icon name="eye" onPress={() => setSecurePassword(!securePassword)}/>}
                />
                <HelperText type="error" visible={errors.password}>
                    {errors.password}
                </HelperText>
            </View>
            <View style={styles.action}>
                <TextInput
                    style={styles.input}
                    mode='outlined'
                    onChangeText={text => inputHandler(text, 'confirm')}
                    label="Confirm password"
                    value={values.confirm}
                    secureTextEntry={secureConfirm}
                    right={<TextInput.Icon name="eye" onPress={() => setSecureConfirm(!secureConfirm)}/>}
                />
                <HelperText type="error" visible={errors.confirm}>
                    {errors.confirm}
                </HelperText>
            </View>
            {Boolean(errors.common) &&
            <HelperText style={styles.action} type="error" visible={errors.common}>
                {errors.common}
            </HelperText>
            }
            <Button
                mode="contained"
                onPress={signUpHandler}
            >
                Sign up
            </Button>
            <View style={styles.caption}>
                <Text>Already have an account?</Text>
                <TouchableOpacity onPress={logInLink}>
                    <Text style={{color: theme.colors.accent}}> Log in</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    action: {
        marginBottom: 20,
        width: '100%'
    },
    input: {
        backgroundColor: '#fff'
    },
    caption: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
