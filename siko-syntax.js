// Siko language syntax highlighting for Highlight.js
hljs.registerLanguage('siko', function (hljs) {
    return {
      name: 'Siko',
      keywords: {
        keyword: 'let match if else return for in while loop break continue try yield module import as where extern fn enum struct trait instance deriving effect with implicit using self Self mut type pub and or'
      },
      contains: [
        hljs.QUOTE_STRING_MODE,
        {
          className: 'number',
          begin: /\b[0-9]+(\.[0-9]+)?\b/
        },
        {
          className: 'operator',
          begin: /(==|!=|<=|>=|<-|->|<|>)/
        },
        {
          className: 'type',
          begin: /\b([A-Z][a-zA-Z0-9_]*)\b/
        },
        {
          className: 'variable',
          begin: /\b([a-z][a-zA-Z0-9_]*)\b/,
          keywords: 'let match if else return for in while loop break continue try yield module import as where extern fn enum struct trait instance deriving effect with implicit using self Self mut type pub and or',
          relevance: 0
        },
        {
          className: 'subst',
          begin: /\$\{/, end: /\}/
        }
      ]
    };
  });
  hljs.highlightAll();
