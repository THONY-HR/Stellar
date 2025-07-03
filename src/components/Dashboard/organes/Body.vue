<template>
  <div class="dashboard">
    <!-- Résumé des ventes -->
    <div class="kpis grid grid-cols-4 gap-20">
      <div class="card p-4 bg-white rounded shadow">
        <h3>Total des ventes</h3>
        <p>{{ totalSales }} Ar</p>
      </div>
      <div class="card p-4 bg-white rounded shadow">
        <h3>Produits en stock</h3>
        <p>{{ totalProducts }}</p>
      </div>
      <div class="card p-4 bg-white rounded shadow">
        <h3>Clients</h3>
        <p>{{ totalClients }}</p>
      </div>
      <!-- <div class="card p-4 bg-white rounded shadow">
        <h3>Mouvements de stock</h3>
        <p>{{ stockMovements.length }}</p>
      </div> -->
    </div>

    <!-- Graphiques -->
    <div class="charts mt-8">
      <!-- Graphique des ventes -->
      <div class="chart p-4 bg-white rounded shadow">
        <h3>Graphique des Ventes</h3>
        <Line :data="salesChartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Dernières commandes -->
    <div class="orders mt-8 p-4 bg-white rounded shadow">
      <h3>Dernières commandes</h3>
      <ul>
        <li v-for="order in recentOrders" :key="order.id">
          Commande -{{ order.id }} - {{ order.total }} Ar
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Line } from 'vue-chartjs';
import { ref, onMounted } from 'vue';
import { getData } from '@/util/api.js'; // Ton fichier api.js personnalisé

// Import des composants nécessaires depuis Chart.js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement
} from 'chart.js';

// Enregistrement des composants pour Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale, ArcElement);

export default {
  name: 'Dashboard',
  components: {
    Line
  },
  setup() {
    const totalSales = ref(0);
    const totalProducts = ref(0);
    const totalClients = ref(0);
    const stockMovements = ref([]);
    const salesData = ref([]);
    const recentOrders = ref([]);

    const salesChartData = ref({
      labels: [], // Dates ou périodes
      datasets: [
        {
          label: 'Ventes',
          data: [],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    });

    const chartOptions = {
      responsive: true,
      scales: {
        x: {
          type: 'category',
          beginAtZero: true
        },
        y: {
          type: 'linear',
          beginAtZero: true
        }
      }
    };

    // (Optionnel) Fonction de formatage de date si nécessaire
    const formatDate = (dolibarrDate) => {
      // Exemple : convertir "20240407110000" en "2024-04-07"
      if (typeof dolibarrDate === 'string' && dolibarrDate.length >= 8) {
        const year = dolibarrDate.substring(0, 4);
        const month = dolibarrDate.substring(4, 6);
        const day = dolibarrDate.substring(6, 8);
        return `${year}-${month}-${day}`;
      }
      return dolibarrDate;
    };

    onMounted(async () => {
      try {
        // Récupération des données via l'API Dolibarr
        const orders = await getData('orders');
        // On suppose ici que chaque commande a un champ "total" (ou total_ht / total_ttc à adapter)
        totalSales.value = orders.reduce((sum, order) => sum + parseFloat(order.total), 0).toFixed(2);
        recentOrders.value = orders.slice(0, 5);

        const products = await getData('products');
        totalProducts.value = products.length;

        const clients = await getData('thirdparties');
        totalClients.value = clients.length;

        const stock = await getData('stockmovements');
        stockMovements.value = stock;

        // Préparation des données pour le graphique des ventes
        // On formate la date si besoin
        const sales = orders.map(order => ({
          date: formatDate(order.date_creation),
          total: parseFloat(order.total)
        }));

        salesData.value = sales;
        salesChartData.value.labels = sales.map(sale => sale.date);
        salesChartData.value.datasets[0].data = sales.map(sale => sale.total);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error.message);
      }
    });

    return {
      totalSales,
      totalProducts,
      totalClients,
      stockMovements,
      salesChartData,
      chartOptions,
      recentOrders
    };
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.kpis {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.card {
  border: 1px solid #ddd;
}

.charts {
  margin-top: 40px;
}

.orders {
  margin-top: 40px;
}
</style>
