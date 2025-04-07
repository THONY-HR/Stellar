<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '@/util/api.js';

const commandes = ref([]);
const commandeActive = ref(null);
const showModal = ref(false);
let donneUser = null;

const formatMontant = (montant) => {
  return parseFloat(montant).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const getStatusLabel = (statusCode) => {
  const map = {
    "0": "non validée",
    "1": "Validée",
    "2": "Expédiée",
    "3": "Livrée",
    "4": "Facturée",
    "5": "Annulée"
  };
  return map[statusCode] || "Inconnu";
};

const getStatusClass = (statusCode) => {
  const statusClasses = {
    "0": "status-non-validee",
    "1": "status-validee",
    "2": "status-expediee",
    "3": "status-livree",
    "4": "status-facturee",
    "5": "status-annulee"
  };
  return statusClasses[statusCode] || "status-inconnu"; // Par défaut si inconnu
};


const chargerCommandesDepuisDolibarr = async () => {
  try {
    const endpoint = `orders?sqlfilters=(fk_soc:=:${donneUser.id})`;
    const data = await getData(endpoint);
    commandes.value = Array.isArray(data) ? data : [data];
    sessionStorage.setItem('commandeHistory', JSON.stringify(data));
  } catch (error) {
    console.error("Erreur lors du chargement des commandes :", error.message);
  }
};

onMounted(async () => {
  try {
    donneUser = JSON.parse(sessionStorage.getItem('donneUser'));
    if (donneUser?.id) {
      await chargerCommandesDepuisDolibarr();
    }
  } catch (error) {
    console.error("Erreur de lecture dans le sessionStorage :", error.message);
  }
});

const voirDetails = (idCommande) => {
  const commande = commandes.value.find(c => c.id == idCommande);
  if (commande) {
    commandeActive.value = commande;
    showModal.value = true;
  }
};

const fermerPopup = () => {
  showModal.value = false;
};

const isPdfAvailable = (refCommande) => {
  const pdfUrl = `http://localhost/dolibarr-21.0.0/documents/commande/${refCommande}/${refCommande}.pdf`;
  // On vérifie si l'URL du fichier existe en faisant une requête simple
  // Dans un cas réel, il faudra peut-être vérifier via un appel AJAX pour tester l'existence du fichier
  return true; // Pour l'instant, on suppose que le fichier est toujours disponible
};

const telechargerFacture = (refCommande) => {
  const pdfUrl = `http://localhost/dolibarr-21.0.0/documents/commande/${refCommande}/${refCommande}.pdf`;
  window.open(pdfUrl, '_blank');
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
        :key="commande.id" 
        class="commande-card"
      >
        <h3>Commande Réf. : {{ commande.ref }}</h3>
        <p>Total : {{ formatMontant(commande.total_ht) }} MGA</p>
        
        <!-- Statut avec couleur dynamique -->
        <p :class="getStatusClass(commande.status)">
          Statut : <strong>{{ getStatusLabel(commande.status) }}</strong>
        </p>

        <!-- Conteneur des boutons -->
        <div class="button-container">
          <button 
            v-if="commande.status === '1'" 
            :disabled="!isPdfAvailable(commande.ref)" 
            @click="telechargerFacture(commande.ref)"
            class="btn-details"
          >
            Télécharger la facture
          </button>

          <button @click="voirDetails(commande.id)" class="btn-details">Voir Détails</button>
        </div>
      </div>
    </div>

    <!-- ✅ Popup -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Détails de la commande {{ commandeActive.ref }}</h3>
        <ul>
          <li v-for="(line, index) in commandeActive.lines" :key="index">
            {{ line.desc || 'Produit' }} - Quantité : {{ line.qty }}, Prix : {{ formatMontant(line.subprice) }} MGA
          </li>
        </ul>
        <p class="total">Total : {{ formatMontant(commandeActive.total_ht) }} MGA</p>
        <button @click="fermerPopup" class="btn-fermer">Fermer</button>
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

.button-container {
  display: flex;
  justify-content: flex-end; /* Aligner les boutons à droite */
  margin-top: 1rem;
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
  margin-left: 1rem;
}

.btn-details:hover {
  background-color: #0056b3;
}

/* ✅ Style de la popup */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.modal-content h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
}

.modal-content ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.modal-content li {
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #555;
}

.modal-content .total {
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.1rem;
}

.btn-fermer {
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

.btn-fermer:hover {
  background-color: #c82333;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .commande-list {
    padding: 1rem;
  }

  .commande-card {
    padding: 1rem;
  }

  .btn-details, .btn-fermer {
    width: 100%;
  }

  .modal-content {
    padding: 1.5rem;
  }
}
</style>
