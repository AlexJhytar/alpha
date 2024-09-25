import {createSharedPathnamesNavigation} from 'next-intl/navigation'

export const locales = ['en', 'ua'] as const;
export const localePrefix = 'as-needed';
export const {Link, useRouter} = createSharedPathnamesNavigation({locales});