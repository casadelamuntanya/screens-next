import SafetyGeneral from './views/SafetyGeneral.vue';
import SafetyRescue from './views/SafetyRescue.vue';
import SafetyEquipment from './views/SafetyEquipment.vue';
import SafetyWildlife from './views/SafetyWildlife.vue';
import SafetyThunderstorm from './views/SafetyThunderstorm.vue';
import SafetyHypothermia from './views/SafetyHypothermia.vue';

export default [
  { path: '', name: 'general', component: SafetyGeneral },
  { path: 'rescue', name: 'rescue', component: SafetyRescue },
  { path: 'equipment', name: 'equipment', component: SafetyEquipment },
  { path: 'wildlife', name: 'wildlife', component: SafetyWildlife },
  { path: 'thunderstorm', name: 'thunderstorm', component: SafetyThunderstorm },
  { path: 'hypothermia', name: 'hypothermia', component: SafetyHypothermia },
];
