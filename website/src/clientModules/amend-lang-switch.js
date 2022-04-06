import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

(() => {
  // dev mode
  if (process.env.NODE_ENV === 'development') return;
  // not in browser
  if (!ExecutionEnvironment.canUseDOM) return;

  function amendLangSwitch() {
    const lct = window.location;
    const pathArr = lct.pathname.split('/');

    const dropdowns = document.querySelectorAll('div.navbar__items > div.dropdown.dropdown--right');
    const langDropdown = dropdowns[dropdowns.length - 1];
    const barOption = langDropdown.querySelector('a');

    if (pathArr.includes('blog') && !barOption.textContent.endsWith('Blog')) {
      barOption.textContent += ' Blog';
      const optionList = langDropdown.querySelectorAll('li > a');
      optionList.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
        item.textContent += ' Blog';
      });
    }
  }

  // because of SPA, if the location changed (in site, no redirect),
  // the above click event will also be cleared
  // doc https://docusaurus.io/docs/docusaurus-core#redirect=
  // and https://reactrouter.com/docs/en/v6/getting-started/concepts#history=
  // were browsed, but not fix the problem
  // now, the solution is observing the head.title
  // the code inspired by https://stackoverflow.com/a/29540461
  function rebindWhenTitleChanged() {
    new MutationObserver(amendLangSwitch)
      .observe(document.querySelector('title'), {
        subtree: true,
        characterData: true,
        childList: true,
      });
  }

  window.addEventListener('load', () => {
    amendLangSwitch();
    rebindWhenTitleChanged();
  });
})();
