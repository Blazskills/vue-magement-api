<template>
  <div id="app">
    <Navs />
    <div class="auth-wrapper">
      <div class="auth-inner">
        <router-view />
      </div>
    </div>




  </div>
</template>

<script>
import { mapState } from "vuex";
import Navs from './views/Navs'
import { getApi } from "@/axios";
export default {
  name: 'App',
  computed: mapState(['allTenants']),
  mounted() {
    this.getTenantListData()
  },
  methods: {
    getTenantListData() {
      getApi.get('tenant-list')
        .then(
          response => {
            console.log(response.data)
            this.$store.state.allTenants = response.data
          }
        ).catch(
          error => {
            console.log(error)
            // this.allDatas.tenantListErrorMsg = 'Error retrieving tenant list'
          }
        )
    },
  },
  components: {
    Navs,
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

* {
  box-sizing: border-box;
}

body {
  background: #1C8EF9 !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
  font-family: 'Fira sans', sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6,
label,
span {
  font-weight: 500;
  font-family: 'Fira sans', sans-serif;
}

body,
html,
#app,
#root,
.auth-wrapper {
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
}

.auth-inner {
  width: auto;
  
  margin: 400px auto auto;
  background: #ffffff;
  box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px
}

.custom-control-label {
  font-weight: 400;
}

.forget-password,
.forget-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forget-password a {
  color: #167bff;
}
</style>