import LocalizedStrings from "react-localization";
import  english  from "./lang/en";
import  spanish  from "./lang/sp";
import { reactLocalStorage } from "reactjs-localstorage";

const langs = new LocalizedStrings({
  en: english,
  sp: spanish
});

//let currentLang = reactLocalStorage.get("defaultLanguage");
//if (typeof currentLang == "undefined") {
 const currentLang = "en";
//}
langs.setLanguage(currentLang);

export default langs;
