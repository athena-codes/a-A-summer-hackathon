import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      email: "Email",
      password: "Password",
      username: "Username",
      firstName: "First Name",
      lastName: "Last Name",
      signUp: "Sign Up"
    }
  },
  fr: {
    translation: {
      email: "E-mail",
      password: "Mot de passe",
      username: "Nom d'utilisateur",
      firstName: "Prénom",
      lastName: "Nom de famille",
      signUp: "S'inscrire"
    }
  },
  // Add other languages as needed
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
