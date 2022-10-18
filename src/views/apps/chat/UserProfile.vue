<!-- =========================================================================================
    File Name: UserProfile.vue
    Description: user profile sidebar
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="parentx-demo-2">

        <vs-sidebar parent="#chat-app" :position-right="!isActiveUser" :hidden-background="false" v-model="activeLocal" id="chat-profile-sidebar" class="items-no-padding">

            <div class="header-sidebar relative flex flex-col p-0" slot="header">
                <feather-icon icon="XIcon" svgClasses="m-2 cursor-pointer absolute top-0 right-0" @click="$emit('closeProfileSidebar', false)"></feather-icon>
        <!--      <img v-show="tr.data.profileUrl != ''" :src="tr.data.profileUrl ? tr.data.profileUrl : '../../../assets/images/pages/bg-avatar.png'" style="width: 40px; height: 40px;">
              <img v-show="tr.data.profileUrl == ''" src="../../../assets/images/portrait/small/default-profile.png" style="width: 40px; height: 40px;">

-->
              <div class="relative inline-flex mx-auto mb-5 mt-6">
                    <vs-avatar v-show="profileImage!=''" class="m-0 border-white border-2 border-solid shadow-md" :src="profileImage" style="width: 70px; height: 70px;" />
                    <vs-avatar v-show="profileImage=='' && userData['gender']=='female'"  class="m-0 border-white border-2 border-solid shadow-md"  :src="require(`@/assets/images/portrait/small/female_avatar_vector.png`)" style="width: 70px; height: 70px;" />
                    <vs-avatar v-show="profileImage=='' && userData['gender']=='male'" class="m-0 border-white border-2 border-solid shadow-md" :src="require(`@/assets/images/portrait/small/default-profile.png`)" size="70px" />
                    <vs-avatar v-show="profileImage=='' && userData['gender']=='other'" class="m-0 border-white border-2 border-solid shadow-md" :src="require(`@/assets/images/portrait/small/default-profile.png`)" size="70px" />

                  <!--&lt;!&ndash;    <vs-avatar v-show="userData['profileUrl'] == '' && userData['gender']=='male'" class="m-0 border-white border-2 border-solid shadow-md" :src="require(`@/assets/images/portrait/small/default-profile.png`)" size="70px" />-->
                  <!--<vs-avatar v-show="userData['profileUrl'] == '' && userData['gender']=='female'" class="m-0 border-white border-2 border-solid shadow-md" :src="require(`@/assets/images/portrait/small/female_avatar_vector.png`)" size="70px" />-->
                  <!--
   <div class="h-5 w-5 border-white border-2 border-solid rounded-full absolute right-0 bottom-0" :class="'bg-' + getStatusColor(isActiveUser)"></div>-->
                </div>
                <h4 class="mr-2 self-center">{{ userData['first_name']+' '+userData['last_name'] }}</h4>
            </div>

      <!--      <VuePerfectScrollbar class="scroll-area" :settings="settings">
            <div class="p-8">

                <h6 class="mb-2" :class="{'ml-4': isActiveUser}">About</h6>
                <vs-textarea class="mb-10" counter="120" maxlength="120" :counter-danger.sync="counterDanger" v-model="about" rows="5" v-if="isActiveUser" />
                <p v-else>{{ about }}</p>

                <div class="userProfile__status" v-if="isActiveUser">
                    <h6 class="mb-4">Status</h6>
                    <ul>
                        <li class="mb-2">
                            <vs-radio v-model="status" vs-value="online" color="success">Active</vs-radio>
                        </li>
                        <li class="mb-2">
                            <vs-radio v-model="status" vs-value="do not disturb" color="danger">Do Not Disturb</vs-radio>
                        </li>
                        <li class="mb-2">
                            <vs-radio v-model="status" vs-value="away" color="warning">Away</vs-radio>
                        </li>
                        <li class="mb-2">
                            <vs-radio v-model="status" vs-value="offline" color="grey">Offline</vs-radio>
                        </li>
                    </ul>
                </div>
            </div>
            </VuePerfectScrollbar>-->
        </vs-sidebar>
    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import contacts from './contacts.js'
export default{
    props: {
        userId: '',
        userData:{},
        active: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            contacts: contacts,
            counterDanger: false,
            settings: {
                maxScrollbarLength: 60,
                wheelSpeed: .60,
            },
        }
    },
    computed: {
        isActiveUser() {
            return this.contactIndex === -1;
        },
        activeLocal: {
            get() {
                return this.active
            },
            set(value) {
                this.$emit('closeProfileSidebar', value);
            }
        },
        contactIndex() {
            return contacts.findIndex(contact => contact.id == this.userId);
        },
        userImg() {
            if(this.contactIndex === -1) {
                return this.$store.state.AppActiveUser.img;
            }else{
                return this.contacts[this.contactIndex].img;
            }
        },

    profileImage(){
        return this.userData['profileUrl']?this.userData['profileUrl']:''
    }
    },
    methods: {

    },
    components:{
        VuePerfectScrollbar,
    }
}
</script>
