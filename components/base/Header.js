import React from 'react';
import { useTheme, Appbar, TouchableRipple, Switch } from 'react-native-paper';
import {PreferencesContext} from "../../App";

export const Header = ({ scene }) => {
    const theme = useTheme();
    const { toggleTheme, isThemeDark } = React.useContext(PreferencesContext);

    return (
        <Appbar.Header
            theme={{
                colors: {
                    primary: theme?.colors.surface,
                },
            }}
        >
            <Appbar.Content title={scene.route?.name} />
            <TouchableRipple onPress={() => {
                console.log('toggleTheme', toggleTheme)
                // toggleTheme()
            }}>
                <Switch
                    style={[{ backgroundColor: theme.colors.accent }]}
                    color={'red'}
                    value={isThemeDark}
                />
            </TouchableRipple>
        </Appbar.Header>
    );
};
