import i18n, { Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector'; // 브라우저에서 사용자 언어 감지
import ko from './locale.ko.json';
import en from './locale.en.json';

// 사용할 언어들을 키로, json 파일들을 담은 객체를 값으로 써준다.
const resources: Resource = {
  ko: {
    translation: ko,
  },
  en: {
    translation: en,
  },
} as const;

/*
사용자 브라우저 언어 가지고 오기
lng 옵션에 lng 셋 해주면 사용자 브라우저 언어에 따라 기본언어 셋팅됨.
const userLanguage = window.navigator.language;  
const lng = userLanguage.split('-')[0];
*/

i18n
  .use(LanguageDetector) //  user 의 언어를 탐지
  .use(initReactI18next) // i18n을 react-i18next로 전달한다.s
  .init({
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    resources,
    lng: 'ko', // 초기 설정 언어
    fallbackLng: {
      en: ['en'], // 한국어 불러오는 것이 실패했을 경우 영문을 써라.
      default: ['ko'],
    },
    debug: true, // 로드가 작동하지 않는 문제를 찾는데 도움을 줌(기본값: false)
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
