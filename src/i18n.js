import "intl-pluralrules"
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import I18NextHttpBackend from 'i18next-http-backend';

const apiKey = "vYpoAw4egvR2AfOlqQKmlA";
const loadPath = `https://api.i18nexus.com/project_resources/translations/{{lng}}/{{ns}}.json?api_key=${apiKey}`;

i18next
    .use(I18NextHttpBackend)
    .use(initReactI18next)
    .init({
        react: { 
            useSuspense: false 
          },
    fallbackLng: "en",
    ns: ["default"],
    defaultNS: "default",
    supportedLngs: ["en","pt","de","fr","es"],
    backend: {
      loadPath: loadPath
    }
  })

  export default i18next