<template>

    <form @submit.prevent="handleSubmit">
        <div v-if="is_success == false">
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
                <label for="xampleInputCT" class="form-label"> Select Your arbitrage bind</label>
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



            <div class="mb-3">
                <select v-model="convert_from" class="form-select">
                    <option selected disabled value="">Convert From</option>
                    <option v-for="currency in allTenants.currency" :value="currency.id" v-bind:key="currency.id">{{
                        currency.currency_name
                        }}
                    </option>
                    <!--  <option value="2">tenant2</option>-->
                </select>
            </div>

            <div class="mb-3">
                <select v-model="convert_to" class="form-select">
                    <option selected disabled value="">Convert To</option>
                    <option v-for="currency in allTenants.currency" :value="currency.id" v-bind:key="currency.id">{{
                        currency.currency_name
                        }}
                    </option>
                    <!--  <option value="2">tenant2</option>-->
                </select>
            </div>

            <div class="mb-3">
                <label for="exampleInputBR" class="form-label">Your Current Exchange Rate</label>
                <input type="number" min="0.00" step="0.01" class="form-control" v-model="current_exchange_rate"
                    placeholder="630" id="exampleInputBR">
            </div>


            <div class="mb-3">
                <label for="exampleInputBR" class="form-label">Total Available Bought Portfolio</label>
                <input type="number" min="0.00" step="0.01" class="form-control"
                    v-model="total_buy_available_for_conversion" placeholder="17" id="exampleInputBR">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </div>

        <div v-if="is_success">
            <h3>Computed Result of {{ total_count }} Arbitrage P&L</h3>

            <table>
                <tr>
                    <th colspan="3">Arbitrage P&L Break Down</th>
                    <!-- <th colspan="3">total_spent</th> -->
                    <!-- <th>total_intial_buy</th>
                    <th>total_intial_buy_drop</th> -->
                    <!-- <th>total_final_portfolio</th> -->


                </tr>
                <tr>
                    <td colspan="3">

                        <ul style="list-style-type:disc;">
                            <br>
                            <li>Total Spent : <span style="color:green; font-weight: bold;">{{ total_spent }}</span>
                            </li>
                            <br>
                            <li>Total Intial Buy : <span
                                    style="color:green; font-weight: bold;">{{total_initial_buy}}</span>
                            </li>
                            <br>
                            <li>Total Intial Buy Drop : <span
                                    style="color:green; font-weight: bold;">{{total_initial_buy_drop}}</span>
                            </li>
                            <br>
                            <li>Total Final Portfolio : <span
                                    style="color:green; font-weight: bold;">{{total_final_portfolio}}</span>
                            </li>
                            <br>

                        </ul>


                    </td>
                    <!-- <td>Maria Anders</td>
                    <td>Germany</td> -->
                </tr>
                <tr>
                    <td colspan="3" style="font-size: 16px; font-weight: bold;">Final Computed Value</td>
                </tr>
                <tr>
                    <td colspan="3">

                        <ul style="list-style-type:disc;">
                            <br>
                            <li>Conversion Rate : <span
                                    style="color:green; font-weight: bold;">{{Conversion_Rate}}</span>
                            </li>
                            <br>
                            <li>Total Buy : <span style="color:green; font-weight: bold;">{{ total_buy }}</span>
                            </li>
                            <br>
                            <li>Total Final Buy Dropped : <span
                                    style="color:green; font-weight: bold;">{{total_final_buy_dropped}}</span>
                            </li>
                            <br>
                            <li>Total Available For Conversion : <span style="color:green; font-weight: bold;">{{
                                    total_available_conversion }}</span>
                            </li>
                            <br>

                        </ul>


                    </td>
                </tr>
                <tr>

                    <td colspan=" 3" style="color: green;" v-if="pL_status == 'profit'"><span
                            style="color: black">Report :</span>
                        {{Analysis_Report}} </td>
                    <td colspan=" 3" style="color: red;" v-if="pL_status == 'loss'"><span style="color: black">Report
                            :</span> {{Analysis_Report}} </td>



                </tr>
            </table>
        </div>


    </form>
</template>

<style>

table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
}

td,
th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

tr:nth-child(even) {
    background-color: #dddddd;
}

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
    name: "ArbitrageReport",
    computed: mapState(['allTenants']),
    created() {
    },
    data() {
        return {
            msg: [],
            combine_tag: "",
            convert_from: "",
            convert_to: "",
            current_exchange_rate: 0,
            total_buy_available_for_conversion: 0,
            errorAlert: false,
            successAlert: false,
            msgRegErrorMsg: '',
            isRequired: false,
            is_success: false,


            Conversion_Rate: '',
            total_initial_buy: '',
            total_initial_buy_drop: '',
            total_final_portfolio: '',
            total_spent: '',
            total_buy: '',
            total_final_buy_dropped: '',
            total_available_conversion: '',
            Analysis_Report: '',
            pL_status: '',
            total_count:'',

            

            

           
        }
    },
    
    methods: {
       
       
       async  handleSubmit() {
            
            const data = {
                tag: parseInt(this.combine_tag),
                convert_from: parseInt(this.convert_from),
                convert_to: parseInt(this.convert_to),
                current_exchange_rate: parseFloat(this.current_exchange_rate),
                total_buy_available_for_conversion: parseFloat(this.total_buy_available_for_conversion),

               
                   
            }
            try {
                // console.log(this.dob)

                const response = await getApi.post('/arb/extra-charge-cal/', data, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
                this.Conversion_Rate = response.data.Conversion_Rate
                this.total_initial_buy = response.data.total_initial_buy
                this.total_initial_buy_drop = response.data.total_initial_buy_drop
                this.total_final_portfolio = response.data.total_final_portfolio
                this.total_spent = response.data.total_spent
                this.total_buy = response.data.total_buy
                this.total_final_buy_dropped = response.data.total_final_buy_dropped
                this.total_available_conversion = response.data.total_available_conversion
                this.Analysis_Report = response.data.Analysis_Report
                this.pL_status = response.data.pL_status
                this.total_count = response.data.total_count

                




                this.is_success = true;
                console.log(response) 
                this.msgRegErrorMsg = "Arbitrage Recorded Successfully"
                this.successAlert = true;
                this.errorAlert = false;
                // console.log(response.data)
                    this.combine_tag,
                    this.convert_to,
                    this.current_exchange_rate,
                    this.total_buy_available_for_conversion


                

            }
            catch (error) {
                this.successAlert = false;
                this.errorAlert = true
                this.msgRegErrorMsg = error.response.data.message
                console.log(error.response)
            }
               
          
            
        }
    },
  

}
</script>
