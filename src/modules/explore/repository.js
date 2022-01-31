import { useAirtable } from 'painless-airtable';
import config from './config.yaml';

const { VITE_AIRTABLE_TOKEN: token } = import.meta.env;
const { base, TRAILS } = config.api;

const airtable = useAirtable({ base, token });

export default {
  getTrails: () => {
    const { table, options } = TRAILS;
    return airtable.select(table, options);
  },
};
