<template>
    <form @submit.prevent="handleSubmit">
        <h3>Record New Arbitrage Trade</h3>
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
            <label for="exampleInputPhone" class="form-label">Phone</label>
            <input type="tel" class="form-control" v-model="phone" placeholder="Phone" id="exampleInputPhone">
        </div>


        <div class="mb-3">
            <label for="exampleInputBuy" class="form-label">Buy</label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="buy" placeholder="Amount bought"
                id="exampleInputBuy">
        </div>

        <div class="mb-3">
            <label for="exampleInputFBD" class="form-label">Final Buy Dropped</label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="final_buy_dropped"
                placeholder="Amount that dropped finally" id="exampleInputFBD">
        </div>




        <div class="mb-3">
            <select v-model="currency" required class="form-select">
                <option selected disabled value="">currency</option>
                <option v-for="currency in allTenants.currency" :value="currency.id" v-bind:key="currency.id">{{
                    currency.currency_name
                    }}
                </option>
                <!--  <option value="2">tenant2</option>-->
            </select>
        </div>

        <div class="mb-3">
            <label for="exampleInputBN" class="form-label">Bank Name</label>
            <input type="text" class="form-control" v-model="bank_name" placeholder="UBA" id="exampleInputBN">
        </div>


        <div class="mb-3">
            <label for="exampleInputBR" class="form-label">Bank Rate</label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="bank_rate" placeholder="5000"
                id="exampleInputBR">
        </div>


        <div class="mb-3">
            <label for="exampleInputLEC" class="form-label">Local Equivalent Charged</label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="LEC" placeholder="5000"
                id="exampleInputLEC">
        </div>



        <div class="mb-3">
            <label for="exampleInputCER" class="form-label"> Current Exchange Rate</label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="current_exchange_rate"
                placeholder="350" id="exampleInputCER">
        </div>

        <div class="mb-3">
            <label for="exampleInputCES" class="form-label">Current Exchange Site</label>
            <input type="text" class="form-control" v-model="current_exchange_site" placeholder="Remitano/Skrill"
                id="exampleInputCES">
        </div>


        <div class="mb-3">
            <label for="exampleInputAD" class="form-label"> Account Details</label>
            <textarea id="exampleInputAD" class="form-control" placeholder="Enter account number for refund if needed."
                v-model="account_details" rows="4" cols="50"></textarea>
        </div>

        <div class="mb-3">
            <select v-model="status" required class="form-select">
                <option selected disabled value="">Status</option>
                <option value="PENDING">PENDING</option>
                <option value="REFUND">REFUND</option>
                <option value="PROCESSING"> PROCESSING </option>
            </select>
        </div>

        <div class="mb-3">
            <label for="exampleInputEP" class="form-label"> Expected Profit</label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="expected_profit"
                placeholder="2500" id="exampleInputEP">
        </div>

        <div class="mb-3">
            <label for="exampleInputECC" class="form-label"> Extra Cost Charge </label>
            <input type="number" min="0.00" step="0.01" class="form-control" v-model="extra_charge_cost"
                placeholder="34" id="exampleInputECC">
        </div>


        <div class="mb-3">
            <select v-model="extra_charge_currency" required class="form-select">
                <label for="exampleInputCC" class="form-label"> Extra Currency Charge</label>
                <option selected disabled value="">Extra Charge Currency</option>
                <option v-for="currency in allTenants.currency" :value="currency.id" v-bind:key="currency.id">{{
                    currency.currency_name
                    }}
                </option>
                <!--  <option value="2">tenant2</option>-->
            </select>
        </div>

        <div class="mb-3">
            <label for="exampleInputCT" class="form-label"> Bind with other related record</label>
            <select v-model="combine_tag" class="form-select">
                <option selected disabled value="">Available Bind Record</option>
                <option v-for="combine_tag in allTenants.combine_tag" :value="combine_tag.id"
                    v-bind:key="combine_tag.id">{{
                    combine_tag.combine_name
                    }}
                </option>
                <!--  <option value="2">tenant2</option>-->
            </select>
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
    name: "RecordArbitrage",
    computed: mapState(['allTenants']),
    created() {
    },
    data() {
        return {
            msg: [],
            first_name: '',
            last_name: '',
            currency: '',
            phone: '',
            buy: '',
            bank_name: '',
            final_buy_dropped: '',
            bank_rate: '',
            LEC: '',
            current_exchange_rate: '',
            current_exchange_site: '',
            account_details: '',
            status: '',
            expected_profit: '',
            extra_charge_cost: '',
            extra_charge_currency: '',
            combine_tag: '',
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
                currency: this.currency,
                phone: this.phone,
                buy: parseFloat(this.buy),
                local_equivalent_charged: this.LEC,
                bank_rate: parseFloat(this.bank_rate),
                bank_name: this.bank_name,
                current_exchange_rate: parseFloat(this.current_exchange_rate),
                current_exchange_site: this.current_exchange_site,
                account_details: this.account_details,
                status: this.status,
                expected_profit: parseFloat(this.expected_profit),
                extra_charge_cost: parseFloat(this.extra_charge_cost),
                extra_charge_currency: this.extra_charge_currency,
                combine_tag: this.combine_tag,
                final_buy_dropped: parseFloat(this.final_buy_dropped),

                   
            }
            try {
                // console.log(this.dob)

                const response = await getApi.post('arb/create-arbitrage/', data, { headers: {Authorization: `Bearer ${this.$store.state.accessToken}`}})
                console.log(response) 
                this.msgRegErrorMsg = "Arbitrage Recorded Successfully"
                this.successAlert = true;
                this.errorAlert = false;
                // console.log(response.data)

                this.first_name = "",
                this.last_name = "",
                this.currency = "",
                this.phone = "",
                this.buy = "",
                this.LEC = "",
                this.bank_rate = "",
                this.bank_name = "",
                this.current_exchange_rate = "",
                this.current_exchange_site = "",
                this.account_details = "",
                this.status = "",
                this.expected_profit = "",
                this.extra_charge_cost = "",
                this.extra_charge_currency = "",
                this.combine_tag = "",
                this.final_buy_dropped= ""
                


                

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
