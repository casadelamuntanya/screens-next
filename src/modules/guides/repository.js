import { useAirtable } from 'painless-airtable';
import config from './config.yaml';

const { VITE_AIRTABLE_TOKEN: token } = import.meta.env;
const { base, GUIDES } = config.api;

const airtable = useAirtable({ base, token });

export default {
  getGuides: () => {
    const { table, options } = GUIDES;
    return airtable.select(table, options);
  },
};
