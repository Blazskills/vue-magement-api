<template>
    <form @submit.prevent="handleSubmit">
        <h3>Register Member</h3>
        <!-- <div v-if="errormessage" class="loader-wrapper">
            <span class="loader"><span class="loader-inner"></span></span>
        </div> -->
        <div v-if="errorAlert" class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error!</strong> {{ msgRegErrorMsg }}

        </div>
        <div v-if="successAlert" class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> {{ msgRegErrorMsg }}
        </div>
        <div class="mb-3">
            <label for="exampleInputFirstName" class="form-label">First Name</label>
            <input type="text" placeholder="First Name" required class="form-control" v-model="first_name"
                id="exampleInputFirstName">

        </div>
        <div class="mb-3">
            <label for="exampleInputLastName" class="form-label">Last Name</label>
            <input type="text" placeholder="Last Name" class="form-control" required v-model="last_name"
                id="exampleInputLastName">
        </div>

        <div class="mb-3">
            <label for="exampleInputDob" class="form-label"> DOB</label>
            <input type="date" placeholder="Date of birth" class="form-control" v-model="dob" id="exampleInputDob">
        </div>

        <div class="mb-3">
            <select v-model="gender" required class="form-select">
                <option selected disabled value="">Gender</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
            </select>
        </div>

        <div class="mb-3">
            <label for="exampleInputphone" class="form-label">Phone</label>
            <input type="tel" class="form-control" placeholder="Phone Number" required v-model="phone"
                id="exampleInputphone" pattern="[0-9]{11}">
        </div>

        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model.trim="email" placeholder="optional" id="exampleInputEmail1"
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$">
        </div>


        <div class="mb-3">
            <label for="exampleInputAddress" class="form-label">Address</label>
            <input type="text" class="form-control" required placeholder="where do you stay?" v-model="address"
                id="exampleInputAddress">
        </div>

        <div class="mb-3">
            <label for="exampleInputInvitedBy" class="form-label">Invited By</label>
            <input type="text" class="form-control" placeholder="Who invited you? (Optional)" v-model="invite_by"
                id="exampleInputInvitedBy">
        </div>

        <div class="mb-3">
            <label for="exampleInputObservation" class="form-label">Observation</label>
            <input type="text" class="form-control" placeholder="What do you observe(Optional)" v-model="observation"
                id="exampleInputObservation">
        </div>

        <div class="mb-3">
            <label for="exampleInputPR" class="form-label">Prayer Request</label>
            <input type="text" class="form-control" placeholder="Your prayer request (Optional)" v-model="prayerRequest"
                id="exampleInputPR">
        </div>


        <div class="mb-3">
            <label for="exampleInputCJ" class="form-label">Current Job</label>
            <input type="text" class="form-control" placeholder="Your Occupation (Optional)" v-model="currentJob"
                id="exampleInputCJ">
        </div>



        <div class="mb-3">
            <select v-model="contactVia" required class="form-select">
                <option selected disabled value="">How should we contact you</option>
                <option value="CALL">CALL</option>
                <option value="VISIT">VISIT</option>
                <option value="CALL_VISIT">CALL or VISIT</option>
            </select>
        </div>
        <div class="mb-3">
            <select v-model="purpose" required class="form-select">
                <option selected disabled value="">Purpose of coming..</option>
                <option value="JUST_VISITING">JUST VISITING</option>
                <option value="INTERESTED_IN_BECOMING_A_MEMBER">INTERESTED IN BECOMING A MEMBER</option>
                <option value="VISING_INTERESTED_IN_BECOMING_A_MEMBER">VISING & INTERESTED IN BECOMING A MEMBER</option>
                <option value="SEASONAL_VISITOR_BECOMING_ACTIVE">SEASONAL VISITOR BECOMING ACTIVE</option>
            </select>
        </div>
        <div class="mb-3 form-check">
            <label class="form-check-label" for="exampleCheck2">Are you related/know any old memeber?</label>
            <input type="checkbox" class="form-check-input" v-model="checked" id="exampleCheck2">
        </div>
        <div class="mb-3" v-if="checked">
            <label for="exampleInputRT" class="form-label">If yes, Related/Know Who?</label>
            <input type="text" class="form-control" :required="isRequired" placeholder="Related to who? (Optional)"
                v-model="relatedTo" id="exampleInputRT">
            <!-- <span style="color: red;" v-if="msg.relatedTo">{{ msg.relatedTo }}</span> -->
        </div>
        <div class="mb-3 form-check">
            <label class="form-check-label" for="exampleCheck1">Receive Notifications</label>
            <input type="checkbox" class="form-check-input" v-model="notify" id="exampleCheck1">
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
import moment from 'moment'

export default {
    name: "MemberReg",
    created() {
    },
    data() {
        return {
            msg: [],
            first_name: '',
            last_name: '',
            gender: '',
            phone: '',
            email: '',
            address: '',
            invite_by: '',
            observation: '',
            prayerRequest: '',
            currentJob: '',
            contactVia: '',
            purpose: '',
            relatedTo: '',
            notify: '',
            dob: null,
            checked: false,
            errorAlert: false,
            successAlert: false,
            msgRegErrorMsg: '',
            isRequired: false,
            

           
        }
    },
    
    methods: {
       
       
       async  handleSubmit() {
            
                const data = {
                    firstname: this.first_name,
                    lastname: this.last_name,
                    gender: this.gender,
                    phone: this.phone,
                    email: this.email,
                    home_address: this.address,
                    invited_by: this.invite_by,
                    observations: this.observation,
                    prayer_request: this.prayerRequest,
                    current_job: this.currentJob,
                    contact_via: this.contactVia,
                    motive: this.purpose,
                    dob: this.dob,
                    related_to_old_church_member: this.checked,
                    related_to_who: this.relatedTo,
                    notify: this.notify,
            }
            try {
                // console.log(this.dob)

               const response = await getApi.post('create-member/', data, { headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}})
                console.log(response) 
                this.msgRegErrorMsg = "Successfully Registered"
                this.successAlert = true;
                this.errorAlert = false;
                // this.$router.push('/Memberreg');

                this.first_name = ''
                this.last_name = ''
                this.gender = ''
                this.phone = ''
                this.email = ''
                this.address = ''
                this.invite_b = ''
                this.observation = ''
                this.prayerReques = ''
                this.currentJob = ''
                this.contactVia = ''
                this.purpose = ''
                this.relatedTo = ''
                this.notify = ''
                this.dob = null

                

            }
            catch (error) {
                this.successAlert = false;
                this.errorAlert = true
                this.msgRegErrorMsg = error.response.data.message
                console.log(error.response)
            }
               
          
            
        }
    },
    watch: {

        checked(value) {
            if (value == true && this.relatedTo == "") {
                this.msg['relatedTo'] = 'Kindly input who you know or related to';
                this.isRequired = true;
                console.log('Not empty')
                console.log(this.msg.relatedTo)
                        
              
            }
            else if (value == false ) {
                this.isRequired = false;
                this.relatedTo = ''
                this.msg['relatedTo'] = '';

           }
        }, 

        dob(value) {
            if (value === null || value === '') {
                console.log(value)
                console.log('Empty')
                value = null
                return null
            }
            else {
                console.log(value)
                console.log('not empty')
                return moment(value).format('YYYY-MM-DD')
            }
        }

    }

}
</script>
