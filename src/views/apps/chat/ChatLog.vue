<!-- =========================================================================================
    File Name: ChatLog.vue
    ========================================================================================== -->

<!-- hasSentPreviousMsg -->

<template>
    <div id="component-chat-log" class="m-8" v-if="messagesLog">
        <div v-for="(msg, index) in messagesLog.messages" class="msg-grp-container" :key="index">
            <template v-if="messagesLog.messages[index-1]">
                <vs-divider v-if="!isSameDay(msg.time, messagesLog.messages[index-1].time)">
                    <span>{{ toDate(msg.time) }}</span>
                </vs-divider>
                <div class="spacer mt-8"
                     v-if="!hasSentPreviousMsg(userID == msg.sent_by , userID == msg.sent_by)"></div>
            </template>
            <div class="flex items-start" :class="[{'flex-row-reverse' : (userID == msg.sent_by)}]">

                <template v-if="messagesLog.messages[index-1]">
                    <template
                            v-if="(!hasSentPreviousMsg((userID == msg.sent_by), (userID == msg.sent_by)) || !isSameDay(msg.time, msg.time))">
                    </template>
                </template>

                <template>
                    <vs-avatar size="40px" class="border-2 shadow border-solid border-white m-0 flex-shrink-0"
                               :class="(userID == msg.sent_by) ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
                               :src="(userID == msg.sent_by)?currentUserData['profileUrl']:userData['profileUrl']"></vs-avatar>
                </template>

                <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm"
                     :class="{'bg-primary-gradient text-white':(userID == msg.sent_by), 'border border-solid border-grey-light bg-white': !(userID == msg.sent_by)}">
                    <span>{{ msg.message }}</span>
                    <feather-icon v-if="userID == msg.sent_by" icon="TrashIcon" svgClasses="w-4 h-4"
                                  :class="{'chat-message-delete right':(userID == msg.sent_by), 'chat-message-delete left': !(userID == msg.sent_by)}"
                                  @click="deleteText(index)"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import contacts from './contacts'
    import firebase from 'firebase/app'
    require('firebase/firestore')
    export default{
        props: {
            userId: '',
            messagesLog: {},
            currentUserImageLink: '',
            userData: {},
            currentUserData: {},
            chatDocID: '',
        },
        data() {
            return {
                contacts: contacts,
                // messagesLog: [],
                userID: '',
            }
        },
        computed: {
            user_role() {
                return localStorage.getItem('userRole')
            },
            chatData() {
                return localStorage.getItem('chatData')
            },
            contactIndex() {
                return contacts.findIndex(contact => contact.id == this.userId);
            },
            userImg() {
                if (this.contactIndex !== -1) return this.contacts[this.contactIndex].img;
            },
            activeUserImg() {
                return this.$store.state.AppActiveUser.img;
            },
            senderImg() {
                return (isSentByActiveUser) => {
                    if (isSentByActiveUser) return require(`@/assets/images/portrait/small/${this.$store.state.AppActiveUser.img}`);
                    else return require(`@/assets/images/portrait/small/${this.contacts[this.contactIndex].img}`);
                }
            },
            hasSentPreviousMsg() {
                return (last_sender, current_sender) => last_sender == current_sender
            },
        },
        methods: {
            deleteText(index){
                this.messagesLog.messages.splice(index, 1);
                let query = firebase.firestore().collection('chat');
                query = query.doc(this.chatDocID).get().then(snap => {
                    snap.ref.update({messages: this.messagesLog.messages})
                }).then(() => {
                    console.log('Message Deleted')
                })
            },
            isSameDay(time_to, time_from) {
                const date_time_to = new Date(Date.parse(time_to))
                const date_time_from = new Date(Date.parse(time_from));
                return date_time_to.getFullYear() === date_time_from.getFullYear() &&
                    date_time_to.getMonth() === date_time_from.getMonth() &&
                    date_time_to.getDate() === date_time_from.getDate();
            },
            toDate(time) {
                const locale = "en-us";
                const date_obj = new Date(Date.parse(time));
                const monthName = date_obj.toLocaleString(locale, {
                    month: 'short'
                });
                return date_obj.getDate() + ' ' + monthName;
            },
            scrollToBottom() {
                this.$nextTick(() => {
                    this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
                });
            }
        },
        updated() {
            this.scrollToBottom();
        },
        mounted() {
            this.scrollToBottom();
        },
        created() {
            this.userID = localStorage.getItem('uid')//firebase.auth().currentUser.uid
        }
    }
</script>


<style type="text/css">
    .chat-message-delete {
        color: #fff;
        cursor: pointer;
        background-color: darkred;
        padding: 5px;
        border-radius: 50%;
        float: left;
        margin-left: -40px;
    }

    .chat-message-delete.right {
        /*right: 100%;*/
    }
</style>
