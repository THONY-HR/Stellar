<template>
    <nav class="navbar">
        <ul class="nav-list">
            <li><a href="#velo">Vélos</a></li>
            <li class="change"><a href="#caracteristique">Caractéristique</a></li>
            <li><router-link to="/boutique">Boutique</router-link></li>            
        </ul>
        <div class="logo"><a href="#"><img src="../../../assets/logo2.png"></a></div>
        <ul class="nav-list">
            <li><a href="#galerie">Galerie</a></li>
            <li><a href="#footer">Contact</a></li>
            <router-link to="/LoginClient">Login</router-link>
        </ul>
    </nav>
</template>
<style scoped>
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0px;
    }

    .nav-list {
        font-family: "Orbitron";
        display: flex;
        list-style: none;
        padding: 0;
        margin-top: 50px;
        z-index: 1000; /* S'assure que le logo reste au-dessus des autres éléments */
    }

    .nav-list li {
        margin: 0 50px;
        font-size: 14px;
        list-style-type: none;
        cursor: pointer;
        color: #E4E4E4;
    }

    .nav-list li:hover {
        color: #FFFFFF;
    }

    .nav-list .change:hover {
        color: #DA2121; /* Correction du sélecteur */
    }

    .logo {
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 292px;
        height: 148px;
        background-color: #0C0C0C;
        border-radius: 0px 0px 27px 27px;
        opacity: 60%;
        z-index: 1000; /* S'assure que le logo reste au-dessus des autres éléments */
    }

    .logo img {
        width: 220px;
        height: 100px;
        margin-left: 40px;
        margin-top: 18px;
    }

</style>