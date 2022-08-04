<template>
    <form @submit.prevent="login">
        <h3>Login</h3>
        <div v-if="incorrectAuth & errormsg != null" class="alert alert-danger alert-dismissible fade show"
            role="alert">
            <strong>Error!</strong> {{errormsg}}
        </div>



        <div v-if="incorrectAuth & errormsg == null" class="alert alert-danger alert-dismissible fade show"
            role="alert">
            <strong>Error!</strong> Incorrect username or password entered - please try again
        </div>

        <div class="form-group">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="text" class="form-control" v-model="email" id="exampleInputEmail1"
                aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="form-group">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="password" id="exampleInputPassword1">
        </div>
        <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
</template>


<script>

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            incorrectAuth: false,
            errormsg: null,


        }
    },
    methods: {
        login() {
            this.$store.dispatch('userLogin', {
                email: this.email,
                password: this.password
            })
                .then((response) => {
                    this.incorrectAuth = false
                    this.errormsg = null,
                    // console.log(response)
                    localStorage.setItem('token', response.data.token.access)
                    localStorage.setItem('refresh', response.data.token.refresh)
                    this.$router.push({ name: 'home' })
                })
                .catch(err => {
                    // console.log(err)
                    this.errormsg = err.response.data.message
                    // console.log(this.errormsg)
                    this.incorrectAuth = true
                })
        }
    }
}
</script>