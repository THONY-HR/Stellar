<template>
    <div class="auth-container">
      <h2>{{ isRegistering ? "Créer un compte client" : "Connexion client" }}</h2>
  
      <form @submit.prevent="isRegistering ? register() : login()">
        <div>
          <label>Email :</label>
          <input type="email" v-model="email" required />
        </div>
  
        <div>
          <label>Mot de passe :</label>
          <input type="password" v-model="password" required />
        </div>
  
        <div v-if="isRegistering">
          <label>Nom :</label>
          <input type="text" v-model="lastname" required />
  
          <label>Prénom :</label>
          <input type="text" v-model="firstname" required />
        </div>
  
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
  import { postData } from '@/util/api.js';
  
  export default {
    name: 'LoginClient',
    data() {
      return {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        error: '',
        isRegistering: false,
        gender: 'f'
      };
    },
    methods: {
      async login() {
        this.error = '';
        try {
          const payload = {
            login: this.email,
            password: this.password
          };
  
          const result = await postData('login', payload);
  
          if (result.token) {
            localStorage.setItem('dolibarr_token', result.token);
            this.$router.push('/boutique');
          } else {
            this.error = 'Identifiants invalides.';
          }
        } catch (err) {
          this.error = 'Erreur lors de la connexion.';
          console.error(err);
        }
      },
  
      async register() {
        this.error = '';
        try {
          const payload = {
            login: this.email,
            password: this.password,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname,
            admin: 0,
            employee: 0,
            gender: this.gender || 'f', // Gender par défaut à 'f'
            statut: 1
          };
  
          const result = await postData('users', payload);
  
          if (result.id) {
            alert('Compte créé avec succès. Vous pouvez maintenant vous connecter.');
            this.isRegistering = false; // Permet de passer à l'écran de connexion
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
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .toggle {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    margin-top: 1rem;
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
  </style>
  