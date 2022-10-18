<!-- =========================================================================================
    File Name: Chat.vue
========================================================================================== -->


<template>
    <div id="chat-app" class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
        <vs-sidebar class="items-no-padding" parent="#chat-app" :click-not-close="clickNotClose"
                    :hidden-background="clickNotClose" v-model="isChatSidebarActive" id="chat-list-sidebar">

            <!-- USER PROFILE SIDEBAR -->
            <user-profile :active="activeProfileSidebar" :userData="userData" :userId="userProfileId"
                          class="user-profile-container" @closeProfileSidebar="closeProfileSidebar"></user-profile>

            <div class="chat__profile-search flex p-4">
                <vs-input icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full no-icon-border"
                          placeholder="Search or start a new chat" v-model="searchQuery"/>
            </div>

            <vs-divider class="d-theme-border-grey-light m-0"/>
            <VuePerfectScrollbar class="chat-scroll-area pt-4" :settings="settings">

                <!-- ACTIVE CHATS LIST -->
                <div class="chat__chats-list mb-8">
                    <h3 class="text-primary mb-5 px-4">Chats</h3>
                    <ul class="chat__active-chats bordered-items">
                        <li class="cursor-pointer" v-for="(contact, index) in sales" :key="index"
                            @click="updateActiveChatUser(contact.id)">
                            <chat-contact :contact="contact" :lastMessaged="chatLastMessaged(contact.id).time"
                                          :unseenMsg="chatUnseenMessages(contact.id)"
                                          :isActiveChatUser="isActiveChatUser(contact.id)"></chat-contact>

                        </li>
                    </ul>
                </div>

            </VuePerfectScrollbar>
        </vs-sidebar>

        <!-- RIGHT COLUMN -->
        <div class="chat__bg app-fixed-height chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0"
             :class="{'sidebar-spacer--wide': clickNotClose, 'flex items-center justify-center': activeChatUser === null}">
            <template v-if="activeChatUser">
                <div class="chat__navbar">
                    <chat-navbar :isSidebarCollapsed="!clickNotClose" :userData="userData" :user-id="activeChatUser"
                                 :isPinnedProp="isChatPinned" @openContactsSidebar="toggleChatSidebar(true)"
                                 @showProfileSidebar="updateUserProfileId"
                                 @toggleIsChatPinned="toggleIsChatPinned"></chat-navbar>
                </div>
                <VuePerfectScrollbar class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
                                     :settings="settings" ref="chatLogPS">
                    <div class="chat__log" ref="chatLog">
                        <chat-log :chatDocID="chatDocID" :messagesLog="messagesLog" :userData="userData"
                                  :currentUserData="currentUserData" :userId="activeChatUser"
                                  v-if="activeChatUser"></chat-log>
                    </div>
                </VuePerfectScrollbar>
                <div class="chat__input flex p-4 bg-white">
                    <vs-input class="flex-1" placeholder="Type Your Message" v-model="typedMessage"
                              @keyup.enter="sendMsg"/>
                    <vs-button class="bg-primary-gradient ml-4" type="filled" @click="sendMsg">Send</vs-button>
                </div>
            </template>
            <template v-else>
                <div class="flex flex-col items-center">
                    <feather-icon icon="MessageSquareIcon" class="mb-4 bg-white p-8 shadow-md rounded-full"
                                  svgClasses="w-16 h-16"></feather-icon>
                    <h4 class=" py-2 px-4 bg-white shadow-md rounded-full cursor-pointer"
                        @click.stop="toggleChatSidebar(true)">Start Conversation</h4>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    import contacts from './contacts'
    import ChatContact from "./ChatContact.vue"
    import UserProfile from "./UserProfile.vue"
    import ChatNavbar from './ChatNavbar.vue'
    import ChatLog from './ChatLog.vue'
    import firebase from 'firebase/app'
    import moment from 'moment'
    require('firebase/firestore')
    import 'firebase/auth'

    export default{
        name: 'vx-sidebar',
        data() {
            return {
                uid: localStorage.getItem('uid'),
                currentUserImageLink: '',
                messagesLog: [],
                userData: [],
                currentUserData: [],
                trainerUID: null,
                sales: [],
                active: true,
                isHidden: false,
                contacts: contacts,
                searchContact: "",
                activeProfileSidebar: false,
                activeChatUser: null,
                userProfileId: -1,
                typedMessage: "",
                isChatPinned: false,
                settings: {
                    maxScrollbarLength: 60,
                    wheelSpeed: 0.70,
                },
                clickNotClose: true,
                isChatSidebarActive: true,
                windowWidth: window.innerWidth,
                userName: '',
                chatDocID: '',
            }
        },
        computed: {
            chatLastMessaged() {
                return (userId) => this.$store.getters['chat/chatLastMessaged'](userId);
            },
            chatUnseenMessages() {
                return (userId) => {
                    const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](userId);
                    if (unseenMsg) return unseenMsg
                };
            },
            sorted() {
                return this.chats.slice().sort((x, y) => {
                    const xId = x.id;
                    const yId = y.id;
                    const chatDataX = this.$store.getters['chat/chatDataOfUser'](xId);
                    const chatDataY = this.$store.getters['chat/chatDataOfUser'](yId);
                    return (chatDataY.isPinned - chatDataX.isPinned)
                })
            },
            activeUserId() {
                return this.$store.state.AppActiveUser.id;
            },
            activeUserImg() {
                return this.$store.state.AppActiveUser.img;
            },
            activeUserStatus() {
                return this.$store.state.AppActiveUser.status;
            },
            getStatusColor() {
                return (isActiveUser) => {
                    const userStatus = this.getUserStatus(isActiveUser)

                    if (userStatus == "online") {
                        return "success"
                    } else if (userStatus == "do not disturb") {
                        return "danger"
                    } else if (userStatus == "away") {
                        return "warning"
                    } else {
                        return "grey"
                    }
                }
            },
            chats() {
                return this.$store.getters['chat/chats'];
            },
            chatContacts() {
                return this.$store.getters['chat/chatcontacts'];
            },
            searchQuery: {
                get() {
                    return this.$store.state.chat.chatSearchQuery;
                },
                set(val) {
                    this.$store.dispatch('chat/setChatSearchQuery', val);
                }
            },
            isActiveChatUser() {
                return (userId) => userId == this.activeChatUser
            }
        },
        methods: {
            chatDetail(userId){
                this.messagesLog = []
                this.userData = []
                this.currentUserData = []
                let role = localStorage.getItem('userRole')
                let query = firebase.firestore().collection('chat');
                if (role == 'member') {
                    query = query.where('trainerUID', '==', userId)
                    query = query.where('memberUID', '==', this.uid)
                } else {
                    query = query.where('memberUID', '==', userId)
                }
                query.onSnapshot((querySnap) => {
                    querySnap.forEach((doc) => {
                        this.chatDocID = doc.id
                        this.messagesLog = doc.data()
                    })
                });
                let userQuery = firebase.firestore().collection('users');
                userQuery.doc(userId).get().then((querySnap) => {
                    this.userData = querySnap.data()
                })
                let currentUserQuery = firebase.firestore().collection('users');
                currentUserQuery.doc(this.uid).get().then((querySnap) => {
                    this.currentUserData = querySnap.data()
                })

            },
            getCurrentUserChat(userId){
                let role = localStorage.getItem('userRole')
                let query = firebase.firestore().collection('chat');
                let timeString = moment().format('YYYY-MM-DD h:mm:ss a')
                if (role == 'member') {
                    query = query.where('trainerUID', '==', userId)
                    query = query.where('memberUID', '==', this.uid)
                } else {
                    query = query.where('memberUID', '==', userId)
                }
                query/*.where('messages','==', timeString)*/.get().then((querySnap) => {
                    querySnap.forEach((doc) => {
                        let docData = doc.data()
//                        if(this.messagesLog.messages && docData.messages && docData.messages.length > this.messagesLog.messages.length){
                        this.chatDocID = doc.id
                        this.messagesLog = docData
//                        }
                    })
                });
            },
            getUserStatus(isActiveUser) {
                return (isActiveUser) ? this.$store.state.AppActiveUser.status : this.contacts[this.activeChatUser].status;
            },
            closeProfileSidebar(value) {
                this.activeProfileSidebar = value
            },
            updateUserProfileId(userId) {
                this.userProfileId = userId;
                this.activeProfileSidebar = !this.activeProfileSidebar;
            },
            updateActiveChatUser(contactId) {
                this.chatDetail(contactId)
                this.activeChatUser = contactId;
                this.toggleChatSidebar();
                this.typedMessage = '';
            },
            showProfileSidebar(userId) {
                this.userProfileId = userId;
                this.activeProfileSidebar = !this.activeProfileSidebar;
            },
            sendMsg() {
                let role = localStorage.getItem('userRole')
                var user_id = ''
                if (role == 'member') {
                    user_id = this.uid
                } else {
                    user_id = this.activeChatUser
                }
                if (!this.typedMessage) return
                var mess_data = {
                    'message': this.typedMessage,
                    'sent_by': this.uid,
                    'time': moment().format('YYYY-MM-DD h:mm:ss a'),
                }
                var masg = []
                masg.push(mess_data)
                const payload = {
                    memberUID: user_id,
                    trainerUID: this.trainerUID,
                    messages: masg
                };


                if (this.messagesLog.length > 0 || this.messagesLog.messages) {
                    this.messagesLog.messages.push(mess_data)
                }
                let query = firebase.firestore().collection('chat');
                query = query.where('memberUID', '==', user_id)
                query.get().then((querySnap) => {
                    if (querySnap.size > 0) {
                        querySnap.forEach((doc) => {
                            this.chatDocID = doc.id
                            firebase.firestore().collection('chat').doc(doc.id).get().then(snap => {
                                var text = snap.data()['messages']
                                text.push(mess_data)
                                snap.ref.update({messages: text})
                            })
                        })
                    } else {
                        this.messagesLog = payload
                        firebase.firestore().collection('chat').add(payload).then((doc) => {
                            this.chatDocID = doc.id
                        })
                    }

                })
                    .then(() => {
                    })
                console.log(this.typedMessage)
                const notification = {
                    description: this.typedMessage,
                    isSeen: false,
                    isAdminSeen: false,
                    receiver_id: (role == 'member') ? this.trainerUID : this.activeChatUser,
                    receiver_name: this.userName,
                    sender_id: this.uid,
                    url: 'chat-with-member',
                    sender_name: JSON.parse(localStorage.getItem('userInfo')).displayName,
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),//String(new Date()),//firebase.firestore.FieldValue.serverTimestamp(),
                    type: 'chat'
                };
                firebase.firestore().collection("notification").add(notification).then((snap) => {
                    console.log('notify done')
                    console.log(snap)
                })
                this.typedMessage = '';
                this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight;
            },
            toggleIsChatPinned(value) {
                this.isChatPinned = value;
            },
            handleWindowResize(event) {
                this.windowWidth = event.currentTarget.innerWidth;
                this.setSidebarWidth();
            },
            setSidebarWidth() {
                if (this.windowWidth < 1200) {
                    this.isChatSidebarActive = this.clickNotClose = false;
                } else {
                    this.isChatSidebarActive = this.clickNotClose = true;
                }
            },
            toggleChatSidebar(value = false) {
                if (!value && this.clickNotClose) return
                this.isChatSidebarActive = value;
            },
            detail(){
                let role = localStorage.getItem('userRole')
                let user_id = this.uid
                if (role == 'member') {
                    firebase.firestore().collection('users').doc(user_id).get().then((doc) => {
                        this.sales = []
                        this.trainerUID = doc.data()['assigned_trainer']

                        firebase.firestore().collection('users').doc(this.trainerUID).get().then((doc) => {
                            this.currentUserImageLink = doc.data()['profileUrl']
                            this.userName = doc.data()['name']
                            const sale = {
                                id: doc.id,
                                data: doc.data(),
                                "name": doc.data()['name'],
                                "mobile": doc.data()['mobile'],
                                "email": doc.data()['email'],
                                "avatar": doc.data()['profileUrl'] ? doc.data()['profileUrl'] : '',
                                "gender": doc.data()['gender'],
                                "img": 'avatar-s-1.png',
                                "status": 'online'
                            }
                            this.sales.push(sale)
                        })
                    })
                }
                else if (role == 'trainer') {
                    firebase.firestore().collection('users').where('assigned_trainer', '==', user_id).onSnapshot((querySnapshot) => {
                        this.sales = []
                        querySnapshot.forEach((doc) => {
                            this.trainerUID = doc.data()['assigned_trainer']
                            this.userName = doc.data()['first_name'] + ' ' + doc.data()['last_name']
                            const sale = {
                                id: doc.id,
                                // uid: ((doc.data()['status']) == false ? '' : true),
                                data: doc.data(),
                                "name": doc.data()['first_name'] + ' ' + doc.data()['last_name'],
                                "mobile": doc.data()['mobile'],
                                "email": doc.data()['email'],
                                "avatar": doc.data()['profileUrl'] ? doc.data()['profileUrl'] : '',
                                "gender": doc.data()['gender'],
                                "img": 'avatar-s-1.png',
                                "status": 'online'
                            }
                            this.sales.push(sale)

                        })
                    })
                }
            }
        },
        components: {
            VuePerfectScrollbar,
            ChatContact,
            UserProfile,
            ChatNavbar,
            ChatLog,
        },
        created() {
            this.detail()

            this.$nextTick(() => {
//                window.addEventListener('resize', this.handleWindowResize);
            })
            this.setSidebarWidth();
        },
        beforeDestroy: function () {
//            window.removeEventListener('resize', this.handleWindowResize)
        },
    }
</script>

<style lang="scss">
    @import "@/assets/scss/vuesax/apps/chat.scss";
</style>
