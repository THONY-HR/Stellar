<script setup>
    import Button from "../molecules/Button.vue";
</script>
<template>
    <div class="bloc caracteristique" id="caracteristique">Caractéristiques</div>
    <div class="bloc galerie" id="galerie">Galerie</div>
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
                    <input type="date" placeholder="Date de Rendez-vous xx/xx/xxxx  - 00:00" style="width: 87%;">
                        <br>
                    <input type="button" value="Je prends rendez-vous">
                </form>
            </div>
        </div>
    </div>
    <div class="bloc velo" id="velo">Vélo</div>
</template>

<style scoped>
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
    background-color: #00FFFF; /* Aqua */
}

.galerie {
    background-color: #FF5733; /* Rouge orangé */
}

.rendez-vous {
    background-color: #0C0C0C; /* Vert */
}
    .rendez-vous .container{
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
    .rendez-vous .container .formulaire{
        position: relative;
        margin-top: -230px;
        margin-left: 130%;
        width: 500px;
        height: 500px;
        /* background-color: #00FFFF; */
    }
        .formulaire input::placeholder {
            padding-left: 20px;
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

.velo {
    background-color: #5733FF; /* Bleu violet */
}
</style>
