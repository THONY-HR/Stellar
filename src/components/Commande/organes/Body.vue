<script setup>
import { ref, onMounted } from 'vue';
import { getData } from '@/util/api.js';
import * as XLSX from 'xlsx';

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
  return statusClasses[statusCode] || "status-inconnu";
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

const isPdfAvailable = (refCommande) => true;

const telechargerFacture = (refCommande) => {
  const pdfUrl = `http://localhost/dolibarr-21.0.0/documents/commande/${refCommande}/${refCommande}.pdf`;
  window.open(pdfUrl, '_blank');
};

// 📁 Exportation globale JSON
const exporterJSON = () => {
  const dataFiltree = commandes.value.map(c => ({
    ref: c.ref,
    date: c.date,
    total_ht: c.total_ht,
    status: getStatusLabel(c.status),
    lignes: c.lines?.map(l => ({
      description: l.desc,
      quantite: l.qty,
      prix_unitaire: l.subprice
    })) || []
  }));
  const blob = new Blob([JSON.stringify(dataFiltree, null, 2)], { type: 'application/json' });
  telechargerBlob(blob, 'commandes.json');
};

// 📄 Exportation globale CSV
const exporterCSV = () => {
  const headers = ['Référence', 'Total HT', 'Statut'];
  const rows = commandes.value.map(c => [
    `"${c.ref}"`, `"${c.total_ht}"`, `"${getStatusLabel(c.status)}"`
  ]);
  const csv = [headers, ...rows].map(e => e.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  telechargerBlob(blob, 'commandes.csv');
};

// 📊 Export Excel
const exporterExcel = () => {
  const data = commandes.value.map(c => ({
    Référence: c.ref,
    Date: c.date,
    'Total HT': c.total_ht,
    Statut: getStatusLabel(c.status)
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Commandes');
  XLSX.writeFile(wb, 'commandes.xlsx');
};

// 📥 Téléchargement Blob
const telechargerBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

// 🎯 Export individuel
const exporterCommande = (commande, type) => {
  const data = {
    ref: commande.ref,
    date: commande.date,
    total_ht: commande.total_ht,
    status: getStatusLabel(commande.status),
    lignes: commande.lines?.map(l => ({
      description: l.desc,
      quantite: l.qty,
      prix_unitaire: l.subprice
    })) || []
  };

  if (type === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    telechargerBlob(blob, `commande-${commande.ref}.json`);
  } else if (type === 'csv') {
    const headers = ['Description', 'Quantité', 'Prix Unitaire'];
    const lignes = data.lignes.map(l => [`"${l.description}"`, l.quantite, l.prix_unitaire]);
    const csv = [['Référence', commande.ref], ['Date', commande.date], ['Statut', data.status], [], headers, ...lignes].map(e => e.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    telechargerBlob(blob, `commande-${commande.ref}.csv`);
  } else if (type === 'excel') {
    const lignes = data.lignes.map(l => ({
      Description: l.description,
      Quantité: l.quantite,
      'Prix Unitaire': l.prix_unitaire
    }));
    const ws = XLSX.utils.json_to_sheet(lignes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `Commande-${commande.ref}`);
    XLSX.writeFile(wb, `commande-${commande.ref}.xlsx`);
  }
};
</script>

<template>
  <div class="commande-list">
    <h2>Historique des Commandes</h2>

    <!-- ✅ Exportations globales -->
    <div style="margin-bottom: 1rem;">
      <button @click="exporterJSON" class="btn-details">📁 Exporter en JSON</button>
      <button @click="exporterCSV" class="btn-details">📄 Exporter en CSV</button>
      <button @click="exporterExcel" class="btn-details">📊 Exporter en Excel</button>
    </div>

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

        <p :class="getStatusClass(commande.status)">
          Statut : <strong>{{ getStatusLabel(commande.status) }}</strong>
        </p>

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

          <!-- ✅ Export individuel -->
          <select @change="event => exporterCommande(commande, event.target.value)" class="btn-details">
            <option disabled selected>Exporter cette commande</option>
            <option value="json">📁 JSON</option>
            <option value="csv">📄 CSV</option>
            <option value="excel">📊 Excel</option>
          </select>
        </div>
      </div>
    </div>

    <!-- ✅ Détails commande -->
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
  background-color: #0e0f0f;
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
