import GamesMenu from './views/GamesMenu.vue';
import Fingerpaint from './views/Fingerpaint.vue';
import Memorama from './views/Memorama.vue';

export default [
  { path: '', name: 'menu', component: GamesMenu },
  { path: 'fingerpaint', name: 'fingerpaint', component: Fingerpaint },
  { path: 'memorama', name: 'memorama', component: Memorama },
];
