<template>
  <div id="data-list-list-view" class="data-list-container">

    <add-new-data-sidebar :isSidebarActive="addNewDataSidebar" @closeSidebar="addNewDataSidebar = false" />

    <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="users">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span>Delete</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Archive</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Print</span>
              </vs-dropdown-item>
              <vs-dropdown-item>
                <span>Another Action</span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewDataSidebar = true">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>

        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ users.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : users.length }} of {{ users.length }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <template slot="thead">
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="category">Category</vs-th>
        <vs-th sort-key="popularity">Popularity</vs-th>
        <vs-th sort-key="order_status">Order Status</vs-th>
        <vs-th sort-key="price">Price</vs-th>
      </template>

      <template slot-scope="{data}">
        <tbody>
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

          <vs-td>
            <p class="product-name font-medium">{{ tr.name }}</p>
          </vs-td>

          <vs-td>
            <p class="product-category">{{ tr.category }}</p>
          </vs-td>

          <vs-td>
            {{ typeof tr.popularity }}
            <vs-progress :percent="Number(tr.popularity)" :color="getPopularityColor(Number(tr.popularity))" class="shadow-md" />
          </vs-td>

          <vs-td>
            <vs-chip :color="getOrderStatusColor(tr.order_status)" class="product-order-status">{{ tr.order_status }}</vs-chip>
          </vs-td>

          <vs-td>
            <p class="product-price">${{ tr.price }}</p>
          </vs-td>

        </vs-tr>
        </tbody>
      </template>
    </vs-table>
  </div>
</template>
<style lang="scss">
  #data-list-list-view {
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

        .vs-table--search{
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            &+i {
              left: 1rem;
            }

            &:focus+i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;

        tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
          }
          td.td-check{
            padding: 20px !important;
          }
        }
      }

      .vs-table--thead{
        th {
          padding-top: 0;
          padding-bottom: 0;

          .vs-table-text{
            text-transform: uppercase;
            font-weight: 600;
          }
        }
        th.td-check{
          padding: 0 15px !important;
        }
        tr{
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }
  }
</style>

<!--<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    //import router from '@/router'
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment'




    export default {

        data() {
            return {
                name: '',
                email: '',
                mobile: '',
                password:''
                /*dateofbirth: '',
                gender: '',
                height: '',
                weight: '',
                program_opted: '',
                program_type: '',
                tenure: '',
                health_issue: '',
                health_issue_desc: '',
                food_kind1: '',
                food_kind2: '',
                food_kind3: '',
                food_kind4: '',
                food_kind5: '',
                food_alergy: '',
                food_alergy_desc: '',
                medication: '',
                pictures: {},
                pictures_terms_check: '',
                special_request: '',
                message: '',
                progressUpload: 0,
                fileName: '',
                uploadTask: '',
                uploading: false,
                uploadEnd: false,
                downloadURL: ''*/
            }
        },
        computed: {
            mediaType() {
                return (media) => {
                    if (media.img) {
                        const ext = media.img.split('.').pop();
                        if (this.mediaExtensions.img.includes(ext)) return 'image'
                    } else if (media.sources && media.poster) {
                        // other validations
                        return 'video'
                    }
                }
            },
            playerOptions() {
                return (media) => {
                    return {
                        height: '360',
                        fluid: true,
                        autoplay: false,
                        muted: true,
                        language: 'en',
                        playbackRates: [0.7, 1.0, 1.5, 2.0],
                        sources: media.sources,
                        poster: media.poster,
                    }
                }
            }
        },
        created(){
            // this.getUserDetail();
        },
        methods: {
            notifyAlreadyLogedIn() {
                this.$vs.notify({
                    title: 'Login Attempt',
                    text: 'Trainer created Successfully!',
                    iconPack: 'feather',
                    icon: 'icon-alert-circle',
                    color: 'success'
                });
            },
            profileSubmit() {
              console.log('data');
              console.log(this.email);
              console.log(this.password);
                const memberPayLoad = {
                    name: this.name ? this.name : '',
                    email:  this.email ? this.email : '',
                    mobile: this.mobile ? this.mobile : '',
                    password: this.password?this.password:''
                }
                //firebase data
                firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
console.log('user test');
console.log(user.user.uid);
                        firebase.firestore().collection("users").doc(user.user.uid).set(memberPayLoad, {merge:true})
                        this.notifyAlreadyLogedIn();
                        return false;
                    })
                            // firebase data
                firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid).get()
                    .then(snap => {
                        return snap.ref.update(memberPayLoad);
                    })
                    .then(() => {
                        console.log('Successfully updated the record')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },

            getUserDetail() {
                firebase.firestore().collection('users')
                    .doc(firebase.auth().currentUser.uid)
                    .get()
                    .then(snap => {
                        let data = snap.data();
                        let memberObj = data['memberDetail'];
                        this.name = data['name'];
                        this.email = data['email'];
                        this.mobile= data['mobile'];
                        // Member Detail Data
                        this.dateofbirth = this.customFormatter(memberObj['dateofbirth']);
                        this.gender= memberObj['gender'];
                        this.height= memberObj['height'];
                        this.weight= memberObj['weight'];
                        this.program_opted= memberObj['program_opted'];
                        this.program_type= memberObj['program_type'];
                        this.tenure = memberObj['tenure'];
                        this.health_issue= memberObj['health_issue'];
                        this.health_issue_desc= memberObj['health_issue_desc'];
                        this.food_kind1= memberObj['food_kind1'];
                        this.food_kind2= memberObj['food_kind2'];
                        this.food_kind3= memberObj['food_kind3'];
                        this.food_kind4= memberObj['food_kind4'];
                        this.food_kind5= memberObj['food_kind5'];
                        this.food_alergy= memberObj['food_alergy'];
                        this.food_alergy_desc = memberObj['food_alergy_desc'];
                        this.medication= memberObj['medication'];
                        this.pictures= memberObj['pictures'];
                        this.pictures_terms_check= memberObj['pictures_terms_check'];
                        this.special_request= memberObj['special_request'];
                        this.message= memberObj['message'];
                    })
                    .then(() => {
                        console.log('Successfully get user detail.')
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    })
            },
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: "#button-load-more-posts",
                    scale: 0.45
                })
                setTimeout(() => {
                    this.$vs.loading.close("#button-load-more-posts > .con-vs-loading")
                }, 3000);
            },
            customFormatter(date) {
                return moment(date).format('MMMM Do YYYY');
            }
        },
        mounted() {
            this.wasSidebarOpen = this.$store.state.reduceButton;
            this.$store.commit('TOGGLE_REDUCE_BUTTON', true)
        },
        beforeDestroy() {
            if (!this.wasSidebarOpen) this.$store.commit('TOGGLE_REDUCE_BUTTON', false)
        },
        components: {
            Datepicker
        }
    }
</script>

<style>
  #form{
    width: 650px;
    margin: 0 auto;
  }
  #form input[type="file"]{
    margin: 20px 0 0;
  }
  span{
    font-size: 18px;
    text-transform: capitalize;
  }
  .vs-radio&#45;&#45;label{
    font-size: 14px;
  }
  .con-slot-label{
    font-size:12px;
  }
  form ul li{
    width: 48%;
    margin-right: 0 !important;
  }
  .con-vs-checkbox{
    width: 47%;
    margin-top:1.5rem;
  }
  .con-vs-checkbox.add{
    width: 100%;
  }
</style>-->
<script>
    import AddNewDataSidebar from '../pages/trainer/list-view/assignMemberToTrainer.vue';

    export default {
        components: {
            AddNewDataSidebar
        },
        data() {
            return {
                selected: [],
                users: [],
                itemsPerPage: 4,
                isMounted: false,
                addNewDataSidebar: false,
            }
        },
        computed: {
            currentPage() {
                if(this.isMounted) {
                    return this.$refs.table.currentx
                }
                return 0
            },
        },
        methods: {
            getOrderStatusColor(status) {
                if(status == 'on hold') return "warning"
                if(status == 'delivered') return "success"
                if(status == 'canceled') return "danger"
                return "primary"
            },
            getPopularityColor(num) {
                if(num > 90) return "success"
                if(num >70) return "primary"
                if(num >= 50) return "warning"
                if(num < 50) return "danger"
                return "primary"
            },
            formatData(data) {
                // formats data received from API
                let formattedData = data.map((item) => {
                    const fields = item.fields
                    let obj = {}
                    for (const key of Object.keys(fields)) {
                        obj[key] = Number(fields[key].integerValue) || Number(fields[key].doubleValue) || fields[key].stringValue;
                    }
                    return obj
                });
                return formattedData
            }
        },
        created() {
            const thisIns = this;
            this.$http.get('https://firestore.googleapis.com/v1/projects/vuesax-admin/databases/(default)/documents/products/?pageSize=100')
                .then(function (response) {
                    thisIns.users = thisIns.formatData(response.data.documents)
                })
                .catch(function (error) {
                    thisIns.$vs.notify({
                        title:'Error',
                        text: error,
                        color:'danger',
                        iconPack: 'feather',
                        icon:'icon-alert-circle'})
                });
        },
        mounted() {
            this.isMounted = true;
        }
    }
</script>
