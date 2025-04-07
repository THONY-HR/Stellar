<script setup>
import { ref } from 'vue';

import validation from '../icon/SVG/validation.svg';
import FondGalerie from '@/assets/background/bikeFond.png';
import Marron from '@/assets/Bike/orange.png';
import Rouge from '@/assets/Bike/rouge.png';
import Vert from '@/assets/Bike/vert.png';

import BleuVL from '@/assets/Bike/velos/Bleu.png';
import OrangeVL from '@/assets/Bike/velos/Orange.png';
import RougeVL from '@/assets/Bike/velos/rouge.png';

const entering = ref(false);
const leaving = ref(false);

/*Partie velos*/
const activeBloc = ref(0)

const getStyle = (index, color) => ({
  width: activeBloc.value === index ? '60%' : '20%',
  backgroundColor: color,
  transition: 'all 0.6s ease',
  position: 'relative',
  overflow: 'hidden',
})

const getTitleStyle = (index) => ({
  position: 'absolute',
  top: '50px',
  left: activeBloc.value === index ? '50px' : '10px',
  color: '#FFFFFF',
  fontFamily: 'Poppins',
  fontWeight: '600',
  fontStyle: 'italic',
  fontSize: activeBloc.value === index ? '188px' : '230px',
  lineHeight: '1',
  transition: 'all 0.6s ease',
})

const getImageStyle = (index) => ({
  position: 'absolute',
  transform: `scale(${activeBloc.value === index ? 0.3 : 0.15})`,
  top: '-500px',
  left: activeBloc.value === index ? '-700px' : '-350px',
  transition: 'all 0.8s ease',
})

const getInfoContainerStyle = () => ({
  position: 'absolute',
  bottom: '40px',
  left: '0',
  right: '0',
  transition: 'all 0.6s ease',
})

const getInfoStyle = (index) => ({
  listStyle: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: activeBloc.value === index ? '3rem' : '1rem',
  color: '#FFFFFF',
  fontSize: activeBloc.value === index ? '1rem' : '0.6rem',
  transition: 'all 0.6s ease',
})

/*fin Partie velos*/
const idImage = ref(0);
const data = [
  {
    img: Vert,
    bloc:'#113030',
    fond: '#113030'
  },
  {
    img: Marron,
    bloc:'#3B1B01',
    fond: '#3B1B01'
  },
  {
    img: Rouge,
    bloc:'#850808',
    fond: '#381106'
  }
];

function bikeNext(arg) {
  if (arg === idImage.value) return;

  leaving.value = true;
  setTimeout(() => {
    idImage.value = arg;
    leaving.value = false;
    entering.value = true;

    setTimeout(() => {
      entering.value = false;
    }, 600); // Durée de l’animation
  }, 10);
}

</script>

<template>
    <div class="bloc caracteristique" id="caracteristique" :style="{ backgroundColor: data[idImage].fond }">
        <div class="contenu" style="position: absolute; margin-left: 100px; color: #FFFFFF;">
            <h1 style="font-family: 'Orbitron'; font-size: 70px; font-weight: 100; letter-spacing: 3px;">STELLAR-Z</h1>
            <h2 style="margin-top: 75px; font-family: 'Poppins'; font-weight: 300;">
                Carbon
                <p style="margin-top: -1px; margin-left: 25px;font-weight: 750;">CC</p>
            </h2>
            <div class="trait" style="
                position: absolute; 
                width: 1px; 
                height: 120px; 
                background-color: #FFFFFF; 
                margin-top: -120px; 
                margin-left: 150px;
            "></div>
            <p style="
                position: absolute;
                margin-top: -90px; 
                margin-left: 180px;
                font-family: 'Poppins';
                font-size: 12px;
                font-weight: 100;
            ">le Carbone CC est le choix premium <br>pour ceux qui recherchent un cadre plus <br>léger</p>
        </div>
        <img
            :src="data[idImage].img"
            alt="Vélo"
            class="bike-transition"
            :class="{ 'bike-enter': entering, 'bike-leave': leaving }"
        />

        <ul>
            <li>
                <div
                class="barColor"
                @click="bikeNext(0)"
                :style="{
                    backgroundColor: data[0].bloc,
                    border: idImage === 0 ? '3px solid white' : 'none'
                }"
                ></div>
            </li>
            <li>
                <div
                class="barColor"
                @click="bikeNext(1)"
                :style="{
                    backgroundColor: data[1].bloc,
                    border: idImage === 1 ? '3px solid white' : 'none'
                }"
                ></div>
            </li>
            <li>
                <div
                class="barColor"
                @click="bikeNext(2)"
                :style="{
                    backgroundColor: data[2].bloc,
                    border: idImage === 2 ? '3px solid white' : 'none'
                }"
                ></div>
            </li>
            </ul>

    </div>


    <div class="bloc galerie" id="galerie" 
        :style="{
            backgroundImage: `url(${FondGalerie})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: 'scale(1)'
        }"
    >
    </div>


    <div class="bloc rendez-vous" id="rendez-vous">
        <div class="container">
            <div class="title">
                <h1>Testez la puissance du 
                    <br>STELLAR Z en magasin !</h1>
                <div class="ligne" style="background-color: white; width: 580px; height: 1px;"></div>
            </div>
            <div class="corp">
                <h2>Prêt à vivre l’expérience 
                    <br>tout-terrain ultime ?</h2>
                <p>Prenez rendez-vous pour un essai 
                    <br>gratuit en magasin et ressentez 
                    <br>la différence !</p>
            </div>
            <div class="formulaire">
                <form action="#">
                    <input type="text" placeholder="Nom" style="width: 50%;">
                    <input type="text" placeholder="Prenom" style="width: 35%; margin-left: -2px;">
                        <br>
                    <input type="email" placeholder="Email" style="width: 87%;">
                        <br>
                    <input type="number" placeholder="+261" style="width: 15%;">
                    <input type="number" placeholder="Numero telephone" style="width: 70%; margin-left: -2px;">
                        <br>
                    <input type="date" style="width: 87%;">
                        <br>
                    <input type="button" value="Je prends rendez-vous" style="margin-top: 30px; height: 90px; width: 50%;">
                </form>
                <div class="popup-validation">
                    <div style="width: 100%;height: 100%; position: absolute; background-color: #E6DBD2; opacity: 26%;"></div>
                    <img :src="validation" alt="Next Icon" class="icon" />
                    <p>Rendez-vous Valider</p>
                </div>
            </div>
            <div class="ligne" style="position: absolute; background-color: white; width: 81%; height: 1px; margin-top: -70px;"/>
        </div>
    </div>

    
<div class="bloc velo" id="velo">
    <div class="bloc velo" id="velo" style="display: flex; width: 100vw; overflow: hidden;">
    <!-- Bloc 1 -->
    <div
      class="image"
      @click="activeBloc = 0"
      :style="getStyle(0, '#A44B35')"
    >
      <h1 :style="getTitleStyle(0)">BULLIT</h1>

      <img :src="OrangeVL" :style="getImageStyle(0)" />

      <div class="miniInfo" :style="getInfoContainerStyle(0)">
        <ul :style="getInfoStyle(0)">
          <li>Avant (MM)<p>160</p></li>
          <li class="separator"></li>
          <li>Arrière (MM)<p>160</p></li>
          <li class="separator"></li>
          <li>Poids (Kg)<p>15</p></li>
        </ul>
      </div>
    </div>

    <!-- Bloc 2 -->
    <div
      class="image"
      @click="activeBloc = 1"
      :style="getStyle(1, '#065C69')"
    >
      <h1 :style="getTitleStyle(1)">V10</h1>

      <img :src="BleuVL" :style="getImageStyle(1)" />

      <div class="miniInfo" :style="getInfoContainerStyle(1)">
        <ul :style="getInfoStyle(1)">
          <li>Avant (MM)<p>170</p></li>
          <li class="separator"></li>
          <li>Arrière (MM)<p>170</p></li>
          <li class="separator"></li>
          <li>Taille de roues max<p>MX</p></li>
          <li class="separator"></li>
          <li>Puissance (W)<p>780</p></li>
        </ul>
      </div>
    </div>

    <!-- Bloc 3 -->
    <div
      class="image"
      @click="activeBloc = 2"
      :style="getStyle(2, '#DC485A')"
    >
      <h1 :style="getTitleStyle(2)">HIGHTO<br>WER</h1>

      <img :src="RougeVL" :style="getImageStyle(2)" />

      <div class="miniInfo" :style="getInfoContainerStyle(2)">
        <ul :style="getInfoStyle(2)">
          <li>Avant (MM)<p>200</p></li>
          <li class="separator"></li>
          <li>Arrière (MM)<p>208</p></li>
          <li class="separator"></li>
          <li>Taille de roues<p>29/MX</p></li>
        </ul>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.separator {
  width: 1px;
  height: 40px;
  background-color: #FFFFFF;
  margin-top: 10px;
}
.image {
  height: 100vh;
}

.bloc {
    margin-left: -8px;
    width: 99vw;
    height: 100vh;
    overflow-y: auto;
    display: flex;
    font-weight: bold;
}

.caracteristique {
    margin-top: 734px;
    background-color: #ffffff; /* Aqua */
}
    .caracteristique img{
        scale: 0.7;
        margin-left: 80px;
    }
    .caracteristique ul{
        list-style: none;
        display: flex;
        z-index: 500;
        position: absolute;
        gap: 1rem;
        margin-top: 700px;
        margin-left: 30%;
    }
    .caracteristique ul li .barColor{
        width: 150px;
        height: 50px;
        border-color: none;
        cursor: pointer;
    }
    .bike-transition {
    transition: transform 0.6s ease, opacity 0.6s ease;
    opacity: 1;
    }

    .bike-enter {
    transform: translateX(-100%);
    opacity: 0;
    }

    .bike-leave {
    transform: translateX(-100%);
    opacity: 0;
    }

.galerie {
    background-color: #FF5733; /* Rouge orangé */
}

.rendez-vous {
    background-color: #0C0C0C;
}
    .rendez-vous .container{
        margin-top: -50px;
        margin-left: 100px;
    }
    .rendez-vous .container .title h1{
        margin-top: 200px;
        font-family: 'Orbitron','sans-serif';
        font-size: 30px;
        font-weight: 500;
        letter-spacing: 3px;
        color: #FFFFFF;
    }
    .rendez-vous .container .corp{
        margin-left: 100px;
    }
    .rendez-vous .container .corp h2{
        margin-top: 90px;
        font-family: 'Poppins','sans-serif';
        font-size: 26px;
        font-weight: 300;
        color: #FFFFFF;
    }
    .rendez-vous .container .corp p{
        font-family: 'Poppins','sans-serif';
        font-weight: 100;
        font-style: italic;
        font-size: 15px;
        color: #FFFFFF;
    }
    .rendez-vous .container .formulaire{
        position: relative;
        margin-top: -300px;
        margin-left: 130%;
        width: 500px;
        height: 500px;
        /* background-color: #00FFFF; */
    }
        .formulaire input::placeholder {
            padding-left: 20px;
            text-indent: 1px;
        }
        .formulaire input:focus  {
            padding-left: 2px;
        }
        .rendez-vous .container .formulaire form input{
            font-family: 'Poppins';
            height: 56px;
            color: #FFFFFF;
            margin-top: 10px;
            margin-right: 5px;
            margin-left: 40px;
            font-size: 13px;
            font-style: italic;
            background: transparent; /* Rend le fond transparent */
            border: 1px solid #FFFFFF; /* Ajoute une bordure légère pour visibilité */
            border-radius: 5px;
        }
        .rendez-vous .container .formulaire .popup-validation{
            position: absolute;
            width: 500px;
            height: 300px;
            margin-left: -350px;
            margin-top: -350px;
            text-align: center;
            font-family: 'Orbitron','sans-serif';
            font-size: 25px;
            font-weight: 200;
            color: #FFFFFF;
            visibility: hidden;
            /* eto izao .... */
        }
.icon {
    width: 200px;
    height: 200px;
    margin-bottom: -20px;
}

.velo {
    background-color: #5733FF; /* Bleu violet */
}
</style>
