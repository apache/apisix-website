if (typeof window !== "undefined") {
  const browserLang =
    (window.navigator.languages && window.navigator.languages[0]) ||
    window.navigator.language ||
    window.navigator.userLanguage;
  const currentLang = window.location.pathname.substring(1, 3);
  if (browserLang === "zh-CN" && currentLang !== "zh") {
    const url = window.location.origin + "/zh" + window.location.pathname;
    window.location.replace(url);
  }
}
