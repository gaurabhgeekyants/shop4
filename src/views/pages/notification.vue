<template>
  <vx-card title="">
<!--    <div class="demo-alignment">-->
<!--      <vs-list v-for="(ntf, index) in unreadNotifications" :key="index" class="listIcon" >-->
<!--        <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>-->

<!--        &lt;!&ndash;<vs-list-item icon-pack="feather" :title="ntf.title" :subtitle="ntf.msg"> {{elapsedTime(ntf.time)}}</vs-list-item>&ndash;&gt;-->
<!--        <span  @click="$router.push({name: ntf.src_url})" class="font-medium block notification-title" :class="[`text-${ntf.category}`]">{{ ntf.title }}</span>-->
<!--       <br> <small>{{ ntf.msg }}</small>-->
<!--      </vs-list>-->
<!--    </div>-->
    <div class="demo-alignment">

      <vs-list v-for="(ntf, index) in unreadNotifications" :key="index"  class="listIcon" >
        <feather-icon :icon="ntf.icon" :svgClasses="[`text-${ntf.category}`, 'stroke-current mr-1 h-6 w-6']"></feather-icon>

        <!--<vs-list-item icon-pack="feather" :title="ntf.title" :subtitle="ntf.msg"> {{elapsedTime(ntf.time)}}</vs-list-item>-->
        <h6  @click="$router.push(ntf.src_url)" class="font-medium block notification-title mb-2" :class="[`text-${ntf.category}`]" style="cursor: pointer;">{{ ntf.title }}</h6>
      <small>{{ ntf.msg }}</small>

      </vs-list>
    </div>
  </vx-card>
</template>
<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import VxAutoSuggest from '@/components/vx-auto-suggest/VxAutoSuggest.vue';
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import draggable from 'vuedraggable'
    import moment from 'moment'

    export default {

        data() {
            return {
                uid:localStorage.getItem('uid'),
                notificationCount:0,
                unreadNotifications: [],
            }
        },
        methods: {
            seenMasag(){

            },
            unRead(){
                firebase.firestore().collection('notification').where('receiver_id','==', this.uid).where('isSeen','==',false).orderBy('created_at', 'desc').get().then((snap) => {
                    this.notificationCount=snap.size
                })
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


            // Method for creating dummy notification time
            randomDate({hr, min, sec}) {
                let date = new Date()

                if(hr) date.setHours(date.getHours() - hr)
                if(min) date.setMinutes(date.getMinutes() - min)
                if(sec) date.setSeconds(date.getSeconds() - sec)

                return date
            }
        },


        created() {
            if(localStorage.getItem('userRole')=='admin') {
                firebase.firestore().collection('notification').get().then((snap) => {
                    snap.forEach((doc) => {
                        doc.ref.update({isAdminSeen: true})
                    })
                })
            }
            this.notificationCount=0
            let role=localStorage.getItem('userRole')
            if(role == 'admin'){
                let query =firebase.firestore().collection('notification');
                query.orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
                    this.notify=[]
                    var count=0
                    querySnapshot.forEach((doc) => {
                        if (doc.data()['type'] != 'mealPlan' && doc.data()['type'] != 'chat' )
                        {
                            let timestamp = doc.data()['created_at'];
                        const notify = {
                            url: doc.data()['url'],
                            id: doc.id,
                            index: count + 1,
                            src_url: doc.data()['url'],
                            title:
                                ( role == 'admin') && (doc.data()['type'] == 'assign_trainer_admin')
                                    ? doc.data()['sender_name'] + doc.data()['description'] + ' ' + doc.data()['receiver_name'] :
                                    doc.data()['sender_name'],
                                /*
                                (role == 'member' || role == 'trainer') && (doc.data()['type'] == 'chat') ? ' You have message from ' + doc.data()['sender_name'] :
                                (role == 'admin' && doc.data()['type'] == 'chat') ? doc.data()['sender_name'] + ' send message to ' + doc.data()['receiver_name'] : (role == 'member' ||
                                role == 'admin') && (doc.data()['type'] == 'assign_trainer_admin') ? doc.data()['sender_name'] + doc.data()['description'] + ' ' + doc.data()['receiver_name'] :
                                (role == 'trainer') && (doc.data()['type'] == 'assign_trainer_admin') ? doc.data()['sender_name'] + ' ' + doc.data()['description'] :*/
//                                    doc.data()['sender_name'],
                            msg: doc.data()['description'],
                            icon: (doc.data()['type'] == 'mealPlan') ? 'ListIcon' : (doc.data()['type'] == 'chat') ? 'MessageSquareIcon' : 'UserIcon',
                            time: moment(new Date(timestamp.seconds * 1000)).format('ddd MMM DD  YYYY H:mm:ss'),//doc.data()['created_at'],
                            category: 'primary'
                        }
                            this.unreadNotifications.push(notify)
                    }
                    })
                    this.unRead()
                    // this.unreadNotifications=this.unreadNotifications.slice().reverse()
                })
            }
            else {
                let query =firebase.firestore().collection('notification');
                query = query.where('receiver_id','==', this.uid);
//            }
         /*   else if(role== 'admin'){
                query = query.where('type','!=', 'mealPlan').where('type','!=', 'chat');

            }*/
//            query.orderBy('created_at','desc').onSnapshot((querySnapshot) => {
            query.orderBy('created_at', 'desc').onSnapshot((querySnapshot) => {
                this.notify=[]
                var count=0
                querySnapshot.forEach((doc) => {
                    let timestamp = doc.data()['created_at'];
                    const notify= {
                        url:doc.data()['url'],
                        id:doc.id,
                        index: count+1,
                        src_url:doc.data()['url'],
                        title: (role=='member'||role=='trainer') && (doc.data()['type']=='chat')?' You have message from '+ doc.data()['sender_name']:(role=='admin' && doc.data()['type']=='chat')? doc.data()['sender_name']+' send message to '+ doc.data()['receiver_name']:(role=='member' || role=='admin')&&(doc.data()['type']=='assign_trainer')?doc.data()['sender_name']+doc.data()['description']+' '+doc.data()['receiver_name']:(role=='trainer')&&(doc.data()['type']=='assign_trainer')?doc.data()['sender_name']+' '+doc.data()['description']:doc.data()['sender_name'] ,
                        msg: doc.data()['description'],
                        icon: (doc.data()['type']=='mealPlan')?'ListIcon':(doc.data()['type']=='chat')?'MessageSquareIcon':'UserIcon',
                        time: moment(new Date(timestamp.seconds * 1000)).format('ddd MMM DD  YYYY H:mm:ss'),//doc.data()['created_at'],
                        category: 'primary'
                    }
                    this.unreadNotifications.push(notify)
                })
                this.unRead()
                // this.unreadNotifications=this.unreadNotifications.slice().reverse()
            })
        }
        }
    }
</script>

<style>
 .listIcon > span {
   float: left;
   /*margin-top: 8px;*/
 }
</style>
