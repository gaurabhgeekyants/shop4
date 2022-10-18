<!-- =========================================================================================
  File Name: view meal plan for trainer
  Description: Trainer can view member stats,profile add meal plan option withs charts
   ========================================================================================== -->

<template>
    <div id="view-members">


        <div class="con-input-search vs-table--search">
            <input type="text" class="search-member-input" v-model="search" @change="getSearchList"><i
                class="vs-icon notranslate icon-scale material-icons null">
            search</i></div>

        <vs-table pagination max-items="25" :data="users" ref="table">

            <template slot="thead">
                <vs-th sort-key="title">#</vs-th>
                <vs-th sort-key="name">Name</vs-th>
                <vs-th sort-key="action">Program</vs-th>
                <vs-th sort-key="action">Start Date</vs-th>
                <vs-th sort-key="action">End Date</vs-th>
                <vs-th sort-key="action">Meal Plan1 </vs-th>
                <vs-th sort-key="action">Meal Plan 2</vs-th>
                <vs-th sort-key="action">Meal Plan 3</vs-th>
                <vs-th sort-key="action">Action</vs-th>

            </template>

            <template slot-scope="{data}">
                <tbody>


                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="indextr" style="text-align: center;">
                        {{indextr + 1}}
                    </vs-td>
                    <vs-td :data="tr.name" style="text-align: center;">
                        <img v-if="tr.profileUrl" :src="tr.profileUrl"
                             style="width: 30px; height: 30px; border-radius: 50%;float: left">
                        <img v-if="!tr.profileUrl && tr.gender=='male'"
                             src="@/assets/images/portrait/small/default-profile.png"
                             style="width: 30px; height: 30px; border-radius: 50%;float: left">
                        <img v-if="!tr.profileUrl && tr.gender=='female'"
                             src="@/assets/images/portrait/small/female_avatar_vector.png"
                             style="width: 30px; height: 30px; border-radius: 50%;float: left">
                        <img v-if="!tr.profileUrl && tr.gender=='other'"
                             src="@/assets/images/portrait/small/default-profile.png"
                             style="width: 30px; height: 30px; border-radius: 50%;float: left">
                        <span style="margin-left: 5px;margin-top: 5px;float: left;"
                              @click="$router.push({name:'view-members-profile',params:{uid:tr.id}})">{{ tr.name
                            }}</span>
                    </vs-td>
                    <vs-td :data="tr.programeName" style="text-transform: lowercase; text-align: center;">
                        {{ tr.programeName }}
                    </vs-td>
                    <vs-td :data="tr.startDate" style="text-align: center;">
                        <label v-if="tr.startDate !='Not Started Yet'"> {{ tr.startDate }}</label>
                        <label v-if="tr.startDate =='Not Started Yet'"> N/A</label>
                    </vs-td>
                    <vs-td :data="tr.endDate" style="text-align: center;">
                        <span>{{tr.endDate}}</span>
                    </vs-td>
                    <vs-td style="text-align: center" :data="tr.is_mealplan_ready">
                        <vs-button size="small" v-if="tr.is_mealplan_ready && tr.is_mealplan_ready >= 1" color="#9ecc38"
                                   gradient-color-secondary="#3EC9D6" type="gradient">Sent
                        </vs-button>
                        <vs-button size="small"
                                   v-if="!tr.is_mealplan_ready || !tr.is_mealplan_ready && !tr.is_mealplan_ready < 1"
                                   color="danger" type="gradient">Not Sent
                        </vs-button>
                    </vs-td>
                    <vs-td style="text-align: center" :data="tr.is_mealplan_ready">
                        <vs-button size="small" v-if="tr.is_mealplan_ready && tr.is_mealplan_ready >= 2" color="#9ecc38"
                                   gradient-color-secondary="#3EC9D6" type="gradient">Sent
                        </vs-button>
                        <vs-button size="small" v-if="!tr.is_mealplan_ready || tr.is_mealplan_ready < 2" color="danger"
                                   type="gradient">Not Sent
                        </vs-button>
                    </vs-td>
                    <vs-td style="text-align: center" :data="tr.is_mealplan_ready">
                        <vs-button size="small" v-if="tr.is_mealplan_ready && tr.is_mealplan_ready >= 3" color="#9ecc38"
                                   gradient-color-secondary="#3EC9D6" type="gradient">Sent
                        </vs-button>
                        <vs-button size="small" v-if="!tr.is_mealplan_ready || tr.is_mealplan_ready < 3" color="danger"
                                   type="gradient">Not Sent
                        </vs-button>
                    </vs-td>
                    <vs-td styl="text-align: center;">
<span style="display: inline-block;margin-right: 5px">
<vx-tooltip text="View Member Stats">
<div class="" @click="$router.push({name:'view-member-stats',params:{uid: tr.id}})">
<feather-icon icon="BarChartIcon" svgClasses="h-5 w-5" color="primary"/>
</div>
</vx-tooltip>
</span>
<span style="display: inline-block;">
<vx-tooltip text="Profile">
<div class="" @click="$router.push({name:'view-members-profile',params:{uid:tr.id}})">
<feather-icon icon="UserIcon" svgClasses="h-5 w-5"/>
</div>
</vx-tooltip>
</span>
</vs-td>
                </vs-tr>
                </tbody>
            </template>
        </vs-table>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    import router from '@/router'
    import moment from 'moment'
    import $ from 'jquery'

    export default {
        components: {},
        data() {
            return {
                search: '',
                usersAll: [],
                profileUrl: '',
                gender: '',
                users: [],
                memberUID: '',
                addNewFlag: false
            }
        },
        computed: {},
        methods: {
            getSearchList(){
                $(document).find('.vs-pagination--ul li:first-child').click();
                const search = this.search
                if (!search) this.users = this.usersAll;
                this.users = this.usersAll.filter(item => {
                    return item.name.indexOf(search) > -1
                        || item.email.toLowerCase().indexOf(search) > -1
                })
            },

            popupClose(){
                this.getUsers()
            },
            getUsers(){
                this.users = []

                firebase.firestore().collection('users').where('assigned_trainer', '==', localStorage.getItem('uid')).where('role', '==', 'member').get().then(snap => {
                        snap.forEach((doc) => {
                            let data = doc.data()
                            let member = {
                                "id": doc.id,
                                name: data.first_name + ' ' + data.last_name,
                                email: data.email,
                                "is_mealplan_ready": data.is_mealplan_ready,
                                "profileUrl": (data['profileUrl']) ? data['profileUrl'] : '',
                                "gender": doc.data().gender,
                            }
                            let memberObj = data['memberDetail'];
                            let current_package = memberObj && memberObj['program_type'] ? memberObj['program_type'] : false
                            let days_paused = data['days_paused'] ? data['days_paused'] : 0
                            if (current_package) {
                                if (data['program_type_start'] && data['program_type_start'] != '') {
                                    member['startDate'] = moment(data['program_type_start']).format('DD-MM-YYYY')
                                    var starting_date = data['program_type_start']
                                    if (current_package) {
                                        firebase.firestore().collection('package')
                                            .doc(current_package)
                                            .get()
                                            .then(snap => {
                                                    let data = snap.data();
                                                    member['programeName'] = data['title']
                                                    var numberOfDaysToAdd = parseInt(data['tenure']) + parseInt(days_paused);
                                                    member['endDate'] = moment(starting_date).add(numberOfDaysToAdd, 'days').format('DD-MM-YYYY')
                                                    this.users.push(member)
                                                    this.usersAll = this.users
                                                }
                                            )
                                    } else {
                                        member['programeName'] = '-- -- --'
                                        member['startDate'] = 'Not Started Yet'
                                        member['endDate'] = '-- -- --'
                                        this.users.push(member)
                                        this.usersAll = this.users
                                    }
                                } else {
                                    member['programeName'] = '-- -- --'
                                    member['startDate'] = 'Not Started Yet'
                                    member['endDate'] = '-- -- --'
                                    this.users.push(member)
                                    this.usersAll = this.users
                                }
                            } else {
                                member['programeName'] = '-- -- --'
                                member['startDate'] = 'Not Started Yet'
                                member['endDate'] = '-- -- --'
                                this.users.push(member)
                                this.usersAll = this.users

                            }
                        })
                    }
                )
            },
            deleteTrainer(uid) {
                this.loadContent()
                firebase.firestore().collection('users')
                    .doc(uid).delete()
                    .then(() => {
                        this.getUsers()

                        console.log('Successfully Deleted the record')
                    })
                    .catch(error => {
                        console.error('There was an error deleting the record: ' + error)
                    })
            },
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: ".button",
                    scale: 0.45
                })
                setTimeout(() => {
                    this.$vs.loading.close(".button > .con-vs-loading")
                }, 3000);
            },
        },
        created() {
            this.getUsers()
        }
    }
</script>

<style lang="scss">
    #view-members {
        .vs-con-table {

            .vs-table--header {
                display: flex;
                flex-wrap: wrap-reverse;
                margin-left: 1.5rem;
                margin-right: 1.5rem;
                > span {
                    display: flex;
                    flex-grow: 1;
                }

                .vs-table--search {
                    padding-top: 0;

                    .vs-table--search-input {
                        padding: 0.9rem 2.5rem;
                        font-size: 1rem;

                        & + i {
                            left: 1rem;
                        }

                        &:focus + i {
                            left: 1rem;
                        }
                    }
                }
            }

            .vs-table {
                border-collapse: separate;
                border-spacing: 0 1.3rem;
                padding: 0 1rem;

                tr {
                    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, .05);
                    td {
                        border: 1px solid #eee;
                        padding: 10px;
                        /*&:first-child{*/
                        /*border-top-left-radius: .5rem;*/
                        /*border-bottom-left-radius: .5rem;*/
                        /*}*/
                        /*&:last-child{*/
                        /*border-top-right-radius: .5rem;*/
                        /*border-bottom-right-radius: .5rem;*/
                        /*}*/
                    }
                    td.td-check {
                        padding: 10px !important;
                    }
                }
            }

            .vs-table--thead {
                th {
                    padding-top: 0;
                    padding-bottom: 0;

                    .vs-table-text {
                        text-transform: uppercase;
                        font-weight: 600;
                    }
                }
                th.td-check {
                    padding: 0 15px !important;
                }
                tr {
                    background: none;
                    box-shadow: none;
                }
            }

            .vs-table--pagination {
                justify-content: center;
            }
        }
    }

    td span {

        font-size: 12px !important;
    }

    .profile {
        width: 30px;
        height: 30px;
        padding: 5px 2px;
        text-align: center;
        border-radius: 50%;
        position: relative;
        display: inline-block;
        border: 1px solid rgb(115, 103, 240);
    }

    .profile:hover {
        color: #fff;
        background: rgb(115, 103, 240);
    }

    #view-members th.text-center > div {
        justify-content: space-around !important;
    }

    .search-member-input {
        padding: 15px 20px;
        padding-left: 30px;
        border-radius: 20px;
        border: 1px solid rgba(0, 0, 0, .04);
        font-size: .7rem;
        width: 200px;
        color: rgba(0, 0, 0, .7);
    }
</style>
