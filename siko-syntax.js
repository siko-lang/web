// Siko language syntax highlighting for Highlight.js
hljs.registerLanguage('siko', function (hljs) {
    // Language keywords only
    const KEYWORDS = [
        'if', 'then', 'else', 'let', 'in',
        'data', 'type', 'class', 'instance', 'derive', 'import', 'module',
        'record', 'trait', 'impl', 'for', 'effect', 'eff', 'return', 'try',
        'with', 'extern', 'loop', 'break', 'continue', 'while', 'match',
        'as', 'when', 'unless', 'defer', 'yield', 'async', 'await', 'fn',
        'enum', 'struct', 'mut', 'pub', 'self', 'Self', 'and', 'or', 'not',
        'using', 'implicit', 'deriving'
    ];

    return {
        name: 'Siko',
        keywords: {
            keyword: KEYWORDS,
        },
        contains: [
            // Strings
            {
                className: 'string',
                begin: '"',
                end: '"',
                contains: [hljs.BACKSLASH_ESCAPE]
            },
            // Numbers
            hljs.C_NUMBER_MODE,
            // Types (uppercase identifiers only)
            {
                className: 'type',
                begin: /\b[A-Z][a-zA-Z0-9_]*\b/,
                relevance: 0
            },
            // Comments are last (lowest precedence)
            hljs.COMMENT('//', '$'),
            hljs.COMMENT('/\\*', '\\*/')
        ]
    };
});
hljs.highlightAll();
