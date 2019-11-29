import LocalizedStrings from "react-localization";
import  english  from "./lang/en";
import  spanish  from "./lang/sp";
import { reactLocalStorage } from "reactjs-localstorage";

console.log("english", english);
const langs = new LocalizedStrings({
  en: english,
  sp: spanish
});

let currentLang = reactLocalStorage.get("defaultLanguage");
if (typeof currentLang == "undefined") {
  currentLang = "en";
}
console.log("currentLang", currentLang);
langs.setLanguage(currentLang);

export default langs;
