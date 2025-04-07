<script setup>
import { ref, computed, onMounted } from 'vue'
import { getData } from '@/util/api.js'

import bike1 from '@/assets/Bike/bike.png'
var baseURL = "http://localhost/dolibarr-21.0.0/documents/produit/"
const products = ref([]);
const produits = ref([]);
const categories = ref([]);

const loadProducts = async () => {
  try {
    const data = await getData('products'); // appelle ton API Dolibarr
    const categoriesData = await getData('categories?sortfield=t.rowid&sortorder=ASC&limit=50');
    for (let index = 0; index < categoriesData.length; index++) {
      categories.value.push(categoriesData[index].label);
    }
    products.value = data;

    for (let index = 0; index < products.value.length; index++) {
      var urlImage = await getData('documents?modulepart=product&id=' + products.value[index].id);
      var cat = await getData('products/' + products.value[index].id +'/categories?sortfield=s.rowid&sortorder=ASC');
      // Construction de l'URL relative de l'image
      const imageUrl = `${baseURL}/${urlImage[index].level1name}/${urlImage[0].relativename}`;
      produits.value.push({
        id: products.value[index].id,
        nom: products.value[index].label,
        prix: products.value[index].price,
        description: products.value[index].description,
        image: imageUrl, // URL relative
        categorie: cat[0].label
      });
    }
  } catch (err) {
    console.error('Erreur chargement produits:', err);
  }
}


onMounted(() => {
  loadProducts()
})

const selectedCategorie = ref('Tous')
const searchQuery = ref('')

const produitsFiltres = computed(() => {
  return produits.value.filter(produit => {
    const matchCategorie =
      selectedCategorie.value === 'Tous' || produit.categorie === selectedCategorie.value
    const matchNom = produit.nom.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategorie && matchNom
  })
})

const ajouterAuPanier = (produit) => {
  let panier = JSON.parse(sessionStorage.getItem('panier')) || []
  const produitExistant = panier.find(item => item.id === produit.id)

  if (produitExistant) {
    alert(`${produit.nom} est déjà dans votre panier !`)
  } else {
    panier.push(produit)
    sessionStorage.setItem('panier', JSON.stringify(panier))
    console.log('Panier :', panier)
    alert(`${produit.nom} ajouté au panier !`)
  }
}
</script>


<template>
  <div class="filtrage">
    <select v-model="selectedCategorie">
      <option v-for="categorie in categories" :key="categorie" :value="categorie">{{ categorie }}</option>
    </select>

    <!-- Recherche par nom -->
    <input v-model="searchQuery" type="text" placeholder="Rechercher un produit" />
  </div>

  <div class="bloc liste-produit" id="liste-produit">
    <div
      v-for="produit in produitsFiltres"
      :key="produit.id"
      class="carte-produit"
    >
      <div class="image-container">
        <img :src="produit.image" alt="image produit" />
      </div>
      <h3>{{ produit.nom }}</h3>
      <p>{{ produit.description }}</p>
      <p class="prix">Prix : {{ produit.prix }} €</p>
      <button @click="ajouterAuPanier(produit)">Ajouter au panier</button>
    </div>
  </div>
</template>

<style scoped>
.filtrage {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #f1f1f1; /* Légère couleur de fond */
  border-radius: 8px;
}

.filtrage select, .filtrage input {
  padding: 0.5rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

.bloc {
  margin-left: -8px;
  width: 95vw;
  min-height: 100vh;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  justify-content: center;
  font-weight: bold;
  background-color: #f8f9fa;
}
.liste-produit{
    margin-top: 50px;
}
.carte-produit {
  width: 320px;
  border: 1px solid #ccc;
  border-radius: 16px;
  padding: 1rem;
  background-color: white;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.carte-produit:hover {
  transform: scale(1.02);
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Couvre bien la boîte sans déformer */
}

.carte-produit h3 {
  margin: 0.5rem 0;
}

.carte-produit .prix {
  color: #00aaff;
  margin-top: 0.5rem;
}

.carte-produit button {
  margin-top: 1rem;
  background-color: #00c3ff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.carte-produit button:hover {
  background-color: #009ac7;
}
</style>
