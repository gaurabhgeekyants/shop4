<template>
  <div class="relative">
    <div class="vx-navbar-wrapper">
      <vs-navbar class="vx-navbar navbar-custom" :color="navbarColor" :class="classObj">

        <!-- SM - OPEN SIDEBAR BUTTON -->
        <feather-icon class="sm:inline-flex xl:hidden cursor-pointer mr-1" icon="MenuIcon" @click.stop="showSidebar"></feather-icon>


        <vs-spacer></vs-spacer>

        <!-- NOTIFICATIONS -->
        <div @click="notificationSeen()" v-click-outside="hide">
          <feather-icon icon="BellIcon" class="cursor-pointer mt-1 sm:mr-6 mr-2" :badge="notificationCount"></feather-icon>
          <div v-if="notifyOpen=== true"  style="width: 350px;padding: 0 !important;
    border: 0;overflow: hidden;border-radius: .5rem;-webkit-box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08) !important;position: absolute;right: 0; background:#fff;" class="cursor-pointer" >
          <div class="notification-top text-center p-5 bg-primary text-white">
            <h3 class="text-white">{{ notificationCount }} New</h3>
            <p class="opacity-75">App Notifications</p>
          </div>
          <VuePerfectScrollbar ref="mainSidebarPs" class="scroll-area--nofications-dropdown p-0" :settings="settings">
            <ul class="bordered-items">
              <!--<li v-for="(ntf, index) in unreadNotifications" :key="index" @click="seenMasag(ntf.id)" class="flex justify-between px-4 py-4 notification cursor-pointer">-->
              <li v-for="(ntf, index) in unreadNotifications" :key="index" class="flex justify-between px-4 py-4 notification cursor-pointer">
                <div class="flex items-start">
                  <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>
                  <div class="mx-2">
                    <span class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>
                    <small>{{ ntf.msg }}</small>
                  </div>
                </div>
                <small class="mt-1 whitespace-no-wrap">{{ elapsedTime(ntf.time) }}</small>
              </li>
            </ul>

          </VuePerfectScrollbar>
            <div class="font-semibold text-center pt-3 pb-3 text-primary">

              <span @click="$router.push({ name:'notification' })">View All Notifications</span>
            </div>
          </div>

        </div>

        <!-- USER META -->
        <div class="the-navbar__user-meta flex items-center">
          <div class="text-right leading-tight hidden sm:block">
            <p class="font-semibold">{{ user_displayName }}</p>
            <small style="text-transform: capitalize">{{ user_role}}</small>
          </div>
          <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
            <div class="con-img ml-3">
              <img
                v-if="activeUserImg!=''"
                key="onlineImg"
                :src="activeUserImg"
                alt="user-img"
                width="40"
                height="40"
                class="rounded-full shadow-md cursor-pointer block" />
              <img v-if="gender=='male' && activeUserImg==''"
                key="localImg"
                src="../../assets/images/portrait/small/default-profile.png"
                alt="user-img"
                width="40"
                height="35"
                class="rounded-full shadow-md cursor-pointer block" />

              <img
                      v-if="gender=='female' && activeUserImg==''"
                      key="localImg"
                      src="../../assets/images/portrait/small/female_avatar_vector.png"
                      alt="user-img"
                      width="40"
                      height="35"
                      class="rounded-full shadow-md cursor-pointer block" />
              <img
                      v-if="gender=='other' && activeUserImg==''"
                      key="localImg"
                      src="../../assets/images/portrait/small/default-profile.png"
                      alt="user-img"
                      width="40"
                      height="35"
                      class="rounded-full shadow-md cursor-pointer block" />
            </div>
            <vs-dropdown-menu class="vx-navbar-dropdown">
              <ul style="min-width: 9rem">
                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="profileOpen()">

                  <feather-icon icon="UserIcon" svgClasses="w-4 h-4" />
                  <span class="ml-2">Profile</span>
                </li>

                <vs-divider class="m-1"></vs-divider>

                <li
                  class="flex py-2 px-4 cursor-pointer hover:bg-primary hover:text-white"
                  @click="logout">
                  <feather-icon icon="LogOutIcon" svgClasses="w-4 h-4"/>
                  <span class="ml-2" v-if="$auth.isAuthenticated">Logout</span>
                </li>
              </ul>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-navbar>
    </div>
  </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import draggable from 'vuedraggable'
    import moment from 'moment'
    import ClickOutside from 'vue-click-outside'

    export default {
        name: "the-navbar",
        props: {
            navbarColor: {
                type: String,
                default: "#fff",
            },
        },
        data() {
            return {
                notifyOpen:false,
                user_displayName:'',
                gender:'',
                activeUserImg:'',
                uid:localStorage.getItem('uid'),
                notificationCount:0,
                navbarSearchAndPinList: this.$store.state.navbarSearchAndPinList,
                searchQuery: '',
                showFullSearch: false,
                unreadNotifications: [],
                settings: { // perfectscrollbar settings
                    maxScrollbarLength: 60,
                    wheelSpeed: .60,
                },
                autoFocusSearch: false,
                showBookmarkPagesDropdown: false,
            }
        },
        watch: {
            '$route'() {
                if (this.showBookmarkPagesDropdown) this.showBookmarkPagesDropdown = false
            }
        },

        computed: {
            // HELPER
            sidebarWidth() {
                return this.$store.state.sidebarWidth;
            },
            breakpoint() {
                return this.$store.state.breakpoint;
            },

            // NAVBAR STYLE
            classObj() {
                if (this.sidebarWidth == "default") return "navbar-default"
                else if (this.sidebarWidth == "reduced") return "navbar-reduced"
                else if (this.sidebarWidth) return "navbar-full"
            },


            // BOOKMARK & SEARCH
            data() {
                return this.$store.state.navbarSearchAndPinList;
            },
            starredPages() {
                return this.$store.state.starredPages;
            },
            starredPagesLimited: {
                get() {
                    return this.starredPages.slice(0, 10);
                },
                set(list) {
                    this.$store.dispatch('arrangeStarredPagesLimited', list);
                }
            },
            starredPagesMore: {
                get() {
                    return this.starredPages.slice(10);
                },
                set(list) {
                    this.$store.dispatch('arrangeStarredPagesMore', list);
                }
            },

            // CART DROPDOWN
            cartItems() {
                return this.$store.state.eCommerce.cartItems.slice().reverse();
            },

            // PROFILE
          /*  user_displayName() {
                // return JSON.parse(localStorage.getItem('userInfo')).displayName
                return localStorage.getItem('DisplayName')
            },*/
            // PROFILE
            user_role() {
                return localStorage.getItem('userRole')
            },
            /*activeUserImg() {
                return localStorage.getItem('photoURL') || this.$store.state.AppActiveUser.img;
            }*/
        },
        methods: {
            hide () {
                this.notifyOpen = false;
            },
            notificationSeen(){
                this.notifyOpen=true
                // this.notificationCount=0
                let role=localStorage.getItem('userRole')
                let query =firebase.firestore().collection('notification');
                if(localStorage.getItem('userRole')=='admin') {
                    firebase.firestore().collection('notification').get().then((snap) => {
                        snap.forEach((doc) => {
                            doc.ref.update({isAdminSeen: true})
                        })
                    })
                }
                else {


                    if (role != 'admin') {
                        query = query.where('receiver_id', '==', this.uid);
                    }
                    query.get().then((querySnapshot) => {
                        this.notify = []
                        var count = 0
                        querySnapshot.forEach((doc) => {
                            doc.ref.update({isSeen: true})
                        })
            })
                    }
                this.unRead()

            },
            profileOpen(){
                if(localStorage.getItem('userRole') == 'member' ){
                    this.$router.push({name:'memberProfile'})
                }else{
                    this.$router.push({name:'profile'})
                }
            },
            seenMasag(id){

                    firebase.firestore().collection('notification').doc(id).get().then((snap) => {

                        if (snap.data().isSeen == false) {
                            snap.ref.update({isSeen: true})
                            this.unRead()
//                        this.$router.push({name:'notification'})
                        }
                    })
            },
            unRead(){
                // localStorage.getItem('userRole') == 'member'
                if( localStorage.getItem('userRole')!= 'admin') {
                    firebase.firestore().collection('notification').where('receiver_id', '==', this.uid).where('isSeen', '==', false).orderBy('created_at','desc')
                        .onSnapshot
//                        .get().then
                    ((snap) => {
                        this.notificationCount = snap.size
                    })
                }else{
                    firebase.firestore().collection('notification').where('isAdminSeen', '==', false).orderBy('created_at','desc')
                        .onSnapshot
//                        .get().then
                        ((snap) => {
                        this.notificationCount = snap.size
                    })
                }
            },
            updateLocale(locale) {
                this.$i18n.locale = locale;
            },
            showSidebar() {
                this.$store.commit('TOGGLE_IS_SIDEBAR_ACTIVE', true);
            },
            selected(item) {
                this.$router.push(item.url)
                this.showFullSearch = false;
            },
            actionClicked(item) {
                // e.stopPropogation();
                this.$store.dispatch('updateStarredPage', { index: item.index, val: !item.highlightAction });
            },
            showNavbarSearch() {
                this.showFullSearch = true;
            },
            showSearchbar() {
                this.showFullSearch = true;
            },
            elapsedTime(startTime) {
                let x = new Date(startTime);
                let now = new Date();
                var timeDiff = now - x;
                timeDiff /= 1000;

                var seconds = Math.round(timeDiff);
                timeDiff = Math.floor(timeDiff / 60);

                var minutes = Math.round(timeDiff % 60);
                timeDiff = Math.floor(timeDiff / 60);

                var hours = Math.round(timeDiff % 24);
                timeDiff = Math.floor(timeDiff / 24);

                var days = Math.round(timeDiff % 365);
                timeDiff = Math.floor(timeDiff / 365);

                var years = timeDiff;

                if (years > 0) {
                    return years + (years > 1 ? ' Years ' : ' Year ') + 'ago';
                } else if (days > 0) {
                    return days + (days > 1 ? ' Days ' : ' Day ') + 'ago';
                } else if (hours > 0) {
                    return hours + (hours > 1 ? ' Hrs ' : ' Hour ') + 'ago';
                } else if (minutes > 0) {
                    return minutes + (minutes > 1 ? ' Mins ' : ' Min ') + 'ago';
                } else if (seconds > 0) {
                    return seconds + (seconds > 1 ? ' sec ago' : 'just now');
                }

                return 'Just Now'
            },
            logout() {
                if(localStorage.getItem('uid')){
                    firebase.firestore().collection('users').doc(localStorage.getItem('uid')).update({'activeUser':false})

                    localStorage.removeItem('uid');
                    this.$router.push('/login')
                    localStorage.removeItem('userInfo');
                }
                // Change role on logout. Same value as initialRole of acj.js
                this.$acl.change('admin')
                console.log('logout');
                localStorage.removeItem('userRole');
            },
            outside: function() {
                this.showBookmarkPagesDropdown = false
            },

            // CART DROPDOWN
            removeItemFromCart(item) {
                this.$store.dispatch('eCommerce/toggleItemInCart', item)
            },

            // Method for creating dummy notification time
            randomDate({hr, min, sec}) {
                let date = new Date()

                if(hr) date.setHours(date.getHours() - hr)
                if(min) date.setMinutes(date.getMinutes() - min)
                if(sec) date.setSeconds(date.getSeconds() - sec)

                return date
            }
        },
        directives: {
            ClickOutside
              /*  'click-outside': {
                bind: function(el, binding) {
                    const bubble = binding.modifiers.bubble
                    const handler = (e) => {
                        if (bubble || (!el.contains(e.target) && el !== e.target)) {
                            binding.value(e)
                        }
                    }
                    el.__vueClickOutside__ = handler
                    document.addEventListener('click', handler)
                },

                unbind: function(el) {
                    document.removeEventListener('click', el.__vueClickOutside__)
                    el.__vueClickOutside__ = null

                }
            }*/
        },
        components: {
            VxAutoSuggest,
            VuePerfectScrollbar,
            draggable
        },
        created() {
//            this.notificationSeen()
            firebase.firestore().collection('users').doc(localStorage.getItem('uid'))
//                .get().then
                .onSnapshot
                (snap => {
                   if(localStorage.getItem('userRole')=='member'){
                       this.user_displayName=snap.data().first_name+' '+snap.data().last_name
                       this.gender=snap.data().gender
                   }else{
                       this.user_displayName=snap.data().name
                       this.gender=snap.data().gender
                   }
                    // return JSON.parse(localStorage.getItem('userInfo')).photoURL || this.$store.state.AppActiveUser.img;
                    this.activeUserImg=(snap.data().profileUrl)?snap.data().profileUrl:''
                })
            // this.notificationCount=0
            let role=localStorage.getItem('userRole')
            let query =firebase.firestore().collection('notification');
            if(role== 'admin'){
                let query =firebase.firestore().collection('notification');
//                query = query.where('receiver_id','==', this.uid);
                query.orderBy('created_at', 'desc')
                    .onSnapshot
                ((querySnapshot) => {
                    this.notify=[]
                    var count=0
                    querySnapshot.forEach((doc) => {
                        if (doc.data()['type'] != 'mealPlan' && doc.data()['type'] != 'chat' ) {
                            let timestamp = doc.data()['created_at'];
                            const notify = {
                                id: doc.id,
                                index: count + 1,
                                title: (role == 'member' || role == 'trainer') && (doc.data()['type'] == 'chat') ? ' You have message from ' + doc.data()['sender_name'] : (role == 'admin' && doc.data()['type'] == 'chat') ? doc.data()['sender_name'] + ' send message to ' + doc.data()['receiver_name'] : (role == 'member' || role == 'admin') && (doc.data()['type'] == 'assign_trainer') ? doc.data()['sender_name'] + doc.data()['description'] + ' ' + doc.data()['receiver_name'] : (role == 'trainer') && (doc.data()['type'] == 'assign_trainer') ? doc.data()['sender_name'] + ' ' + doc.data()['description'] : doc.data()['sender_name'],
                                seen: doc.data()['isSeen'],
                                "msg": doc.data()['description'],
                                icon: (doc.data()['type'] == 'mealPlan') ? 'ListIcon' : (doc.data()['type'] == 'chat') ? 'MessageSquareIcon' : 'UserIcon',
                                "time": moment(new Date(timestamp.seconds * 1000)).format('ddd MMM DD  YYYY H:mm:ss'),
                                src_url: doc.data()['url'],
                                category: 'primary'
                            }
                            // doc.ref.update({isSeen: true})
                            this.unreadNotifications.push(notify)
                        }
                    })
                    this.unRead()
                    // this.unreadNotifications=this.unreadNotifications.slice().reverse()
                })
            }
            else{
                let query =firebase.firestore().collection('notification');
                query = query.where('receiver_id','==', this.uid);
                query.orderBy('created_at', 'desc')
                    .onSnapshot
                ((querySnapshot) => {
                    this.notify=[]
                    var count=0
                    querySnapshot.forEach((doc) => {
                        let timestamp = doc.data()['created_at'];
                        const notify= {
                            id:doc.id,
                            index: count+1,
                            title: (role=='member'||role=='trainer') && (doc.data()['type']=='chat')?' You have message from '+ doc.data()['sender_name']:(role=='admin' && doc.data()['type']=='chat')? doc.data()['sender_name']+' send message to '+ doc.data()['receiver_name']:(role=='member' || role=='admin')&&(doc.data()['type']=='assign_trainer')?doc.data()['sender_name']+doc.data()['description']+' '+doc.data()['receiver_name']:(role=='trainer')&&(doc.data()['type']=='assign_trainer')?doc.data()['sender_name']+' '+doc.data()['description']:doc.data()['sender_name'] ,
                            seen:doc.data()['isSeen'],
                            "msg": doc.data()['description'],
                            icon: (doc.data()['type']=='mealPlan')?'ListIcon':(doc.data()['type']=='chat')?'MessageSquareIcon':'UserIcon',
                            "time":  moment(new Date(timestamp.seconds * 1000)).format('ddd MMM DD  YYYY H:mm:ss'),
                            src_url:doc.data()['url'],
                            category: 'primary'
                        }
                        // doc.ref.update({isSeen: true})
                        this.unreadNotifications.push(notify)
                    })
                    this.unRead()
                    // this.unreadNotifications=this.unreadNotifications.slice().reverse()

                })

            }
//                .get().then
        }
    }
</script>
<style>
/* .notification-dropdown{
/*width:360px;*/
/* } */ 
</style>