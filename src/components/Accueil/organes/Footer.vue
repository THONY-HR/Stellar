<script setup>
    import Logo from "@/assets/logo.png";

    import Facebook from "@/assets/icon/fb.png";
    import Insta from "@/assets/icon/insta.png";
    import Twitter from "@/assets/icon/tw.png";
    import Watsapp from "@/assets/icon/wts.png";
    import YouTube from "@/assets/icon/yt.png";

</script>
<template>
    <div class="bloc footer" id="footer">
        <h1>"STELLAR – L’audace de l’innovation, 
            <br>la maîtrise du terrain."</h1>
        <div class="contact" style="
            position: absolute; 
            margin-top: 200px; 
            font-family: 'Exo 2';
            font-weight: 200;
            font-size: 18px;
            margin-left: 60px;
        ">
            <ul class="liste">
                <li>
                    <ul>
                        <li>A.V de L'independance,  Antananarivo, Madagascar</li>
                        <li>Lundi - Samedi : 9h - 19h</li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li>+261 38 22 222 02</li>
                        <li>stellar-bike@z.com</li>
                    </ul>
                </li>
            </ul>
            <div style="
                width: 100%; 
                height: 0.5px; 
                background-color: #FFFFFF; 
                margin-left: 40px;
                margin-top: 50px;
            "></div>
        </div>
        <div class="lien">
            <ul style="
                list-style: none;
                margin-top: 520px;
            ">
                <li><a href="#velo">Vélos</a></li>
                <li style="color: #DA2121;"><a href="#caracteristique">Caractéristique</a></li>
                <li><a href="#galerie">Galerie</a></li>
                <li><a href="#footer">Contact</a></li>
            </ul>


            <img :src='Logo' style="
                position: absolute; 
                scale: 1;
                margin-top: -215px;
                margin-left: 540px;
            ">


            <ul style="
                list-style: none;
                position: absolute;
                margin-left: 900px;
                margin-top: -80px;
                display: flex;
                gap: 1rem;
            ">
                <li>
                    <div class="circle-mask">
                        <img :src='Facebook' alt="image masquée">
                    </div>
                </li>
                <li>
                    <div class="circle-mask">
                        <img :src='Insta' alt="image masquée">
                    </div>
                </li>
                <li>
                    <div class="circle-mask">
                        <img :src='Twitter' alt="image masquée">
                    </div>
                </li>
                <li>
                    <div class="circle-mask">
                        <img :src='Watsapp' alt="image masquée">
                    </div>
                </li>
                <li>
                    <div class="circle-mask">
                        <img :src='YouTube' alt="image masquée">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.circle-mask img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  object-position: 20% 80%;
  clip-path: circle(50% at 50% 50%);
}

.lien{
    position: absolute;
    color: #FFFFFF;
    font-family: 'Orbitron';
    font-size: 15px;
    font-weight: 400;
    margin-left: 100px;
}
.lien ul li {
    margin-top: 40px;
    cursor: pointer;
}

.liste{
    display: flex;
    gap: 40rem;
}
.bloc {
    margin-left: -8px;
    width: 99vw;
    height: 100vh;
    display: flex;
    font-size: 24px;
    color: #FFFFFF;
}
.bloc h1{
    margin-top: 150px;
    margin-left: 30%;
    letter-spacing: 4px;
    font-family: 'Orbitron';
    font-size: 23px;
    font-weight: 200;
    text-align: center;
}
.bloc .contact ul{
    list-style: none;
}
.bloc .contact ul li{
    margin-top: 40px;
}
.footer {
    background-color: #0C0C0C; /* Bleu violet */
}
</style>
