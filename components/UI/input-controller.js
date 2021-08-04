import React, {useContext} from "react";
import {Controller} from "react-hook-form";
import {HelperText, TextInput} from "react-native-paper";
import {LocalisationContext} from "../../localisation/context";

export const InputController = ({control, name, rules, required, label, customValue, errors, inputProps}) => {
  const {completeMandatoryField} = useContext(LocalisationContext)
  return (
    <>
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
            {...inputProps}
          />
        )}
      />
      <HelperText type="error" visible={!!errors[name]}>
        {errors[name]?.message || ''}
      </HelperText>
    </>
  )
}
