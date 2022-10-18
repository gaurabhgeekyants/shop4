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
     <!-- <div class="vx-col w-full mb-base">
        <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
          <img src="../assets/images/elements/decore-left.png" class="decore-left" alt="Decore Left" width="175">
          <img src="../assets/images/elements/decore-right.png" class="decore-right" alt="Decore Right" width="175">
          <h1 class="mb-6 text-white">Welcome {{ user_displayName }},</h1>
        </vx-card>
      </div>-->
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
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base" v-show="clientRetentionBarToggle === true">
        <statistics-card-line icon="UsersIcon" :statistic=membersCount statisticTitle="Total Members Gained" :chartData="membersGained" type='area'></statistics-card-line>
      </div>
      <!--<div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base">
        <div class="chart-holder">
          &lt;!&ndash; CARD 2: SUBSCRIBERS GAINED &ndash;&gt;

          <vx-card title="Total Members">
            <pie-chart v-if="membersCount > 0" :data="[['Total', membersCount]]"></pie-chart>
            <h6 style="text-align: center;padding: 141px 0;" v-if="membersCount == 0">No Members Added Yet!</h6>
          </vx-card>
        </div>
      </div>-->
   <!--   <div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base">
        <div class="chart-holder">
          <vx-card title="Members Statistics">
            <pie-chart v-if="membersCount > 0"
                       :data="[['Total', membersCount], ['Active', membersActiveCount], ['Inactive', membersInactiveCount]]"></pie-chart>
            <h6 style="text-align: center;padding: 141px 0;" v-if="membersCount == 0">No Members Added Yet!</h6>
          </vx-card>
        </div>
      </div>-->
    </div>
    <div class="vx-row">
      <div class="vx-col w-full lg:w-1/2 lg:mt-0 mt-base">
        <vx-card title="Program Sold" v-show="packageChartToggle === true">
          <vue-apex-charts type="donut"  height="350" :options="packageChart.chartOptions" :series="packageChart.seriessss"></vue-apex-charts>
          <h6 style="text-align: center;padding: 141px 0;" v-if="packageChart.length == 0">No Program Sold Yet!</h6>
        </vx-card>


      </div>
      <div class="vx-col w-full lg:w-1/2 lg:mt-0 mt-base">
        <!--<vx-card title="Total Members" v-show="packageChartToggle === true">
      <div class="vx-col w-full lg:w-1/2 lg:mt-0 mt-base">
      <vue-apex-charts type="radialBar" height="350" :options="radialBarChart.chartOptions" :series="radialBarChart.series"></vue-apex-charts>
      </div>
        </vx-card>-->

        <vx-card title="Total Members" v-show="packageChartToggle === true">
          <vue-apex-charts type="donut"  height="350" :options="memberActiveChart.chartOptions" :series="memberActiveChart.seriessss"></vue-apex-charts>
          <h6 style="text-align: center;padding: 141px 0;" v-if="memberActiveChart.length == 0">No Program Sold Yet!</h6>
        </vx-card>
      </div>
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
    import Progress from "easy-circular-progress";
    import $ from 'jquery';
    import moment from 'moment'
    import VueApexCharts from 'vue-apexcharts'
    import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
    export default {
        data() {
            return {
                counter: 0,
                deactivecounter: 0,
                radialBarChart: {
                    series: [10,12,13],
                    chartOptions: {
                        colors: ['#7367F0', '#28C76F', '#EA5455', '#FF9F43', '#1E1E1E'],
                        plotOptions: {
                            radialBar: {
                                dataLabels: {
                                    name: {
                                        fontSize: '22px',
                                    },
                                    value: {
                                        fontSize: '16px',
                                    },
                                    total: {
                                        show: true,
                                        label: 'Total',
                                      /*  formatter: function(w) {
                                            // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                                            return 249
                                        }*/
                                    }
                                }
                            }
                        },
                        labels: ['Total','Active','In Active'],
                    }
                },
                // LINE AREA CHARt
                 clientRetentionBarToggle : false,
                packageChartToggle:false,
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
                weightValue:'',
                thisMonthLeadsCount: 0,
                thisMonthLeadsCountPercentage: 0,
                selectedWeight: '',
                uid: localStorage.getItem('uid'),
                users: [],
                trainersChart: [],
                packageChart: [],
                memberActiveChart: [],
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
                firstName: "",
                lastName: "",
                email: "",
                bodyfat: "",
                bg_protein: 'low',
                goal: "Select Your Goal",
                city: "new-york",
                proposalTitle: "",
                jobTitle: "",
                textarea: "",
                eventName: "",
                eventLocation: "san-francisco",
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
                sixMonthyYAxix:[],
            }
        },
        methods: {
            getUsersWithPackages() {
                this.users = []
                let i = 1
                var query = firebase.firestore().collection('users')
//                if(this.user_role == 'trainer'){
//                    query = query.where('assigned_trainer','==',firebase.auth().currentUser.uid)
//                    console.log(this.user_role)
//                }
                if (this.user_role == 'admin') {
                    query = query.where('role', '==', 'member')
                }
                query.orderBy('createdAt','desc').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        let member = {
                            "id": i++,
                            "status": doc.data()['status'] == true ? 'Active' : 'Inactive',
                            "statusColor": doc.data()['status'] == true ? "success" : "danger",
                            "operator": doc.data()['name'],
                            "operatorImg": doc.data()['profileUrl'],
                            "email": doc.data()['email'],
                            "name": doc.data()['name'],
                        }
                        firebase.firestore().collection('users')
                            .doc(doc.id)
                            .get()
                            .then(snap => {
                                    let data = snap.data();
                                    let memberObj = data['memberDetail'];
                                    let current_package = memberObj['program_type'] ? memberObj['program_type'] : '';
                                    let days_paused = data['days_paused'] ? data['days_paused'] : 0
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
            openLoading() {
                this.$vs.loading({
                    container: '#div-with-loading',
                    scale: 0.6
                })
                setTimeout(() => {
                    this.$vs.loading.close('#div-with-loading > .con-vs-loading')
                }, 1000);
            },
            activeInactiveNo(){
                firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').get()
                    .then(doc => {
                        doc.forEach((doc) => {
//                            data.push(doc.data())
                            let data = doc.data()
                            var activeMember=0
                            var activeMem=''
                            if (data.status) {
                                if (data.role == 'member' && data.program_type_start && data.program_type_start) {
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
                                                    if (now < endDate) {
//                                                        activeMem=activeMember+1
                                                        activeMember=1
                                                        activeMem += activeMember
                                                        this.counter++;
                                                    }
                                                    else {
                                                        this.deactivecounter++;
                                                    }
                                                    console.log('^****^')
                                                    console.log(this.counter)
                                                     var leftMembers=parseFloat(this.counter+this.deactivecounter)//26-16

                                                    this.memberActiveChart ={
                                                        seriessss: [this.counter,this.deactivecounter,parseFloat(this.membersCount-leftMembers)],
                                                        chartOptions
                                                            :
                                                            {
                                                                labels: ['Active','Deactive','Total'],//packageChartName,
                                                                colors
                                                                    :
                                                                    ['#28C76F', '#7367F0', '#FF9F43'],//, '#FF9F43', '#1E1E1E'

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
                                        }

                                    }
                                }
                            }
                        })
                    })
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
            this.activeInactiveNo()

            this.trainerCount = 0
            this.membersCount = 0
            this.membersActiveCount = 0
            this.membersInactiveCount = 0
            this.leadsCount = 0
            this.thisMonthLeadsCount = 0
            this.saleCount = 0
            this.leadsActiveCount = 0
            var packageChartData = []
            var packageChartName = []

            let data = []
            firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').get().then((snap) => {
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
//                    this.clientRetentionBar.series[0].data = this.monthyYAxix.reverse();
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
                /*    console.log('/////////')
                    console.log(this.sixMonthyYAxix)*/
                    this.membersGained.series[0].data = this.sixMonthyYAxix.reverse();
                    this.clientRetentionBarToggle = true

                })


            if (this.user_role == 'trainer') {
                this.getUsersWithPackages()
            }
            firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('role', '==', 'member').get().then((snap) => {
                this.membersCount = snap.size
                this.radialBarChart.series[0]=snap.size
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
            firebase.firestore().collection('package').get().then((snap) => {
                snap.forEach((doc) => {
                    var totalWords = doc.data()['title']
                    firebase.firestore().collection('users').where('assigned_trainer', '==', this.uid).where('memberDetail.program_type', '==', doc.id).get().then((snap) => {
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
    display: block;
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
