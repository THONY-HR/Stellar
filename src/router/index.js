import { createRouter, createWebHistory } from 'vue-router';
import Accueil from '../views/Accueil.vue';
import Boutique from '../views/Boutique.vue';
import Panier from '../views/Panier.vue';
import Commande from '../views/Commande.vue';
import LoginClient from '../views/LoginClient.vue';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  { path: '/', name: 'Accueil', component: Accueil },
  { path: '/Boutique', name: 'boutique', component: Boutique },
  { path: '/Panier', name: 'panier', component: Panier },
  { path: '/Commande', name: 'Commande', component: Commande }, 
  { path: '/LoginClient', name: 'LoginClient', component: LoginClient }, 
  { path: '/Dashboard', name: 'Dashboard', component: Dashboard }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
