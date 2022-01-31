import { useAirtable } from 'painless-airtable';
import config from './config.yaml';

const { VITE_AIRTABLE_TOKEN: token } = import.meta.env;
const { base, DRAWINGS, CARDS } = config.api;

const airtable = useAirtable({ base, token });

export default {
  getDrawings: () => {
    const { table, options } = DRAWINGS;
    return airtable.select(table, options);
  },
  getCards: () => {
    const { table, options } = CARDS;
    return airtable.select(table, options);
  },
};
