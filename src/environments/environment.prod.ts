export const environment = {
    production: true,
    defaultLanguage: 'tr',
    supportedLanguages: ['tr', 'en'] as const,
    translationPath: '/assets/i18n/',
    apiRetryAttempts: 3,
    apiRetryDelay: 2000
};
