// CodeMirror
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';

export const extensions = {
  JS: {
    lang: javascript(),
    formatter: {
      field: 'jsCode',
      url: 'https://tools.atatus.com/tools/js-beautify'
    }
  },
  Python: {
    lang: python(),
    formatter: {
      field: '',
      url: 'https://api.extendsclass.com/python/formatter/auto'
    }
  }
};
