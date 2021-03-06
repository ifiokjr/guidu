/**
 * Tells TypeScript to ignore flow components by declaring them as empty modules
 */
declare module '@uidu/codemod-util-shared-styles-to-theme';
declare module '@uidu/comment';
// TODO - Add icon import paths to entry-points.tsconfig.json
declare module '@uidu/icon/*';
declare module '@uidu/icon-file-type';
declare module '@uidu/icon-file-type/*';
declare module '@uidu/icon-object';
declare module '@uidu/icon-object/*';
declare module '@uidu/icon-priority';
declare module '@uidu/icon-priority/*';
declare module '@uidu/input';
declare module '@uidu/nps';
declare module '@uidu/panel';
declare module '@uidu/polyfills';
declare module '@uidu/single-select';
declare module '@uidu/size-detector';
declare module '@uidu/textfield';

// Build
declare module '@uidu/docs';
declare module '@uidu/ssr';
declare module '@uidu/build-utils';
declare module '@uidu/build-utils/*';
declare module '@uidu/visual-regression';
declare module '@uidu/visual-regression/*';
declare module '@uidu/webdriver-runner';
declare module '@uidu/webdriver-runner/*';
declare module '@uidu/util-common-test';

declare const ENABLE_ANALYTICS_GASV3: string;
declare const WEBSITE_ENV: string;
declare const DEFAULT_META_DESCRIPTION: string;
declare const BASE_TITLE: string;
