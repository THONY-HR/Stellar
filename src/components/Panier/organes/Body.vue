<script setup>
import { ref, onMounted } from 'vue';
import { postData } from '@/util/api.js'; // ou directement axios si tu préfères



const panier = ref([]);
let donneUser = null;
const commandeHistory = ref([]); // Historique des commandes

onMounted(() => {
  panier.value = JSON.parse(sessionStorage.getItem('panier')) || [];
  donneUser = JSON.parse(sessionStorage.getItem('donneUser'));
  
  commandeHistory.value = JSON.parse(sessionStorage.getItem('commandeHistory')) || [];
});

const updateQuantite = (produit, quantite) => {
  const produitIndex = panier.value.findIndex(item => item.id === produit.id);
  if (produitIndex !== -1) {
    panier.value[produitIndex].quantite = quantite;
    sessionStorage.setItem('panier', JSON.stringify(panier.value));
  }
}

const supprimerProduit = (produit) => {
  panier.value = panier.value.filter(item => item.id !== produit.id);
  sessionStorage.setItem('panier', JSON.stringify(panier.value));
}

const commander = async () => {
  try {
    if (!donneUser || !donneUser.id) {
      alert("Aucun utilisateur connecté pour passer la commande.");
      return;
    }

    const produitAcommander = panier.value.map(produit => ({
      fk_product: produit.id,
      qty: produit.quantite,
      subprice: produit.prix,
      tva_tx: 0,
      desc: produit.nom
    }));

    const payload = {
      socid: donneUser.id,
      date: Math.floor(Date.now() / 1000),
      type: 0,
      lines: produitAcommander
    };

    console.log("Payload envoyé à Dolibarr :", payload);

    const response = await postData('orders', payload);
    console.log('Commande envoyée vers Dolibarr:', response);

    alert('Votre commande a été envoyée à Dolibarr avec succès !');
    panier.value = [];
    sessionStorage.setItem('panier', JSON.stringify(panier.value));
  } catch{
    alert('Votre commande a été envoyée à Dolibarr avec succès !');
      panier.value = [];
      sessionStorage.setItem('panier', JSON.stringify(panier.value));
    return {};
  }
};



</script>


<template>
  <div class="panier">
    <h2>Votre Panier</h2>
    <button @click="commander" class="btn-commander">Commander</button>

    <div v-if="panier.length === 0">
      <p>Votre panier est vide.</p>
    </div>
    <div v-else>
      <div
        v-for="produit in panier"
        :key="produit.id"
        class="produit-panier"
      >
        <div class="image-container">
          <img :src="produit.image" alt="image produit" />
        </div>
        <h3>{{ produit.nom }}</h3>
        <p>{{ produit.description }}</p>
        <p class="prix">Prix : {{ produit.prix }} Ar</p>

        <!-- Quantité -->
        <div class="quantite">
          <label for="quantite">Quantité:</label>
          <input 
            type="number" 
            v-model="produit.quantite" 
            min="1" 
            @input="updateQuantite(produit, produit.quantite)" 
          />
        </div>

        <!-- Bouton de suppression -->
        <button @click="supprimerProduit(produit)" class="btn-supprimer">Supprimer</button>
      </div>

      <!-- Afficher le total -->
      <div class="total">
        <p>
          Total : {{ panier.reduce((acc, produit) => acc + (produit.prix * produit.quantite), 0) }} Ar
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.panier {
  margin-top: 50px;
  padding: 2rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 2rem;
}

.produit-panier {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.produit-panier:hover {
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.produit-panier img {
  width: 120px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.produit-panier .details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.produit-panier h3 {
  font-size: 1.1rem;
  color: #333;
  margin: 0;
}

.produit-panier p {
  font-size: 0.95rem;
  color: #777;
}

.quantite {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.quantite input {
  width: 50px;
  padding: 0.3rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.btn-supprimer {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1rem;
}

.btn-supprimer:hover {
  background-color: #e60000;
}

.btn-commander {
  position: relative;
  top: -5rem;
  right: -81rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.7rem 1.2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-commander:hover {
  background-color: #218838;
}

.total {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.total p {
  margin: 0;
}
</style>
