<script setup>
import { ref, onMounted } from 'vue';

const commandes = ref([]);

// Charger l'historique des commandes depuis sessionStorage
onMounted(() => {
  const commandesData = JSON.parse(sessionStorage.getItem('commandeHistory')) || [];
  commandes.value = commandesData;
});

// Fonction pour voir les détails d'une commande spécifique
const voirDetails = (idCommande) => {
  // Rechercher la commande spécifique dans les données stockées
  const commandeDetail = commandes.value.find(commande => commande.idCommande === idCommande);
  
  if (commandeDetail) {
    const produitsDetails = commandeDetail.produits.map(produit => 
      `${produit.nom} (Quantité: ${produit.quantite}, Prix: ${produit.prix} €)`
    ).join("\n");

    alert(`Détails de la commande ${idCommande} :\n${produitsDetails}\nTotal: ${commandeDetail.total} €`);
  } else {
    alert('Commande non trouvée.');
  }
};
</script>


<template>
  <div class="commande-list">
    <h2>Historique des Commandes</h2>

    <div v-if="commandes.length === 0">
      <p>Vous n'avez pas encore passé de commande.</p>
    </div>
    
    <div v-else>
      <div 
        v-for="commande in commandes" 
        :key="commande.idCommande" 
        class="commande-card"
      >
        <h3>Commande ID : {{ commande.idCommande }}</h3>
        <p>Total : {{ commande.total }} €</p>
        <button @click="voirDetails(commande.idCommande)" class="btn-details">Voir Détails</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.commande-list {
  padding: 2rem;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

.commande-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  transition: box-shadow 0.3s ease;
}

.commande-card:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
}

.commande-card h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.commande-card p {
  font-size: 1rem;
  color: #777;
  margin-bottom: 1rem;
}

.btn-details {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-details:hover {
  background-color: #0056b3;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .commande-list {
    padding: 1rem;
  }

  .commande-card {
    padding: 1rem;
  }

  .btn-details {
    width: 100%;
  }
}
</style>
