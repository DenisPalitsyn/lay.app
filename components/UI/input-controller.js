import React, {useContext} from "react";
import {Controller} from "react-hook-form";
import {HelperText, TextInput} from "react-native-paper";
import {View} from "react-native";
import {LocalisationContext} from "../../localisation/context";

export const InputController = ({control, name, rules, required, label, customValue, errors, inputProps, multiline, render}) => {
  const {completeMandatoryField} = useContext(LocalisationContext)
  return (
    <View>
      <Controller
        control={control}
        name={name}
        rules={{
          required: {
            value: !!required,
            message: completeMandatoryField
          },
          ...rules
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            mode={'outlined'}
            label={label}
            onBlur={onBlur}
            onChangeText={onChange}
            value={customValue || value}
            multiline={multiline}
            numberOfLines={multiline ? 4 : undefined}
            render={render}
            {...inputProps}
          />
        )}
      />
      <HelperText type="error" visible={errors ? !!errors[name] : false}>
        {(errors && errors[name]?.message) || ''}
      </HelperText>
    </View>
  )
}
