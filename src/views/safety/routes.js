import SafetyGeneral from './SafetyGeneral.vue';
import SafetyRescue from './SafetyRescue.vue';
import SafetyEquipment from './SafetyEquipment.vue';

export default [
	{ path: '', name: 'general', component: SafetyGeneral },
	{ path: 'rescue', name: 'rescue', component: SafetyRescue },
	{ path: 'equipment', name: 'equipment', component: SafetyEquipment },
];
