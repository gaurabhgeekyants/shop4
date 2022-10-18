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
      <div class="vx-col w-full lg:w-1/2 mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
          <img src="../assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="200" >
          <img src="../assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
          <h1 class="mb-6 text-white">Welcome {{user_displayName}}</h1>
            <!--<p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">You have done <strong>57.6%</strong> more sales today. Check your new badge in your profile.</p>-->
        </vx-card>
      </div>
      <!-- CARD 2: SUBSCRIBERS GAINED -->
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base" v-show="clientRetentionBarToggle === true">
        <statistics-card-line icon="UsersIcon" :statistic=membersCount statisticTitle="Total Members Gained" :chartData="membersGained" type='area'></statistics-card-line>
      </div>

      <!-- CARD 3: ORDER RECIEVED -->
      <!-- <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4 mb-base" v-show="clientRetentionBarToggle === true">
        <statistics-card-line icon="ShoppingBagIcon" :statistic=leadsCount statisticTitle="Total Leads Gained" :chartData="leadsGained" color='warning' type='area'></statistics-card-line>
      </div> -->

    </div>

    <div class="vx-row">
      <div  class="vx-col w-full lg:w-1/2 lg:mt-0 mt-base">
        <vx-card title="Number of clients/trainer" v-if="barChartToggle">
           <!--<vue-apex-charts type="bar" height="350" :options="barChart.chartOptions" :series="barChart.series"></vue-apex-charts>-->
          <vue-apex-charts type="bar" height="350" v-if="barChartToggle" :options="barChart.chartOptions" :series="barChart.series"></vue-apex-charts>

        </vx-card>
      </div>

      <!-- <div class="vx-col w-full lg:w-1/2 lg:mt-0 mt-base">
        <vx-card title="Program Sold" v-show="packageChartToggle === true">
            <vue-apex-charts type="donut"  height="350" :options="packageChart.chartOptions" :series="packageChart.seriessss"></vue-apex-charts>
          <h6 style="text-align: center;padding: 141px 0;" v-if="packageChart.length == 0">No Program sold yet!</h6>
        </vx-card>
      </div> -->

    </div>
  <br>

    <!-- <div class="vx-row">
      <div  class="vx-col w-full lg:w-1/1 lg:mt-0 mt-base">
        <vx-card title="Number of Members" v-show="clientRetentionBarToggle === true">
          <vue-apex-charts type=bar height=277 :options="clientRetentionBar.chartOptions" :series="clientRetentionBar.series" />
        </vx-card>

      </div>
      </div> -->
    <br/>

    <div class="vx-row">
      <div class="vx-col w-full">
        <vx-card title="Members Package Info">
          <div slot="no-body" class="mt-4">
            <vs-table :data="users">
              <template slot="thead">
                <vs-th>#</vs-th>
                <vs-th>avatar</vs-th>
                <vs-th>Name</vs-th>
                <vs-th>eMail</vs-th>
                <vs-th>Status</vs-th>
                <vs-th>Trainer</vs-th>
                <vs-th>Program Start Date</vs-th>
                <vs-th>Program End Date</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    <span>{{indextr+1}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <img v-if="data[indextr].avatar != ''" :src="data[indextr].avatar ? data[indextr].avatar : '../assets/images/portrait/small/default-profile.png'"  class="rounded-full shadow-md cursor-pointer block" style="width: 40px; height: 40px;">
                    <img v-if="data[indextr].avatar == '' && data[indextr].gender=='male' " src="../assets/images/portrait/small/default-profile.png" class="rounded-full shadow-md cursor-pointer block" style="width: 40px; height: 40px;">
                    <img v-if="data[indextr].avatar == '' && data[indextr].gender=='female'" src="../assets/images/portrait/small/female_avatar_vector.png" class="rounded-full shadow-md cursor-pointer block" style="width: 40px; height: 40px;">
                    <img v-if="data[indextr].avatar == '' && data[indextr].gender=='other'" src="../assets/images/portrait/small/default-profile.png" class="rounded-full shadow-md cursor-pointer block" style="width: 40px; height: 40px;">
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <span>{{data[indextr].name}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <span>{{data[indextr].email}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].status">
                    <span class="flex items-center px-2 py-1 rounded">
                      <div class="h-3 w-3 rounded-full mr-2"
                           :class="'bg-' + data[indextr].statusColor"></div>{{data[indextr].status}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <ul class="users-liked user-list">
                      <li v-for="(user, userIndex) in data[indextr].usersLiked" :key="userIndex">
                        <vx-tooltip :text="user.name" position="bottom" style="float: left">
                          <span>{{user.name}}</span>
                        </vx-tooltip>
                      </li>
                    </ul>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <span>{{data[indextr].programeName}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <span>{{data[indextr].startDate}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    <span>{{data[indextr].endDate}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>

        </vx-card>
      </div>
    </div>
    </div>

</template>
<script>

    import Vue from 'vue'
    import Chartkick from 'vue-chartkick'
    import Chart from 'chart.js'
    import analyticsData from './ui-elements/card/analyticsData.js'

    Chartkick.options = {
        colors: ["#4b7bec", "#26de81", "#eb3b5a"]
    },

        Vue.use(Chartkick.use(Chart))
    import firebase from 'firebase/app'

    require('firebase/firestore')
    import 'firebase/auth'
    import vSelect from 'vue-select'
    import Progress from "easy-circular-progress";
    import $ from 'jquery';
    // import circleCounter from 'vue-circle-counter'
    import moment from 'moment'
    import VueApexCharts from 'vue-apexcharts'
    import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
    export default {
        data() {
            return {
                barChartToggle:false,
                clientRetentionBarToggle:false,
                packageChartToggle:false,
                analyticsData: analyticsData,
//                themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E']//leadsGained.series[0].data
                leadsGained: {
                    series: [{
                        name:'Leads',
                        data: []//[11,11,22]
                    }],
                    chartOptions: {
                        grid: {
                            show: false,
                            padding: {
                                left: 0,
                                right: 0
                            }
                        },
                        chart: {
                            toolbar: {
                                show: false,
                            },
                            sparkline: {
                                enabled: true
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 2.5
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {
                                shadeIntensity: 0.9,
                                opacityFrom: 0.7,
                                opacityTo: 0.5,
                                stops: [0, 80, 100]
                            }
                        },
                        xaxis: {
                            type: 'numeric',
                            lines: {
                                show: false,
                            },
                            axisBorder: {
                                show: false,
                            },
                            labels: { show: false }
                        },
                        yaxis: [{
                            y: 0,
                            offsetX: 0,
                            offsetY: 0,
                            padding: { left: 0, right: 0 },
                        }],
                        tooltip: {
                            x: { show: false }
                        },
                    },
                },
                // LINE AREA CHART
                membersGained: {
                    series: [{
                        name: 'Members',
                        data: [],//[28, 40, 36, 52, 38, 60, 55]
                    }],
                    chartOptions: {
                        grid: {
                            show: false,
                            padding: {
                                left: 0,
                                right: 0
                            }
                        },
                        chart: {
                            toolbar: {
                                show: false,
                            },
                            sparkline: {
                                enabled: true
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        stroke: {
                            curve: 'smooth',
                            width: 2.5
                        },
                        fill: {
                            type: 'gradient',
                            gradient: {
                                shadeIntensity: 0.9,
                                opacityFrom: 0.7,
                                opacityTo: 0.5,
                                stops: [0, 80, 100]
                            }
                        },
                        xaxis: {
                            type: 'numeric',
                            lines: {
                                show: false,
                            },
                            axisBorder: {
                                show: false,
                            },
                            labels: { show: false }
                        },
                        yaxis: [{
                            y: 0,
                            offsetX: 0,
                            offsetY: 0,
                            padding: { left: 0, right: 0 },
                        }],
                        tooltip: {
                            x: { show: false }
                        },
                    },
                },
                barChart: {
                    series: [{
                        data:
                            []
                    }],
                    chartOptions: {
                        colors:  ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                        plotOptions: {
                            bar: {
                                horizontal: true,
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        xaxis: {
                            categories: [],
                               /* [
                                    'South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                                'United States', 'China', 'Germany'
                            ],*/
                        }
                        }
                    },
//                themeColors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                donutChart: {
                    seriessss: [44, 55, 41, 17],
                    chartOptions: {
                        labels: ['Team A', 'Team B', 'Team C', 'Team D','yyt'],
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],

                        responsive: [{
                            breakpoint: 480,
                            options: {
                                chart: {
                                    width: 200
                                },
                                legend: {
                                    position: 'bottom'
                                }
                            }
                        }]
                    }
                },


                clientRetentionBar: {
                    series: [{
                        name: 'New Members',
                        data: [175, 125, 225, 175, 160, 189, 206, 134, 159, 216, 148, 123]
                    }, {
                        name: 'New Leads',
                        data: [-144, -155, -141, -167, -122, -143, -158, -107, -126, -131, -140, -137]
                    }],
                    chartOptions: {
                        grid: {
                            borderColor: '#ebebeb',
                            padding: {
                                left: 0,
                                right: 0
                            }
                        },
                        legend: {
                            show: false,
                        },
                        dataLabels: {
                            enabled: false
                        },
                        chart: {
                            stacked: true,
                            type: 'bar',
                            toolbar: { show: false },
                        },
                        colors: ['#7367F0', '#EA5455'],
                        plotOptions: {
                            bar: {
                                columnWidth: '10%'
                            }
                        },
                        xaxis: {
                            labels: {
                                style: {
                                    cssClass: 'text-grey fill-current',
                                }
                            },
                            axisTicks: {
                                show: false,
                            },
                            categories: this.column_bar(),//['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                            axisBorder: {
                                show: false,
                            },
                        },
                        yaxis: {
                            tickAmount: 5,
                            labels: {
                                style: {
                                    cssClass: 'text-grey fill-current',
                                }
                            }
                        },
                        tooltip: {
                            x: { show: false }
                        },
                    }
                },

                profileUrl:'',
                monthyMembesrYAxix:[],
                sixMonthMembesrYAxix:[],
                xaxisMembersColumn:[],
                monthMembers:'',
                insideMembersMonth:'',
                monthlyMembersStat:'',
                monthyYAxix:[],
                sixMonthyYAxix:[],
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
                series: [],
                weightValue:'',
                thisMonthLeadsCount: 0,
                thisMonthLeadsCountPercentage: 0,
                selectedWeight: '',
                uid: localStorage.getItem('uid'),
                users: [],
                trainersChart: [],
                trainersChartName: {},
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
                activity_level: '',
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
                xaxisColumn.reverse()
                return xaxisColumn
            },
            getUsersWithPackages() {
                this.users = []
                let i = 1
                var query = firebase.firestore().collection('users')
//                if(this.user_role == 'trainer'){
//                    query = query.where('assigned_trainer','==',firebase.auth().currentUser.uid)
//                }
                if (this.user_role == 'admin') {
                    query = query.where('role', '==', 'member').orderBy('createdAt', 'desc')
                }
                query.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let member = {
                            "id": i++,
                            "nid": i++,
                            "status": doc.data()['status'] == true ? 'Active' : 'Inactive',
                            "statusColor": doc.data()['status'] == true ? "success" : "danger",
                            "operator": doc.data()['name'],
                            "operatorImg": doc.data()['profileUrl'],
                            "email": doc.data()['email'],
                            "name": doc.data()['first_name']?doc.data()['first_name']+' '+doc.data()['last_name']:doc.data()['name'],
                            "avatar": doc.data()['profileUrl']?doc.data()['profileUrl']:'',
                            "gender":doc.data()['gender']?doc.data()['gender']:'male'
                        }
                        firebase.firestore().collection('users')
                            .doc(doc.id)
                            .get()
                            .then(snap => {
                                    let data = snap.data();
                                    let memberObj = data['memberDetail'];
                                    let current_package = memberObj['program_type'] ? memberObj['program_type'] : false
                                    // let days_paused = data['days_paused'] ? data['days_paused'] : 0
                                    if (data['program_type_start'] && data['program_type_start'] != '') {
                                        member['startDate'] = moment(data['program_type_start']).format('DD-MM-YYYY')
                                        var starting_date = data['program_type_start']
                                        if (doc.data()['assigned_trainer']) {
                                            firebase.firestore().collection('users').doc(doc.data()['assigned_trainer']).get().then((doc1) => {
                                                member['usersLiked'] = [
                                                    {name: doc1.data() ? doc1.data().name : 'Not Assigned Yet'},
                                                ]
                                            })
                                        } else {
                                            member['usersLiked'] = [
                                                {name: 'Not Assigned Yet'},
                                            ]
                                        }
                                        if (current_package) {
                                            firebase.firestore().collection('package')
                                                .doc(current_package)
                                                .get()
                                                .then(snap => {
                                                        let data = snap.data();
                                                        member['programeName'] = data['title']
                                                        let days_paused = data['days_paused'] ? data['days_paused'] : 0
                                                        var numberOfDaysToAdd = parseInt(data['tenure']) + parseInt(days_paused);
                                                        member['endDate'] = moment(starting_date).add(numberOfDaysToAdd, 'days').format('DD-MM-YYYY')
                                                        this.show_program_info = true
                                                        this.users.push(member)
                                                    }
                                                )
                                        } else {
                                            member['programeName'] = '-- -- --'
                                            member['startDate'] = 'Not Started Yet'
                                            member['endDate'] = '-- -- --'
                                        }
                                    } else {
                                        member['programeName'] = '-- -- --'
                                        member['startDate'] = 'Not Started Yet'
                                        member['endDate'] = '-- -- --'
                                    }
                                }
                            )
                    })
                })
            },
            getProgramInfo() {
                firebase.firestore().collection('users')
                    .doc(this.uid)
                    .get()
                    .then(snap => {
                            let data = snap.data();
                            let memberObj = data['memberDetail'];
                            let current_package = memberObj['program_type'] ? memberObj['program_type'] : false
                            let days_paused = data['days_paused'] ? data['days_paused'] : 0
                            if (data['program_type_start'] && data['program_type_start'] != '') {
                                this.program_started = moment(data['program_type_start']).format('DD-MM-YYYY')
                                var starting_date = data['program_type_start']
                                if (current_package) {
                                    firebase.firestore().collection('package')
                                        .doc(current_package)
                                        .get()
                                        .then(snap => {
                                                let data = snap.data();
                                                var numberOfDaysToAdd = parseInt(data['tenure']) + parseInt(days_paused);
                                                this.program_ending = moment(starting_date).add(numberOfDaysToAdd, 'days').format('DD-MM-YYYY')
                                                this.show_program_info = true
                                            }
                                        )
                                }
                            }
                        }
                    )
                    .then(() => {
                        this.changeItem()
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            openLoading() {
                this.$vs.loading({
                    container: '#div-with-loading',
                    scale: 0.6
                })
                setTimeout(() => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                }, 1000);
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
//             function asyncFun () {
                 var trainersChartData = []
                 var trainersChartDataName = []
//                 var trainersChartName = {}
//                 var packageChartData = []
//                 var packageChartName = []

                 firebase.firestore().collection('users').where('role', '==', 'trainer').get().then((snap) => {
                     this.trainerCount = snap.size
                    this.barChartToggle=false
                     if (snap.size > 0) {
                         snap.forEach((doc) => {
                             var totalWords = doc.data()['name']
                             var firstWord = totalWords.replace(/ .*/, '')
                             let trainerName = firstWord
                             firebase.firestore().collection('users').where('assigned_trainer', '==', doc.id).where('role', '==', 'member').get().then((snap) => {
                                 trainersChartDataName.push(trainerName)
                                 trainersChartData.push(snap.size)
                             })
                         })
                         this.barChart.series[0].data=trainersChartData
                         this.barChart.chartOptions.xaxis.categories = trainersChartDataName
                     }
                     var scope = this
                     setTimeout(function(){
                         scope.barChartToggle = true
                     },6000)
                 })

//                 return this.barChart
//             }
//             (async () => {
//                     await asyncFun()
////                 console.log(await asyncFun())
//             }
//             )()

            this.column_bar()
            this.trainerCount = 0
            this.membersCount = 0
            this.membersActiveCount = 0
            this.membersInactiveCount = 0
            this.leadsCount = 0
            this.thisMonthLeadsCount = 0
            this.saleCount = 0
            this.leadsActiveCount = 0
            if (this.user_role == 'admin') {
                this.getUsersWithPackages()
                this.trainersChart = []
                var trainersChartData = []
                var trainersChartDataName = []
                var trainersChartName = {}
                var packageChartData = []
                var packageChartName = []

                firebase.firestore().collection('users').where('role', '==', 'trainer').where('status', '==', true).get().then((snap) => {
                    this.trainerActiveCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'trainer').where('status', '==', false).get().then((snap) => {
                    this.trainerInactiveCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'member').get().then((snap) => {
                    this.membersCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'member').where('status', '==', true).get().then((snap) => {
                    this.membersActiveCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'member').where('status', '==', false).get().then((snap) => {
                    this.membersInactiveCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'sale').get().then((snap) => {
                    this.saleCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'sale').where('status', '==', true).get().then((snap) => {
                    this.saleActiveCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'sale').where('status', '==', false).get().then((snap) => {
                    this.saleInactiveCount = snap.size
                })
                firebase.firestore().collection('leads').get().then((snap) => {
                    this.leadsCount = snap.size
                })
                firebase.firestore().collection('users').where('role', '==', 'sale').get().then((snap) => {
                    this.saleCount = snap.size
                })

                firebase.firestore().collection('package').get().then((snap) => {
                    snap.forEach((doc) => {
                        var totalWords = doc.data()['title']
                        firebase.firestore().collection('users').where('memberDetail.program_type', '==', doc.id).get().then((snap) => {
                            var packageChartDataTemp = []
//                            packageChartDataTemp.push(totalWords)
//                            packageChartDataTemp.push(snap.size)
                            packageChartData.push(snap.size)
                            packageChartName.push(totalWords)
                        })
                        this.packageChartToggle=true

                        this.packageChart ={
                            seriessss: packageChartData,
                                chartOptions
                        :
                            {
                                labels: packageChartName,
                                    colors
                            :
                                ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],

                                    responsive
                            :
                                [{
                                    breakpoint: 480,
                                    options: {
                                        chart: {
                                            width: 200
                                        },
                                        legend: {
                                            position: 'bottom'
                                        }
                                    }
                                }]
                            }
//                        }
                    }
                    })

                })


                let data = []
                firebase.firestore().collection('lead_member_conversion').get().then((snap) => {
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
                        this.clientRetentionBar.series[0].data = this.monthyYAxix.reverse();
                        for (var i=0; i<=5; i++) {
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
                            this.sixMonthyYAxix.push(countRecord)
                        }

                        this.membersGained.series[0].data = this.sixMonthyYAxix.reverse();
                })

                let leadData = []
                firebase.firestore().collection('leads').get().then((snap) => {
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

                        this.clientRetentionBar.series[1].data = this.monthyMembesrYAxix.reverse()
                        for (var i=0; i<=5; i++) {
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
                            this.sixMonthMembesrYAxix.push(countRecord)
                        }
                        this.leadsGained.series[0].data=this.sixMonthMembesrYAxix.reverse()
                            this.clientRetentionBarToggle = true
                    })

            } else if (this.user_role == 'sale' || this.user_role == 'admin') {
                // this.dataMember()
                // this.dataLeadConverted()
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

                firebase.firestore().collection('leads').where('lead_owner', '==', this.uid).where('isLead', '==', false).get().then((snap) => {
                    this.leadsActiveCount = snap.size
                })

            } else {
                firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').get().then((snap) => {
                    this.membersCount = snap.size
                })
                firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').where('status', '==', true).get().then((snap) => {
                    this.membersActiveCount = snap.size
                })
                firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').where('status', '==', false).get().then((snap) => {
                    this.membersInactiveCount = snap.size
                })
            }
        },
        components: {
            VueApexCharts,
            StatisticsCardLine,
            Progress,
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
  #dashboard-analytics {
    .greet-user{
      position: relative;
      .decore-left{
        position: absolute;
        left:0;
      }
      .decore-right{
        position: absolute;
        right:0;
        top: 0;
      }
    }

    @media(max-width: 576px) {
      .decore-left, .decore-right{
        width: 140px;
      }
    }
  }
</style>
