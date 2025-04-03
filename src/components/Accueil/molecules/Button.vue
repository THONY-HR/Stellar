<template>
    <div class="button" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
        <div class="bloc"></div>
        <img :src="nextIcon" alt="Next Icon" class="icon" />
        <span class="text">
            <slot></slot>
        </span>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import nextIcon from '../icon/SVG/next.svg'; // ✅ Importation correcte de l'icône SVG

const isHovered = ref(false);

const handleMouseOver = () => {
    isHovered.value = true;
};

const handleMouseLeave = () => {
    isHovered.value = false;
};
</script>

<style scoped>
.button {
    font-family: 'Poppins', sans-serif;
    color: #FFFFFF;
    font-size: 20px;
    font-weight: 250;
    position: relative;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s ease;
}

.button:hover {
    color: #FFFFFF;
}

.button .bloc {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #FFFFFF;
    width: 420px;
    height: 83px;
    border-radius: 8px;
    transition: all 0.3s ease;
    z-index: -1;
}

.button:hover .bloc {
    /* background-color: #FFFFFF; */
    width: 440px; /* Augmente la largeur au survol */
    height: 90px;
}

.text {
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
}

.button:hover .text {
    transform: translateX(5px); /* Déplace légèrement le texte vers la droite */
}

.icon {
    width: 25px; /* Taille par défaut de l'icône */
    height: 25px;
    margin-left: 10px;
    transition: all 0.3s ease;
}

.button:hover .icon {
    width: 30px; /* Agrandit l'icône */
    height: 30px;
    transform: translateX(5px); /* Déplace l'icône vers la droite */
}
</style>
