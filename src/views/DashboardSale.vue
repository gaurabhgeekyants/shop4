<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="dashboard-analytics">
    <div class="vx-row">

      <!-- CARD 1: CONGRATS -->
      <div class="vx-col w-full mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
          <img src="../assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="175">
          <img src="../assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <h1 class="mb-6 text-white">Welcome {{ user_displayName }},</h1>
        </vx-card>
      </div>
    </div>
    <div class="vx-row" v-show="user_role == 'sale'">
      <!-- CARD 6: Product Orders -->
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card>
          <!-- CARD ACTION -->
          <!-- <template slot="actions">
             <change-time-duration-dropdown />
           </template>-->

          <div slot="no-body">
            <vue-apex-charts type=radialBar height=465 :options="productOrdersRadialBar.chartOptions" :series="series" />
          </div>

          <ul>
            <li v-for="orderData in statLeadConvertedLedgar" :key="orderData.orderType" class="flex mb-3 justify-between">
                            <span class="flex items-center">
                                    <span class="inline-block h-4 w-4 rounded-full mr-2 bg-white border-3 border-solid" :class="`border-${orderData.color}`"></span>
                                    <span class="font-semibold">{{ orderData.orderType }}</span>
                            </span>
              <span>{{ orderData.counts }}</span>
            </li>
            <!-- <li><span class="inline-block h-2 w-2 rounded-full mr-2 bg-primary"></span>Finished - 23,043</li> -->
          </ul>
        </vx-card>
      </div>
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card>
          <!-- CARD ACTION -->
          <!-- <template slot="actions">
             <change-time-duration-dropdown />
           </template>-->

          <div slot="no-body">
            <vue-apex-charts type=radialBar height=465 :options="productLeadRadialBar.chartLeadOptions" :series="leadSeries" />
          </div>

          <ul>
            <li v-for="orderData in statLeadLedgar" :key="orderData.orderType" class="flex mb-3 justify-between">
                            <span class="flex items-center">
                                    <span class="inline-block h-4 w-4 rounded-full mr-2 bg-white border-3 border-solid" :class="`border-${orderData.color}`"></span>
                                    <span class="font-semibold">{{ orderData.orderType }}</span>
                            </span>
              <span>{{ orderData.counts }}</span>
            </li>
            <!-- <li><span class="inline-block h-2 w-2 rounded-full mr-2 bg-primary"></span>Finished - 23,043</li> -->
          </ul>
        </vx-card>
      </div>
    </div>
    <div class="vx-row" v-show="user_role == 'sale'">
      <!--      <div class="vx-col w-full lg:w-1/3 mb-base">-->
      <vx-card v-show="lineChartToggle === true">
        <vue-apex-charts type="bar" height="350" :options="chartOptions" :series="columnChart.series"></vue-apex-charts>
      </vx-card>
      <!--      </div>-->
    </div>
  </div>
</template>
<script>

    import Vue from 'vue'
    import Chartkick from 'vue-chartkick'
    import Chart from 'chart.js'

    Chartkick.options = {
        colors: ["#4b7bec", "#26de81", "#eb3b5a"]
    },
        Vue.use(Chartkick.use(Chart))
    import firebase from 'firebase/app'

    require('firebase/firestore')
    import 'firebase/auth'
    import vSelect from 'vue-select'
    // import CssCircle from 'v-circle/components/css-circle.vue'
    import Progress from "easy-circular-progress";
    import $ from 'jquery';
    // import circleCounter from 'vue-circle-counter'
    import moment from 'moment'
    import VueApexCharts from 'vue-apexcharts'
    import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
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
                chartOptions: {
                    colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            endingShape: 'rounded',
                            columnWidth: '55%',
                        },
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        show: true,
                        width: 2,
                        colors: ['transparent']
                    },

                    xaxis: {
                        categories: this.column_bar()//['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct','Nov','Dec'],
                    },
                    yaxis: {
                        title: {
                            text: 'Count'
                        }
                    },
                    fill: {
                        opacity: 1

                    },
                    tooltip: {
                        y: {
                            formatter: function(val) {
                                return  val
                            }
                        }
                    }
                },
                themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                columnChart: {
                    series: [{
                        name: 'Lead',
                        data: []//[0,0,0,0,0,0,0,0,0,0,0,0]
                    }, {
                        name: 'Member',
                        data: []
                    },
                    ],
                },
                series: [],
                leadSeries: [],
                productOrdersRadialBar: {
                    analyticsData: [
                        { 'orderType': 'Total Members', 'counts': 0, color: 'primary' },
                        { 'orderType': 'This Month', 'counts': 0, color: 'warning' },
                        { 'orderType': 'This Week ', 'counts': 0, color: 'danger' },
                    ],
                    series: [],
                    chartOptions: {
                        labels: ['Total Members', 'This Month', 'This Week'],
                        plotOptions: {
                            radialBar: {
                                size: 165,
                                offsetY: -25,
                                hollow: {
                                    size: '20%'
                                },
                                track: {
                                    background: "#ebebeb",
                                    strokeWidth: '100%',
                                    margin: 15,
                                },
                                dataLabels: {
                                    show: true,
                                    name: {
                                        fontSize: '18px',
                                    },
                                    value: {
                                        fontSize: '16px',
                                        color: "#636a71",
                                        offsetY: 11
                                    },
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 576,
                            options: {
                                plotOptions: {
                                    radialBar: {
                                        size: 150,
                                        hollow: {
                                            size: '20%'
                                        },
                                        track: {
                                            background: "#ebebeb",
                                            strokeWidth: '100%',
                                            margin: 15,
                                        },
                                    }
                                }
                            }
                        }],
                        colors: ['#7961F9', '#EA5455'],
                        fill: {
                            type: 'gradient',
                            gradient: {
                                // enabled: true,
                                shade: 'dark',
                                type: 'vertical',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#9c8cfc', '#FFC085', '#f29292'],
                                inverseColors: false,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100]
                            },
                        },
                        stroke: {
                            lineCap: 'round'
                        },
                        chart: {
                            dropShadow: {
                                enabled: true,
                                blur: 3,
                                left: 1,
                                top: 1,
                                opacity: 0.1
                            },
                        }
                    },
                    chartLeadOptions: {
                        labels: ['Total Leads', 'This Month', 'This Week'],
                        plotOptions: {
                            radialBar: {
                                size: 165,
                                offsetY: -25,
                                hollow: {
                                    size: '20%'
                                },
                                track: {
                                    background: "#ebebeb",
                                    strokeWidth: '100%',
                                    margin: 15,
                                },
                                dataLabels: {
                                    show: true,
                                    name: {
                                        fontSize: '18px',
                                    },
                                    value: {
                                        fontSize: '16px',
                                        color: "#636a71",
                                        offsetY: 11
                                    },
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 576,
                            options: {
                                plotOptions: {
                                    radialBar: {
                                        size: 150,
                                        hollow: {
                                            size: '20%'
                                        },
                                        track: {
                                            background: "#ebebeb",
                                            strokeWidth: '100%',
                                            margin: 15,
                                        },
                                    }
                                }
                            }
                        }],
                        colors: ['#7961F9', '#FF9F43', '#EA5455'],
                        fill: {
                            type: 'gradient',
                            gradient: {
                                // enabled: true,
                                shade: 'dark',
                                type: 'vertical',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#9c8cfc', '#FFC085', '#f29292'],
                                inverseColors: false,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100]
                            },
                        },
                        stroke: {
                            lineCap: 'round'
                        },
                        chart: {
                            dropShadow: {
                                enabled: true,
                                blur: 3,
                                left: 1,
                                top: 1,
                                opacity: 0.1
                            },
                        }
                    }
                },
                productLeadRadialBar: {
                    analyticsData: [
                        { 'orderType': 'Total Leads', 'counts': 0, color: 'primary' },
                        { 'orderType': 'This Month', 'counts': 0, color: 'warning' },
                    ],

                    chartLeadOptions: {
                        labels: ['Total Leads', 'This Month', 'This Week'],
                        plotOptions: {
                            radialBar: {
                                size: 165,
                                offsetY: -25,
                                hollow: {
                                    size: '20%'
                                },
                                track: {
                                    background: "#ebebeb",
                                    strokeWidth: '100%',
                                    margin: 15,
                                },
                                dataLabels: {
                                    show: true,
                                    name: {
                                        fontSize: '18px',
                                    },
                                    value: {
                                        fontSize: '16px',
                                        color: "#636a71",
                                        offsetY: 11
                                    },
                                }
                            },
                        },
                        responsive: [{
                            breakpoint: 576,
                            options: {
                                plotOptions: {
                                    radialBar: {
                                        size: 150,
                                        hollow: {
                                            size: '20%'
                                        },
                                        track: {
                                            background: "#ebebeb",
                                            strokeWidth: '100%',
                                            margin: 15,
                                        },
                                    }
                                }
                            }
                        }],
                        colors: ['#7961F9', '#EA5455'],
                        fill: {
                            type: 'gradient',
                            gradient: {
                                // enabled: true,
                                shade: 'dark',
                                type: 'vertical',
                                shadeIntensity: 0.5,
                                gradientToColors: ['#9c8cfc', '#FFC085', '#f29292'],
                                inverseColors: false,
                                opacityFrom: 1,
                                opacityTo: 1,
                                stops: [0, 100]
                            },
                        },
                        stroke: {
                            lineCap: 'round'
                        },
                        chart: {
                            dropShadow: {
                                enabled: true,
                                blur: 3,
                                left: 1,
                                top: 1,
                                opacity: 0.1
                            },
                        }
                    }
                },
                weightValue:'',
                thisMonthLeadsCount: 0,
                thisMonthLeadsCountPercentage: 0,
                selectedWeight: '',
                uid: localStorage.getItem('uid'),
                users: [],
                // contact_mode:'sms',
                contactMode: [
                    {text: 'Email', value: 'email'},
                    {text: 'Whatsapp', value: 'whatsapp'},
                    {text: 'Sms', value: 'sms'},
                    {text: 'Phone', value: 'phone'}
                    // {label: 'Phone', value: 'phone'}
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
                // height_in_centimeter: '',
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
        methods: {
            openLoading() {
                this.$vs.loading({
                    container: '#div-with-loading',
                    scale: 0.6
                })
                setTimeout(() => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                }, 1000);
            },
            column_bar(){
                var mnthName=''
                var xaxisColumn=[]
                var currentTime=moment(new Date()).format('MM/DD/YYYY')
                var currentName=moment(new Date()).format('MMM')
                for (var t=1; t<=12; t++) {
                    xaxisColumn.push(currentName)
                    mnthName=(moment(currentTime).subtract(1, 'months'))
                    currentTime=mnthName.format('MM/DD/YYYY')
                    currentName=mnthName.format('MMM')
                }
                console.log('####')
                console.log(xaxisColumn)
                xaxisColumn.reverse()
                return xaxisColumn
            },
        },
        computed: {
            user_displayName() {
                return JSON.parse(localStorage.getItem('userInfo')).displayName
            },
            user_role() {
                return localStorage.getItem('userRole')
            },
        },
        created() {
            this.trainerCount = 0
            this.membersCount = 0
            this.membersActiveCount = 0
            this.membersInactiveCount = 0
            this.leadsCount = 0
            this.thisMonthLeadsCount = 0
            this.saleCount = 0
            this.leadsActiveCount = 0
            // if (this.user_role == 'sale') {
                firebase.firestore().collection('leads').where('lead_owner', '==', this.uid).get().then((snap) => {
                    this.leadsCount = snap.size
                    this.thisMonthLeadsCount = 0
                    this.thisMonthLeadsCountPercentage = 0
                    if (snap.size > 0) {
                        snap.forEach((doc) => {
                            if (doc.data().createdAt) {
                                let timestamp = doc.data().createdAt
                                let myDate = moment(new Date(timestamp.seconds * 1000)).format('YYYY-MM') // date object
                                if (myDate == moment(new Date()).format('YYYY-MM')) {
                                    this.thisMonthLeadsCount += 1
                                }
                            }
                        })
                    }
                    this.thisMonthLeadsCountPercentage = parseInt(((this.thisMonthLeadsCount / this.leadsCount) * 100));
                })
                firebase.firestore().collection('lead_member_conversion').where('lead_owner', '==', this.uid).get().then((snap) => {
                    this.totalConvertedLeadsCount = snap.size
                    this.thisMonthConvertedLeadsCount = 0
                    this.thisMonthConvertedLeadsCountPercentage = 0
                    if (snap.size > 0) {
                        snap.forEach((doc) => {
                            if (doc.data().createdAt) {
                                let timestamp = doc.data().createdAt
                                let myDate = moment(new Date(timestamp.seconds * 1000)).format('YYYY-MM') // date object
                                if (myDate == moment(new Date()).format('YYYY-MM')) {
                                    this.thisMonthConvertedLeadsCount += 1
                                }
                            }
                        })
                    }
                    this.thisMonthConvertedLeadsCountPercentage = parseInt(((this.thisMonthConvertedLeadsCount / this.totalConvertedLeadsCount) * 100));
                    this.statMonthLeadsCountPercentage = parseInt(((this.statMonthLeadsCount / this.statleadsCount) * 100));
                    this.series=[this.totalConvertedLeadsCount*100/this.totalConvertedLeadsCount,this.thisMonthConvertedLeadsCountPercentage]
                    this.statLeadConvertedLedgar=[
                        { 'orderType': 'Total Members', 'counts': this.totalConvertedLeadsCount, color: 'primary' },
                        { 'orderType': 'This Month', 'counts': this.thisMonthConvertedLeadsCount, color: 'danger' },
                    ]
                })
                firebase.firestore().collection('leads').where('lead_owner', '==', this.uid).where('isLead', '==', false).get().then((snap) => {
                    this.leadsActiveCount = snap.size
                })
                let data = []
                firebase.firestore().collection('lead_member_conversion').where('lead_owner', '==', this.uid).get().then((snap) => {
                    if (snap.size > 0) {
                        snap.forEach((doc) => {
                            data.push(doc.data())
                        })
                    }
                })
                    .then(() => {
                        for (var i=0; i<=11; i++) {
                            let countRecord = 0
                            let monthToSearch = moment(new Date()).subtract(i, 'months').format('MM/YYYY');
                            for (var k = 0; k <= data.length - 1; k++){
                                if (data[k] && data[k].createdAt && data[k].createdAt.seconds) {
                                    let timestamp = moment(new Date(data[k].createdAt.seconds * 1000)).format('MM/YYYY') // date object
                                    if (monthToSearch == timestamp) {
                                        countRecord += 1
                                    }
                                }
                            }
                            this.monthyYAxix.push(countRecord)
                        }
                        this.columnChart.series[1].data = this.monthyYAxix.reverse();
                    })

                let leadData = []
                firebase.firestore().collection('leads').where('lead_owner', '==', this.uid).get().then((snap) => {
                    if (snap.size > 0) {
                        snap.forEach((doc) => {
                            leadData.push(doc.data())
                        })
                    }
                })
                    .then(() => {
                        for (var i=0; i<=11; i++) {
                            let countRecord = 0
                            let monthToSearch = moment(new Date()).subtract(i, 'months').format('MM/YYYY');
                            for(var k = 0; k <= leadData.length - 1; k++){
                                if (leadData[k] && leadData[k].createdAt && leadData[k].createdAt.seconds) {
                                    let timestamp = moment(new Date(leadData[k].createdAt.seconds * 1000)).format('MM/YYYY') // date object
                                    if (monthToSearch == timestamp) {
                                        countRecord += 1
                                    }
                                }
                            }
                            this.monthyMembesrYAxix.push(countRecord)
                        }
                        this.columnChart.series[0].data = this.monthyMembesrYAxix.reverse()
                        this.lineChartToggle = true
                    })

            firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').get().then((snap) => {
                this.membersCount = snap.size
                this.thisMonthMembersCount = 0
                this.MonthMembersCountPercentage = 0
                if (snap.size > 0) {
                    snap.forEach((doc) => {
                        if (doc.data().createdAt) {
                            let timestamp = doc.data().createdAt
                            let myDate = moment(new Date(timestamp.seconds * 1000)).format('YYYY-MM') // date object
                            if (myDate == moment(new Date()).format('YYYY-MM')) {
                                this.MonthMembersCountPercentage += 1
                            }
                        }
                    })
                }
                this.MonthMembersCountPercentage = parseInt(((this.thisMonthMembersCount / this.leadsCount) * 100));
            })
            firebase.firestore().collection('leads').where('lead_owner', '==', this.uid).get().then((snap) => {
                this.statleadsCount = snap.size
                this.statMonthLeadsCount = 0
                this.statMonthLeadsCountPercentage = 0
                if (snap.size > 0) {
                    snap.forEach((doc) => {
                        if (doc.data().createdAt) {
                            let timestamp = doc.data().createdAt
                            let myDate = moment(new Date(timestamp.seconds * 1000)).format('YYYY-MM') // date object
                            if (myDate == moment(new Date()).format('YYYY-MM')) {
                                this.statMonthLeadsCount += 1
                            }
                        }
                    })
                }
                this.statMonthLeadsCountPercentage = parseInt(((this.statMonthLeadsCount / this.statleadsCount) * 100));
                this.leadSeries=[this.statleadsCount*100/this.statleadsCount,this.statMonthLeadsCountPercentage]
                this.statLeadLedgar=[
                    { 'orderType': 'Total Leads', 'counts': this.statleadsCount, color: 'primary' },
                    { 'orderType': 'This Month', 'counts': this.statMonthLeadsCount, color: 'danger' },
                ]
            })


            firebase.firestore().collection('users').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data()) {
                        let data = doc.data()
                        if (data.status) {
                            if ( data.program_type_start && data.program_type_start) {
                                if (data.program_type_start && data.program_type_start) {
                                    var paused_days = data.days_paused ? data.days_paused : 0
                                    var programTypeStart = moment(data.program_type_start).format('YYYY-MM-DD')
                                    if(data['memberDetail']['program_type']){
                                        firebase.firestore().collection('package').doc(data['memberDetail']['program_type']).get()
                                            .then(doc => {
                                                var packageDuration = parseInt(doc.data().tenure) + parseInt(paused_days)
                                                var endDate = moment(programTypeStart).add(packageDuration, 'days')
                                                endDate = moment(endDate).format('YYYY-MM-DD')
                                                var now = moment().format('YYYY-MM-DD')
                                                if (now > endDate) {
                                                    console.log('members expired');
                                                    doc.ref.update({isLead: true});
                                                }
                                            })
                                    }
                                }
                            }
                        }
                    }

                })
            })


        },
        components: {
            VueApexCharts,
            'v-select': vSelect,
        },
    }
</script>

<style lang="scss">
  .height-2 .vs-con-input {
    float: left !important;
    width: 78% !important;
  }

  .number-22 .vs-con-input {
    width: 100% !important;
  }

  label {
    diaplay: block;
  }

  .vs__dropdown-menu li {
    width: 100%;
  }

  .vs--searchable .vs__dropdown-toggle {
    height: 38px;
  }

  /*.vs-input--label{*/
  /*font-size: 14px;*/
  /*display: block !important;*/
  /*}*/
  .height-2 .parent-dropdown {
    padding: 9px;
    font-size: 16px;
  }

  .select-22 {
    width: 150px;
    height: 38px;
    float: left;
    margin: 10px 0 0;

    .vs__search {
      display: none;
    }
  }

  /*.vs-radio--borde{*/
  /*background: #ccc;*/
  /*}*/
  .no-radio {
    .vs-radio {
      display: none;
    }
  }

  #dashboard-analytics {
    .greet-user {
      position: relative;

      .decore-left {
        position: absolute;
        left: 0;
        top: 0;
      }

      .decore-right {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .vs__search, .vs__search:focus {
      display: none;
    }

    .chart-holder {
      /*padding: 10px;*/
      overflow: hidden;
      background: #fff;
      border-radius: 8px;
    }

    .avatar-content {
      width: 40px;
      height: 40px;
      padding: 9px 4px;
      border-radius: 50%;
      background: #f5f5f5;
      text-align: center;
      border: 1px solid #f5f5f5;

      .icon-users {
        font-size: 18px;
      }
    }

    .weight_22 .vs-con-input {
      width: 100% !important;
    }

    .demo-alignment.gender li {
      width: 25%;
      margin-top: 0 !important;

      label {
        margin: 0 20px 0 0;
      }
    }

    .demo-alignment.method li {
      width: 44%;
    }

    .demo-alignment.activity-level li {
      width: 44%;
    }

    .cal-table {
      width: 100%;

      th,
      td,
      .vs-table-text {
        width: auto;
      }

      .vs-con-input-label {
        width: auto;
      }
    }

    .desktop-hide {
      display: none;
    }

    .mobile-hide {
      display: block;
    }

    @media(max-width: 767px) {
      .desktop-hide {
        display: block !important;
      }
      .mobile-hide {
        display: none !important;
      }
    }
    @media(max-width: 576px) {
      .decore-left, .decore-right {
        width: 140px;
      }
    }

    .member-dashboard .cstm-label {
      font-weight: 500;
    }

    .member-dashboard .cstm-label::before {
      content: "";
      border-right: 3px solid rgb(115, 103, 240);
      margin-right: 3px;
    }
  }
  #avatar-col{width:10rem}

  #page-user-view table td{padding-bottom:.8rem}

</style>
