import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import config from "../../docusaurus.config";

(() => {
  // not in browser
  if (!ExecutionEnvironment.canUseDOM) return;

  const langArr = config.i18n.locales;
  const defaultLang = config.i18n.defaultLocale;

  const followSystem = "follow_system";
  const storeKey = "localLang";

  // transform locale label
  let localeLabelMap = {};
  {
    const localConfigs = config.i18n.localeConfigs;
    for (const key in localConfigs) {
      if (localConfigs.hasOwnProperty(key) && localConfigs[key].label) {
        localeLabelMap[localConfigs[key].label] = key;
      }
    }
  }

  function redirect() {
    const localLang = localStorage.getItem(storeKey) || followSystem;
    const lct = window.location;
    const pathArr = lct.pathname.split("/");
    const curLang = langArr.includes(pathArr[1]) ? pathArr[1] : defaultLang;

    // no need redirect
    if (curLang === localLang) return;

    let exactLang;
    {
      // reset if not valid
      exactLang = langArr.includes(localLang) ? localLang : followSystem;

      // follow system, detect browser language
      if (exactLang === followSystem) {
        const nav = window.navigator;
        exactLang =
          [
            nav.language,
            ...nav.languages,
            nav.userLanguage,
            nav.systemLanguage,
          ]
            .map((lang) => lang?.split('-')[0])
            .filter((lang) => langArr.includes(lang))[0] || defaultLang;
      }
    }

    // update localStorage val
    if (localLang !== exactLang) {
      localStorage.setItem(storeKey, exactLang);
    }

    // redirect
    if (curLang !== exactLang) {
      // recheck lang
      if (langArr.includes(pathArr[1])) {
        // path like /zh/path
        if (exactLang === defaultLang) {
          // to /path
          pathArr.splice(1, 1);
        } else {
          // to /fr/path
          pathArr[1] = exactLang;
        }
      } else {
        if (exactLang !== defaultLang) {
          pathArr.splice(1, 0, exactLang);
        } else {
          return;
        }
      }
      // all ''
      if (pathArr.at(-1) === pathArr.at(-2)) pathArr.pop();
      lct.replace(lct.origin + pathArr.join("/"));
    }
  }

  // add click event to locale menu
  const dropDowns = document.querySelectorAll("div.navbar__item.dropdown > ul");
  dropDowns[dropDowns.length - 1].addEventListener(
    "click",
    function clickEvent(e) {
      e.preventDefault();

      const lang = localeLabelMap[e.target.textContent] || defaultLang;
      if (localStorage.getItem(storeKey) !== lang) {
        localStorage.setItem(storeKey, lang);
      }
      redirect();
    }
  );

  redirect();
})();
