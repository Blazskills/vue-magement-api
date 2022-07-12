<template>
    <div>
        <h2 v-if="accessToken">Welcome back {{ APIData.first_name}} {{ APIData.last_name}}</h2>
        <!-- <h2 v-if="!accessToken">You're not logged in</h2> -->
        <br>

        <div>
            <hr>
            <br>
            <div class="row">
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Register New Member</h5>
                            <p class="card-text">Note:All members you register will automatically belong to your
                                organization.
                            </p>
                            <router-link class="btn btn-primary" to="/memberreg">Register</router-link>
                            <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">View All Members</h5>
                            <p class="card-text">View only members that belong to your organization only .
                            </p>
                            <router-link class="btn btn-primary" to="/memberlist">Members</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-sm-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Visit Admin Page</h5>
                            <p class="card-text">Visit the admin page for extra functionality.
                            </p>
                            <a href="https://contactmgt-app.herokuapp.com/admin" class="btn btn-primary"
                                target="_blank">Admin</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    </div>




</template>



<script>
import { getApi } from "@/axios";
import { mapState } from "vuex";
export default {
    name: 'Home',
    computed: mapState(['APIData', 'accessToken']),
    created() {
        getApi.get('user-view', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
            .then(response => {
                // console.log(response.data.user.first_name)
        this.$store.state.APIData = response.data.user
            })
            .catch(error => {
        console.log(error)
    })
    },
}
</script>
