import localization from './localization';

export const BASE_URL = 'https://canteen-mgmt.firebaseio.com';

export const FILE_SIZE = 4; // 4MB
/** localization */
export const langs = localization;

export const itemCategories = [
  {
    label: 'Breakfast',
    value: 'Breakfast',
  },
  {
    label: 'Lunch',
    value: 'Lunch',
  },
  {
    label: 'Snacks',
    value: 'Snacks',
  },
  {
    label: 'Dinner',
    value: 'Dinner',
  },
  {
    label: 'Juice',
    value: 'Juice',
  },
];
