const browserLang =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;
const currentLang = window.location.pathname.substring(1, 3);
if (browserLang === "zh-CN" && currentLang !== "zh") {
  const url = window.location.origin + "/zh" + window.location.pathname;
  window.location.replace(url);
}
