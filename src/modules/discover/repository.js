import { useAirtable } from 'painless-airtable';
import config from './config.yaml';

const { VITE_AIRTABLE_TOKEN: token } = import.meta.env;
const { base, CONCEPTS } = config.api;

const airtable = useAirtable({ base, token });

export default {
  getConcepts: () => {
    const { table, options } = CONCEPTS;
    return airtable.select(table, options);
  },
};
