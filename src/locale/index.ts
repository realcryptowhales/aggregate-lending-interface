import EN from './en';
import ZH from './zh';

export function t(key: string) {
  // TODO 根据locale来返回不同的KEY
  return EN[key] || 'no this key';
}

// TODO support tJSX
