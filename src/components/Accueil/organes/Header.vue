<script setup>
import Navigation from "../molecules/Navigation.vue";
import Button from "../molecules/Button.vue";
import nextIcon from '../icon/SVG/next.svg';
</script>

<template>
    <div id="nav">
        <Navigation />
    </div>
    <div id="backgroundVideo">
        <video autoplay loop muted playsinline>
            <source src="../../../assets/video/BackGround.mp4" type="video/mp4">
        </video>
    </div>
    <div class="titre">
        <p>
            Dominez tous les 
            <br>terrains avec une 
            <br>puissance inégalée.
        </p>
        <a href="#rendez-vous">
            <Button style="margin-top: 50px;">Je veux essayer</Button>
        </a>
        <a href="#caracteristique" class="caracterStyle">
            <div class="icon-container">
                <img :src="nextIcon" alt="Next Icon" class="icon" />
                <img :src="nextIcon" alt="Next Icon" class="icon hover-icon" />
            </div>
        </a>
    </div>
</template>

<style scoped>
#nav{
    z-index: 1000;
}

#backgroundVideo {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: -1;
}

#backgroundVideo video {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translate(-50%, -50%) scale(1);
}

.titre {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    z-index: 500;
    width: 100%;
}

.titre p {
    font-family: "Exo 2", sans-serif;
    font-weight: 800;
    color: #FFFFFF;
    font-size: 40px;
    margin-top: 12%;
}

.caracterStyle {
    display: block;
    text-align: center;
    margin-top: 70px;
    text-decoration: none;
}

.icon-container {
    position: relative;
    display: inline-block;
}

.icon {
    width: 40px;
    height: 40px;
    transform: rotate(90deg);
    transition: all 0.3s ease;
}
.icon:hover{
    filter: brightness(0) saturate(100%) invert(64%) sepia(12%) saturate(500%) hue-rotate(180deg);
}

.hover-icon {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all 0.3s ease;
}

.caracterStyle:hover .hover-icon {
    opacity: 100;
    transform: rotate(90deg) translate(20px, 0px);
    filter: brightness(0) saturate(100%) invert(64%) sepia(12%) saturate(500%) hue-rotate(180deg);
}
</style>
