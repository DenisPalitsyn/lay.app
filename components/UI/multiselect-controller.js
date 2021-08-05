import React, {useContext, useState} from "react";
import {Controller} from "react-hook-form";
import {Button, HelperText, Text} from "react-native-paper";
import {StyleSheet, TouchableOpacity, FlatList, View} from 'react-native';
import {LocalisationContext} from "../../localisation/context";
import {Modal} from "./modal";
import CheckBox from '@react-native-community/checkbox';

export const MultiSelectController = ({control, name, rules, required, label, errors, options, setValue}) => {
  const {completeMandatoryField} = useContext(LocalisationContext)

  const [visible, setVisible] = useState(false);

  const initialOptions = [...options].map(o => ({
    value: o.value,
    label: o.title,
    checked: false
  }));

  const [optionsList, setOptionsList] = useState(initialOptions);

  const hideModal = () => setVisible(false);

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
        render={({field: {onBlur, value}}) => {
          return (
            <TouchableOpacity
              style={styles.select}
              onBlur={onBlur}
              onPress={() => {
                const checkedOptions = initialOptions.map(o => ({
                  ...o,
                  checked: [...value].includes(o.value)
                }));
                setOptionsList(checkedOptions);
                setVisible(true);
              }}
            >
              {value.length ?
                <FlatList
                  horizontal
                  data={value}
                  renderItem={({item}) => {
                    const title = options.find(o => o.value === item)?.title;
                    return <Text style={styles.inputItem}>{title}</Text>;
                  }}
                  keyExtractor={(item, i) => item + i}
                /> :
                <Text style={styles.placeholder}>{label}</Text>
              }
            </TouchableOpacity>
          )
        }}
      />
      <HelperText type="error" visible={errors ? !!errors[name] : false}>
        {(errors && errors[name]?.message) || ''}
      </HelperText>
      <Modal
        visible={visible}
        hideModal={hideModal}
      >
        <FlatList
          data={optionsList}
          renderItem={({item}) => (
            <View style={styles.modalItem}>
              <CheckBox
                style={{marginRight: 5}}
                disabled={false}
                value={item.checked}
                onValueChange={(newValue) => {
                  const newOptions = [...optionsList];
                  newOptions.forEach(o => o.value === item.value && (o.checked = newValue));
                  setOptionsList(newOptions);
                }}
              />
              <Text>{item.label}</Text>
            </View>
          )}
          keyExtractor={(item, i) => item.value + i}
        />
        <Button onPress={() => {
          const items = optionsList.filter(o => o.checked).map(o => o.value);
          setValue(name, items, {shouldValidate: true});
          hideModal();
        }}>OK</Button>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  select: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  },
  placeholder: {
    paddingHorizontal: 8,
    paddingVertical: 11,
    color: '#ccc'
  },
  inputItem: {
    padding: 8,
    margin: 2,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 8,
    backgroundColor: '#ccc',
    alignSelf: 'flex-start'
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  }
});
