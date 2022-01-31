import { useAirtable } from 'painless-airtable';
import { airtable } from '/@/config/apis.yaml';

const { VITE_AIRTABLE_TOKEN: token } = import.meta.env;

const api = useAirtable({ token });

export default {
  getExploreTrails: () => {
    const { table, options } = airtable.explore.trails;
    return api.select(table, options);
  },
  getFingerpaintDrawings: () => {
    const { table, options } = airtable.games.drawings;
    return api.select(table, options);
  },
  getMemoramaCards: () => {
    const { table, options } = airtable.games.cards;
    return api.select(table, options);
  },
  getGuides: () => {
    const { table, options } = airtable.guides.guides;
    return api.select(table, options);
  },
  getConcepts: () => {
    const { table, options } = airtable.discover.concepts;
    return api.select(table, options);
  },
};
