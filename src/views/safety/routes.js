import SafetyGeneral from './SafetyGeneral.vue';
import SafetyRescue from './SafetyRescue.vue';
import SafetyEquipment from './SafetyEquipment.vue';
import SafetyWildlife from './SafetyWildlife.vue';
import SafetyThunderstorm from './SafetyThunderstorm.vue';

export default [
	{ path: '', name: 'general', component: SafetyGeneral },
	{ path: 'rescue', name: 'rescue', component: SafetyRescue },
	{ path: 'equipment', name: 'equipment', component: SafetyEquipment },
	{ path: 'wildlife', name: 'wildlife', component: SafetyWildlife },
	{ path: 'thunderstorm', name: 'thunderstorm', component: SafetyThunderstorm },
];
