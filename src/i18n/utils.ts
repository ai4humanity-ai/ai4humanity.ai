import { ui, defaultLang, type UiType } from './ui';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof UiType;
  return defaultLang;
}

export function useTranslations(lang: keyof UiType) {
  return function t(key: keyof UiType[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function pathNameIsInLanguage(pathname: string, lang: string) {
  return pathname.startsWith(`/${lang}`);
}

export function getLocalizedPath(path: string, lang: string) {
  if (lang === defaultLang) {
    return path;
  }
  return `/${lang}${path}`;
}

export function removeLocaleFromPath(pathname: string) {
  const segments = pathname.split('/');
  if (segments[1] && segments[1].length === 2) {
    segments.splice(1, 1);
  }
  return segments.join('/') || '/';
}