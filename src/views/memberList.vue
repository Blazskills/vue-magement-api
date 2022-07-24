<template>
    <div class="p-4">
        <h1>List of all Members</h1>
        <span style="color: white;">LIST OF ALL YOUR MEMBERS</span>
        <br>
        <br>
        <br>
        <table id="example" class="table table-striped table-dark table-bordered nowrap" style="width:100%">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>phone</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>E-mail</th>
                    <th>Purpose</th>
                    <th>current Job.</th>
                    <th>Invited By</th>
                    <th>DOB</th>
                    <th>Created By</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody v-if="!processing">

                <tr v-for="(member,  index) in members" :value="member.id" v-bind:key="member.id">
                    <td>{{index + 1}}</td>
                    <td v-text="member.firstname"></td>
                    <td v-text="member.lastname"></td>
                    <td v-text="member.phone"></td>
                    <td class="truncate" style="width: 50px;"> {{ member.home_address | truncate(25)}}</td>
                    <td v-text="member.gender"></td>
                    <td v-text="member.email"></td>
                    <td v-text="member.motive"></td>
                    <td class="truncate">{{member.current_job | truncate(25)}}</td>
                    <td class="truncate">{{member.invited_by | truncate(25)}}</td>
                    <!-- <td class="truncate">{{member.dob | moment}}</td> -->
                    <!-- <td class="truncate" v-html="jsonMethod(member.dob ? member.dob : 'None')">

                    </td> -->

                    <!-- <td class="truncate" v-html="(member.dob ? member.dob : 'None')">

                    </td> -->
                    <!-- <td class="truncate">
                        
                        {{member.dob}} ? member.dob | moment : 'None'
                    
                    </td> -->
                    <td v-html="(member.created_by ? member.created_by.first_name : 'None')"></td>
                    <td class="truncate">{{ member.created | moment}}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="processing" style="text-align: center;">
            <span style="color: black; display: inline-block; margin-left: 0;">Loading data.....</span>
        </div>

        <div v-if="dataSeen == false" style="text-align: center;">
            <span style="color: black; display: inline-block; margin-left: 0;">No data Available .....</span>
        </div>
    </div>
</template>

<style>


body {
    background: #ffffff !important;
}

.auth-inner {
    width: auto;

    margin:100px 0 0 0 ;
    background: #ffffff;
    box-shadow: 0 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 40px 45px 55px;
    border-radius: 0px;
    transition: all .3s;
}

.truncate {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>


<script>
import moment from 'moment'


import { getApi } from "@/axios";
export default {
    name: "Memberlist",

    data() {
        return {

            members: [],
            processing: true,
           dataSeen: true,
        }
        
    },
    filters: {
        truncate: function (data, num) {
            const reqdString =
                data.split("").slice(0, num).join("");
            return reqdString;
        },
        moment: function (date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        }
    },
    methods: {

        jsonMethod(date) {
            return moment(date).format('MMMM Do YYYY, h:mm:ss a');
        },

        getMember() {
            getApi.get('member-list/',{ headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
                .then(response => {
                    this.members = response.data.data
                    // console.log(response.data)
                    this.processing = false;
                    dataLength = Object.keys(response.data.data).length
                    if (dataLength < 1) {
                        this.processing = true;
                        this.dataSeen = false;
                    }
                    // console.log(Object.keys(response.data.data).length)
                // console.log(response)
            })
                .catch(error => {
                    this.processing = false;
                // console.log(error)
            })
        }
    },
    mounted() {
        this.getMember();
    },
    
}



</script>