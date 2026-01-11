export const environment = {
    production: false,
    defaultLanguage: 'tr',
    supportedLanguages: ['tr', 'en'] as const,
    translationPath: '/assets/i18n/',
    apiRetryAttempts: 2,
    apiRetryDelay: 1000
};
