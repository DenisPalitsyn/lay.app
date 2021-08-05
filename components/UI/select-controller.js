import React, {useContext} from "react";
import {Controller} from "react-hook-form";
import {HelperText} from "react-native-paper";
import {LocalisationContext} from "../../localisation/context";
import RNPickerSelect from "react-native-picker-select";
import {StyleSheet, View} from "react-native";

export const SelectController = ({control, name, rules, required, label, errors, options}) => {
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
          <RNPickerSelect
            placeholder={{
              label: label,
              color: '#ccc'
            }}
            items={options.map((item, i) => (
              {
                label: item.title,
                value: item.value,
                itemKey: `${item.value}${i}`
              }
            ))}
            onValueChange={onChange}
            onBlur={onBlur}
            style={pickerSelectStyles}
            value={value}
          />
        )}
      />
      <HelperText type="error" visible={errors ? !!errors[name] : false}>
        {(errors && errors[name]?.message) || ''}
      </HelperText>
    </View>
  )
}

// const styles = StyleSheet.create({
  // control: {
    // marginBottom: 2
  // }
// });

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 13,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    height: 30,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    color: 'black',
  },
  viewContainer: {
    paddingHorizontal: 10,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  }
});
