<template>
  <div class="auth-container">
    <h2>{{ isRegistering ? "Créer un compte client" : "Connexion client" }}</h2>

    <form @submit.prevent="isRegistering ? register() : login()">
      <div v-if="isRegistering">
        <label>Nom :</label>
        <input type="text" v-model="name" required />

        <label>Adresse :</label>
        <input type="text" v-model="address" required />

        <label>Code postal :</label>
        <input type="text" v-model="zip" required />

        <label>Ville :</label>
        <input type="text" v-model="town" required />

        <label>Pays :</label>
        <select v-model="country_id" required>
          <option value="1">France</option>
          <option value="44">Madagascar</option>
          <!-- Ajoute plus de pays si nécessaire -->
        </select>

        <label>Téléphone :</label>
        <input type="tel" v-model="phone" required />
      </div>

      <label>Email :</label>
      <input type="email" v-model="email" required />

      <button type="submit">
        {{ isRegistering ? "Créer un compte" : "Se connecter" }}
      </button>

      <p class="toggle" @click="isRegistering = !isRegistering">
        {{ isRegistering ? "J'ai déjà un compte" : "Créer un compte" }}
      </p>

      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script>
import { postData, getData } from '@/util/api.js';

export default {
  name: 'LoginClient',
  data() {
    return {
      isRegistering: false,
      email: '',
      name: '',
      address: '',
      zip: '',
      town: '',
      country_id: '44', // Par défaut Madagascar
      phone: '',
      error: ''
    };
  },
  methods: {
    async login() {
      this.error = '';
      try {
        const result = await getData('thirdparties/email/' + this.email);
        
        sessionStorage.setItem('donneUser', JSON.stringify(result));
        this.$router.push('/boutique');
      } catch (err) {
        this.error = 'Erreur lors de la connexion.';
        console.error(err);
      }
    },
    async register() {
      this.error = '';
      try {
        const payload = {
          name: this.name,
          address: this.address,
          zip: this.zip,
          town: this.town,
          country_id: this.country_id,
          client: "1",
          email: this.email,
          phone: this.phone
        };

        const result = await postData('thirdparties', payload);

        if (result > 0) {
          alert('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
            this.isRegistering = false;
            const result = await getData('thirdparties/email/' + this.email);
            sessionStorage.setItem('donneUser', JSON.stringify(result));
            this.$router.push('/boutique');
            console.log(result);
        } else {
          this.error = 'Erreur lors de la création du compte.';
        }
      } catch (err) {
        this.error = "Impossible de créer le compte. L'email est peut-être déjà utilisé.";
        console.error(err);
      }
    }
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 420px;
  margin: auto;
  padding: 2rem;
  background-color: #1e1e1e;
  color: #f1f1f1;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

.auth-container h2 {
  text-align: center;
  margin-bottom: 1.5rem;
}

form label {
  display: block;
  margin-top: 1rem;
  font-weight: bold;
}

form input,
form select {
  width: 100%;
  padding: 0.6rem;
  margin-top: 0.4rem;
  border: 1px solid #444;
  border-radius: 6px;
  background-color: #2c2c2c;
  color: #fff;
}

button {
  width: 100%;
  padding: 0.8rem;
  margin-top: 1.5rem;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #555;
}

.toggle {
  cursor: pointer;
  color: #1e90ff;
  text-align: center;
  margin-top: 1rem;
  text-decoration: underline;
}

.error {
  color: #ff4b4b;
  margin-top: 1rem;
  text-align: center;
}
</style>
