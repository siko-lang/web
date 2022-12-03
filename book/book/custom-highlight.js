hljs.registerLanguage("siko", (hljs) => ({
    name: "Siko",
    keywords: {
      keyword: "if module where do else then class instance data case of import deriving extern return loop break continue try effect with using",
      built_in: "",
    },
    contains: [
      hljs.QUOTE_STRING_MODE,
      hljs.C_NUMBER_MODE,
      {
        scope: "string",
        begin: '"',
        end: '"',
        contains: [{ begin: "\\\\." }],
      },
      hljs.COMMENT("//", "$"),
      {className:"type",begin:"\\b[A-Z][\\w']*",relevance:0},
    ],
  }));

  hljs.initHighlightingOnLoad();