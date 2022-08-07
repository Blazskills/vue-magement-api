<template>
    <nav class="navbar navbar-expand navbar-light fixed-top">
        <div class="container">
            <router-link class="navbar-brand" to="/">Home</router-link>

            <!--        <a class="navbar-brand" href="#">Home</a>-->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul v-if="accessToken!=null" class="navbar-nav">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/logout">Logout</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/recordarbitrage">Record Arbitrage</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/listarbitrage">Arbitrage Records</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/computearbitrage">Arbitrage Computation</router-link>
                    </li>



                </ul>

                <ul v-if="accessToken==null" class="navbar-nav">

                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/signup">Sign up</router-link>
                    </li>


                </ul>


            </div>
        </div>
    </nav>

</template>


<script>

import { mapState } from 'vuex'
export default {
    name: 'Navs',
    computed: mapState(['APIData']),
    computed: mapState(['accessToken']),

    
}

</script>