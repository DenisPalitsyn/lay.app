import {titlesEn, titlesLv, titlesRu} from "../constants/profile";

export const getProfileTabData = (profile, contentType, contextOptions, lang = 'en') => {
  let titles = titlesEn;

  switch (lang) {
    case 'en': {
      titles = titlesEn;
      break;
    }
    case 'ru': {
      titles = titlesRu;
      break;
    }
    case 'lv': {
      titles = titlesLv;
      break;
    }
  }

  const result = [];

  switch (contentType) {
    case 'ABOUT_ME': {
      const {lookingForOptions, languagesOptions, figureOptions, ethnicityOptions, hairOptions, eyesOptions} = contextOptions;

      const fields = [
        ['lookingFor', 'languages'],
        ['figure', 'height', 'ethnicity', 'hair', 'eyes'],
        ['occupation', 'interests', 'dressStyle']
      ];

      fields.forEach((block) => {
        const subResult = [];

        block.forEach((item) => {
          let value = profile[item];

          const getValue = (options) => {
            if (Array.isArray(profile[item])) {
              return profile[item].map((item) => options.find((option) => option.value === item)?.title)
            }
            return options.find((option) => option.value === value)?.title
          }

          if (item === 'lookingFor') {
            value = getValue(lookingForOptions);
          } else if (item === 'languages') {
            value = getValue(languagesOptions);
          } else if (item === 'figure') {
            value = getValue(figureOptions);
          } else if (item === 'ethnicity') {
            value = getValue(ethnicityOptions);
          } else if (item === 'hair') {
            value = getValue(hairOptions);
          } else if (item === 'eyes') {
            value = getValue(eyesOptions);
          }

          subResult.push({
            value,
            title: titles[item],
            id: item
          });
        });

        result.push(subResult);
      });
      break;
    }
    case 'SECRETS': {
      const fields = ['whatYouLikeInSex', 'whatYouDontLikeInSex', 'areaAvailability', 'expectedReward'];

      fields.forEach((item) => {
        result.push({
          value: profile[item],
          title: titles[item],
          id: item
        });
      });
      break;
    }
  }

  return result;
};

export const getAgeValue = (timestamp) => {
  const today = new Date();
  const dateOfBirth = new Date(timestamp);
  let age;

  age = today.getFullYear() - dateOfBirth.getFullYear();

  if (today < dateOfBirth) {
    age = age - 1;
  }

  return age || '';
};

export const convertDateToTimestamp = (date) => {
  const dateOfBirthPath = date.split('/').map(i => Number.parseInt(i));
  const dateOfBirth = new Date(dateOfBirthPath[2], dateOfBirthPath[1] - 1, dateOfBirthPath[0], 23, 59);

  return dateOfBirth.getTime();
};

export const getLanguage = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const langParam = '' + urlParams.get('lang');

  if (['ru', 'en', 'lv'].includes(langParam)) {
    return langParam;
  }

  return null;
}

export const setLanguageParam = (lang) => {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  searchParams.set('lang', lang);
  url.search = searchParams.toString();
  window.history.replaceState("", "", url.toString());
}

export const getTimestamp = (date) => {
  return new Date(date.seconds * 1000).getTime();
}

export function getLocalAdaptiveLocation(userNotSender, companionGender, location, adaptiveLocationOptions) {
  let adaptiveLocation;

  switch (location) {
    case 'My home':
      adaptiveLocation = userNotSender ? (companionGender === 'Woman' ? 'At her home' : 'At his home') : location;
      break;
    case 'Your home':
      adaptiveLocation = userNotSender ? 'My home' : (companionGender === 'Woman' ? 'At her home' : 'At his home');
      break;
    default:
      adaptiveLocation = location;
  }

  return adaptiveLocationOptions.find(item => item.value === adaptiveLocation)?.title || location;
}
