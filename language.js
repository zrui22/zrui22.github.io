const languageButton = document.querySelector('.lang');
const alternateName = document.querySelector('[data-alt-name]');
const text = [...document.querySelectorAll('[data-zh]')].map(node => [node, node.textContent]);
const attributes = ['aria-label', 'alt'].flatMap(attribute => {
  const translated = attribute === 'aria-label' ? 'data-zh-label' : 'data-zh-alt';
  return [...document.querySelectorAll(`[${translated}]`)].map(node => [
    node, attribute, node.getAttribute(attribute), node.getAttribute(translated),
  ]);
});
let language = 'en';

function selectLanguage(next) {
  language = next;
  const isChinese = next === 'zh';
  document.documentElement.lang = isChinese ? 'zh-CN' : 'en';
  alternateName.lang = isChinese ? 'en' : 'zh-CN';
  for (const [node, english] of text) node.textContent = isChinese ? node.dataset.zh : english;
  for (const [node, attribute, english, chinese] of attributes) {
    node.setAttribute(attribute, isChinese ? chinese : english);
  }
  languageButton.textContent = isChinese ? 'EN' : '中文';
  languageButton.lang = isChinese ? 'en' : 'zh-CN';
  languageButton.setAttribute('aria-label', isChinese ? 'Switch to English' : '显示中文');
  try { localStorage.setItem('rui-site-language', next); } catch {}
}

try { if (localStorage.getItem('rui-site-language') === 'zh') selectLanguage('zh'); } catch {}
languageButton.hidden = false;
languageButton.addEventListener('click', () => selectLanguage(language === 'en' ? 'zh' : 'en'));
