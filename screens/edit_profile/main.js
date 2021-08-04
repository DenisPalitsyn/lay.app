import React, {useContext, useState} from "react";
import {StyleSheet, ScrollView, TouchableOpacity, Text} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {LocalisationContext} from "../../localisation/context";
import ProfileContext from "./profile_context";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from 'moment';
import {useForm} from "react-hook-form";
import {InputController} from "../../components/UI/input-controller";
import {SelectController} from "../../components/UI/select-controller";
import {MultiSelectController} from "../../components/UI/multiselect-controller";

export const Main = () => {
  const {
    personalInfoTitles: titles,
    completeMandatoryField,
    displayNameLengthError,
    citiesTitles,
    next,
    genderOptions,
    lookingForOptions,
    save
  } = useContext(LocalisationContext);

  const profile = useContext(ProfileContext);

  const [date, setDate] = useState(new Date(profile.dateOfBirth));
  const [showPicker, setShowPicker] = useState(false);

  const {control, setValue, handleSubmit, formState: {errors}} = useForm(
    {
      mode: "all",
      defaultValues: {...profile}
    });

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const onSubmit = (v) => {
    console.log('v', v)
  }

  return (
    <ScrollView style={styles.container}>
      <InputController
        control={control}
        name="displayName"
        label={titles.displayName}
        required
        rules={{
          pattern: {
            value: /^[a-zA-Zа-яА-Я]+$/,
            message: completeMandatoryField
          },
          minLength: {
            value: 2,
            message: displayNameLengthError
          }
        }}
        errors={errors}
      />
      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <InputController
          control={control}
          name="dateOfBirth"
          label={titles.dateOfBirth}
          required
          customValue={moment(date).format('DD.MM.YYYY')}
          inputProps={{editable: false}}
          errors={errors}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display="default"
          maximumDate={moment().subtract(18, 'years').unix() * 1000}
          onChange={onChange}
        />
      )}
      <InputController
        control={control}
        name="country"
        label={titles.country}
        required
        inputProps={{disabled: true}}
        errors={errors}
      />
      <SelectController
        control={control}
        name="city"
        label={titles.city}
        required
        options={citiesTitles}
        errors={errors}
      />
      <SelectController
        control={control}
        name="gender"
        label={titles.gender}
        required
        options={genderOptions}
        errors={errors}
      />
      <MultiSelectController
        control={control}
        name="lookingFor"
        label={titles.lookingFor}
        required
        setValue={setValue}
        options={lookingForOptions}
        errors={errors}
      />
      <Button
        mode={'contained'}
        onPress={handleSubmit(onSubmit)}
      >
        {profile.profileSubmitted ? save : next}
      </Button>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});
