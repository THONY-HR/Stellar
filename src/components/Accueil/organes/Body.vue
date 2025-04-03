<script setup>
    import validation from '../icon/SVG/validation.svg';
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
