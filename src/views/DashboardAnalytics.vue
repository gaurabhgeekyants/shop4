<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
========================================================================================== -->

<template>
  <div class="w-full" v-if="user_role == 'admin'">
    <dashboard-admin></dashboard-admin>
  </div>
  <div class="w-full" v-else-if="user_role == 'member'">
    <dashboard-member></dashboard-member>
  </div>
  <div class="w-full" v-else-if="user_role == 'sale'">
    <dashboard-sale></dashboard-sale>
  </div>
  <div class="w-full" v-else-if="user_role == 'trainer'">
    <dashboard-trainer></dashboard-trainer>
  </div>
</template>
<script>
  require('firebase/firestore')
  import 'firebase/auth'
  import DashboardAdmin from './DashboardAdmin'
  import DashboardMember from "./DashboardMember";
  import DashboardTrainer from "./DashboardTrainer";
  import DashboardSale from "./DashboardSale";
  export default {
    data() {
      return {
        lineChartToggle:false,
        profileUrl:'',
        monthyMembesrYAxix:[],
        xaxisMembersColumn:[],
        monthMembers:'',
        insideMembersMonth:'',
        monthlyMembersStat:'',
        monthyYAxix:[],
        xaxisColumn:[],
        month:'',
        insideMonth:'',
        monthlyStat:'',
        statLeadLedgar:[],
        statLeadConvertedLedgar:[],
        statleadsCount : '',
        statMonthLeadsCount : '',
        statMonthLeadsCountPercentage :'',
        MonthMembersCountPercentage:'',

        themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
        columnChart: {
          series: [{
            name: 'Lead',
            data: []
          }, {
            name: 'Member',
            data: []
          },
          ],
        },


        weightValue:'',
        thisMonthLeadsCount: 0,
        thisMonthLeadsCountPercentage: 0,
        selectedWeight: '',
        uid: localStorage.getItem('uid'),
        users: [],
        contactMode: [
          {text: 'Email', value: 'email'},
          {text: 'Whatsapp', value: 'whatsapp'},
          {text: 'Sms', value: 'sms'},
          {text: 'Phone', value: 'phone'}
        ],
        trainersChart: [],
        packageChart: [],
        trainerCount: 0,
        trainerActiveCount: 0,
        trainerInactiveCount: 0,
        membersCount: 0,
        membersActiveCount: 0,
        membersInactiveCount: 0,
        saleActiveCount: 0,
        saleInactiveCount: 0,
        leadsCount: 1,
        leadsActiveCount: 0,
        saleCount: 0,
        gender_image: '',
        height: '',
        height_type: '',
        selected: '',
        protein_percentage: '',
        carbohydrate_percentage: '',
        fat_percentage: '',
        weight: '0',
        age: '0',
        gender: 'male',
        site_method: 'three_site_method',
        calory: '',
        fatsCalculate: '',
        chest_site_1: '0',
        chest_site_2: '0',
        chest_site_3: '0',
        abdomen_site_1: '0',
        abdomen_site_2: '0',
        abdomen_site_3: '0',
        thigh_site_1: '0',
        thigh_site_2: '0',
        thigh_site_3: '0',
        suprailiac_site_1: '0',
        suprailiac_site_2: '0',
        suprailiac_site_3: '0',
        midaxilliary_site_1: '0',
        midaxilliary_site_2: '0',
        midaxilliary_site_3: '0',
        tricep_site_1: '0',
        tricep_site_2: '0',
        tricep_site_3: '0',
        subscapula_site_1: '0',
        subscapula_site_2: '0',
        subscapula_site_3: '0',
        chest_average: '0',
        abdomen_average: '0',
        thigh_average: '0',
        suprailiac_average: '0',
        midaxilliary_average: '0',
        tricep_average: '0',
        subscapula_average: '0',
        heightFt: [
          {label: 'Inches', value: 'Inches'},
          {label: 'Feet', value: 'Feet'},
        ],
        firstName: "",
        lastName: "",
        email: "",
        bodyfat: "",
        bg_protein: 'low',
        goal: "Select your goal",
        city: "new-york",
        proposalTitle: "",
        jobTitle: "",
        textarea: "",
        eventName: "",
        eventLocation: "san-francisco",
        status: "plannning",
        cityOptions: [
          {text: "New York", value: "new-york"},
          {text: "Chicago", value: "chicago"},
          {text: "San Francisco", value: "san-francisco"},
          {text: "Boston", value: "boston"},
        ],
        goalOptions: [
          {text: "Maintain", value: "Maintain"},
          {text: "Fat lose", value: "fat-lose"},
          {text: "Lose 10%", value: "lose-10%"},
          {text: "Muscle Gain", value: "muscle-gain"},
        ],

        activity_level: '',
        statusOptions: [
          {text: "Plannning", value: "plannning"},
          {text: "In Progress", value: "in progress"},
          {text: "Finished", value: "finished"},
        ],
        height_in_ft_type: '',
        protein: '',
        carbohydrates: '',
        lmb: '',
        rmr: '',
        fbm: '',
        fat: '',
        program_started: '',
        program_ending: '',
        show_program_info: false,
        totalConvertedLeadsCount: 0,
        thisMonthConvertedLeadsCount: 0,
        thisMonthConvertedLeadsCountPercentage: 0,
        monthlyMember:0,
      }
    },
    methods: {},
    computed: {
      user_displayName() {
        return JSON.parse(localStorage.getItem('userInfo')).displayName
      },
      user_role() {
        return localStorage.getItem('userRole')
      },
    },
    components: {
      DashboardAdmin,
      DashboardMember,
      DashboardTrainer,
      DashboardSale
    },
  }
</script>

