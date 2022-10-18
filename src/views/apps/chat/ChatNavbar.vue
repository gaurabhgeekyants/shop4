<!-- =========================================================================================
    File Name: ChatNavbar.vue
    ========================================================================================== -->

<template>

    <div v-if="userId != null" class="chat__header">
        <vs-navbar class="p-4 flex navbar-custom" color="white" type="flat">
            <div class="relative flex mr-4">
                <feather-icon icon="MenuIcon" class="mr-4 cursor-pointer" v-if="isSidebarCollapsed"
                              @click.stop="$emit('openContactsSidebar')"></feather-icon>
                <vs-avatar v-show="profileImage!=''" class="m-0 border-2 border-solid border-white" size="40px"
                           :src="userData['profileUrl']" @click.stop="$emit('showProfileSidebar', userId)"/>

                <vs-avatar v-show="profileImage=='' && userData['gender']=='female'"
                           :src="require(`@/assets/images/portrait/small/female_avatar_vector.png`)"
                           class="m-0 border-2 border-solid border-white" size="40px"
                           @click.stop="$emit('showProfileSidebar', userId)"/>
                <vs-avatar v-show="profileImage=='' && userData['gender']=='male'"
                           :src="require(`@/assets/images/portrait/small/default-profile.png`)"
                           class="m-0 border-2 border-solid border-white" size="40px"
                           @click.stop="$emit('showProfileSidebar', userId)"/>
                <vs-avatar v-show="profileImage=='' && userData['gender']=='other'"
                           :src="require(`@/assets/images/portrait/small/default-profile.png`)"
                           class="m-0 border-2 border-solid border-white" size="40px"
                           @click.stop="$emit('showProfileSidebar', userId)"/>

                <div class="h-3 w-3 border-white border border-solid rounded-full absolute right-0 bottom-0"
                     :class="'bg-' + getStatusColor()"></div>
            </div>

            <h6>{{ userData['first_name']}}  {{userData['last_name']}}</h6>

            <vs-spacer></vs-spacer>
        </vs-navbar>
    </div>
</template>

<script>
    import contacts from './contacts'

    export default{
        props: {
            userId: '',
            userData: {}
            ,
            isPinnedProp: {
                type: Boolean,
                required: true,
            },
            isSidebarCollapsed: {
                type: Boolean,
                required: true,
            }
        },
        data() {
            return {
                contacts: contacts,
                isPinnedLocal: this.isPinnedProp,
            }
        },
        watch: {
            isPinnedProp(val) {
                this.isPinnedLocal = val;
            }
        },
        computed: {
            contactIndex() {
                return contacts.findIndex(contact => contact.id == this.userId);
            },

            getStatusColor() {
                return () => {
                    const userStatus = this.userData['activeUser']
                    if (userStatus == true) {
                        return "success"
                    } else {
                        return "grey"
                    }
                }
            },

            profileImage(){
                return this.userData['profileUrl'] ? this.userData['profileUrl'] : ''
            }
        },
        methods: {},
    }
</script>
