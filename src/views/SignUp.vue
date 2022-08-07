<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <div v-if="allDatas.isVisible" class="loader-wrapper">
            <span class="loader"><span class="loader-inner"></span></span>
        </div>
        <div v-if="signUpData.signUpError" class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {{ signUpData.signUpErrorMsg }}

        </div>
        <div v-if="signUpData.signUpSuccess" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> {{ signUpData.signUpSucessMsg }}
        </div>
        <div class="mb-3">
            <label for="exampleInputFirstName" class="form-label">First Name</label>
            <input type="text" required class="form-control" v-model="first_name" id="exampleInputFirstName">

        </div>
        <div class="mb-3">
            <label for="exampleInputLastName" class="form-label">Last Name</label>
            <input type="text" class="form-control" required v-model="last_name" id="exampleInputLastName">
        </div>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" required v-model.trim="email" id="exampleInputEmail1">
        </div>

        <div class="mb-3">
            <label for="exampleInputUsername" class="form-label">Username</label>
            <input type="text" class="form-control" required v-model.trim="username" id="exampleInputUsername">
        </div>
        <div class="mb-3">
            <select v-model="position" required class="form-select">
                <option selected disabled value="">Please select your Position</option>
                <option value="MEMBER">MEMBER</option>
                <option value="ADMIN">ADMIN</option>
                <option value="ELDER">ELDER</option>
                <option value="PASTOR">PASTOR</option>
            </select>
        </div>





        <div class="mb-3">
            <select v-model="gender" required class="form-select">
                <option selected disabled value="">Gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
            </select>
        </div>

        <div class="mb-3">
            <select v-model="tenant" required class="form-select">
                <option selected disabled value="">Tenant</option>
                <option v-for="tenant in allTenants" :value="tenant.id" v-bind:key="tenant.id">{{ tenant.name }}
                </option>
                <!--  <option value="2">tenant2</option>-->
            </select>
        </div>


        <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" required v-model.trim="password" id="exampleInputPassword1">
            <span style="color: red;" v-if="msg.password">{{msg.password}}</span>
        </div>
        <div class="mb-3">
            <label for="exampleInputConfirmPassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" required v-model.trim="password_confirm"
                id="exampleInputConfirmPassword">
        </div>
        <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>

    </form>
</template>

<style>



.loader-wrapper {
    width: 150%;
    height: 1500px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #2a3341;
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
}

.loader {
    display: inline-block;
    width: 30px;
    height: 30px;
    position: relative;
    border: 4px solid #Fff;
    animation: loader 2s infinite ease;
}

.loader-inner {
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: #fff;
    animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
    0% {
        transform: rotate(0deg);
    }

    25% {
        transform: rotate(180deg);
    }

    50% {
        transform: rotate(180deg);
    }

    75% {
        transform: rotate(360deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes loader-inner {
    0% {
        height: 0%;
    }

    25% {
        height: 0%;
    }

    50% {
        height: 100%;
    }

    75% {
        height: 100%;
    }

    100% {
        height: 0%;
    }
}
</style>
<script>
import axios from 'axios';
import { getApi } from "@/axios";
import { mapState } from 'vuex'

export default {
    name: 'Signup',
    computed: mapState(['allTenants']),

    created() {
        // this.getTenantListData()
    },
    data() {
        return {
            msg: [],
            first_name: '',
            last_name: '',
            email: '',
            username: '',
            position: '',
            gender: '',
            tenant: '',
            password: '',
            password_confirm: '',
            allDatas: {
                tenantList: null,
                tenantListErrorMsg: '',
                isVisible:false,

            },
            signUpData: {
                signUpError: false,
                signUpSuccess: false,
                signUpErrorMsg: '',
                signUpSucessMsg: '',
            }




        }
    },
    methods: {
        validatePassword(value) {
            let difference = 8 - value.length;
            if (value.length < 8) {
                this.msg['password'] = 'Must be 8 characters! ' + difference + ' characters left';
            } else {
                this.msg['password'] = '';
            }
        },
        async handleSubmit() {
            
            try {
                if (this.password != this.password_confirm) {
                    this.signUpData.signUpError = true;
                    this.signUpData.signUpErrorMsg = 'Password does not match'
                    return
                }
                if (this.msg.password) {
                    console.log('error')
                    this.signUpData.signUpError = true;
                    this.signUpData.signUpErrorMsg = 'Password is too short'
                    return
                }
                const data = {
                    first_name: this.first_name,
                    last_name: this.last_name,
                    email: this.email,
                    username: this.username,
                    position: this.position,
                    gender: this.gender,
                    tenant: this.tenant,
                    password: this.password,
                    password_confirm: this.password_confirm,
                }
                try {
                    this.allDatas.isVisible = true;
                    
                    const response = await getApi.post('auth/signup/', data);
                    this.allDatas.isVisible = false;
                    this.signUpData.signUpSuccess = true;
                    this.signUpData.signUpError = false;
                    this.signUpData.signUpSucessMsg = response.data.message;
                    this.$router.push('/login');
                }
                catch (error) {
                    this.allDatas.isVisible = false;
                    console.log(error.response.data.errors[0]);
                    // console.log(error.response.data);

                    this.signUpData.signUpError = true;
                    this.signUpData.signUpSuccess = false;
                    this.signUpData.signUpErrorMsg = error.response.data.errors[0]
                }
            }
            catch (e) {
                this.signUpData.signUpErrorMsg = 'Opps something went wrong'
            console.error(e)
          }
        }
    },
    watch: {
        password(value) {
            this.password = value;
            this.validatePassword(value);
        }
    }

}
</script>