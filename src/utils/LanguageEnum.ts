export const LANGUAGES = {
  KO_KR: {
    value: 'ko_KR',
    label: '🇰🇷 KO',
  },
  EN_US: {
    value: 'en_US',
    label: '🇺🇸 EN',
  },
  ZH_CN: {
    value: 'zh_CN',
    label: '🇨🇳 CN',
  },
  FR_FR: {
    value: 'fr_FR',
    label: '🇫🇷 FR',
  },
} as const;
type LANGUAGES = typeof LANGUAGES[keyof typeof LANGUAGES];
