export const convertAgeToTimestamp = (age) => {
  const a = age * 525600 * 60000;
  // const dateOfBirthPath = date.split('/').map(i => Number.parseInt(i));
  // console.log('dateOfBirthPath', dateOfBirthPath);
  // const dateOfBirth = new Date(dateOfBirthPath[2], dateOfBirthPath[1], dateOfBirthPath[1], 0, 0);
  const today = new Date();
  const b = today.getTime();

  return b - a;
};

export const convertTimestampToAge = (timestamp) => {
  return Math.floor((new Date().getTime() - timestamp) / (525600 * 60000));
};

export const initFilters = {
  country: 'Latvia',
  city: '',
  gender: '',
  dateOfBirth: [convertAgeToTimestamp(20), convertAgeToTimestamp(30)],
  // dateOfBirth: [convertAgeToTimestamp(20), convertAgeToTimestamp(30)],
  hasPhotos: null,
  figure: '',
  isApply: false,
  isReset: false
};
