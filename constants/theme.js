import {DefaultTheme as PaperDefaultTheme} from "react-native-paper";
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';

export const theme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        ...PaperDefaultTheme.colors,
        ...NavigationDefaultTheme.colors,
        primary: '#FC1055',
        error: '#FF0000',
        accent: '#164ec6'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
};
