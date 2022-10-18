<!-- =========================================================================================
    File Name: adminLead.vue
    Description: Lead List for admin
    ----------------------------------------------------------------------------------------
    ========================================================================================== -->

<template>
    <div id="data-list-list-view" class="data-list-container">
        <div class="centerx">
            <vs-popup class="holamundo" title="Select the Package Type" :active.sync="popupActivo">
                <div class="vx-col lg:w-1/2 sm:w-1/2 mb-6">
                    <select v-model="program_type" class="w-full"
                            style=" height: 38px; padding: 5px 10px; border-radius: 3px; border: 1px solid rgba(0,0,0,.2)">
                        <option v-for="(region, index) in package" :value="region.id">
                            {{ region.name }}
                        </option>
                    </select>
                </div>
                <vs-button class="mr-3 mb-2" id="button-save11" @click="convertToMember()">Convert</vs-button>
            </vs-popup>
        </div>

        <div class="centerx">
            <vs-popup class="holamundo" title="Assign Lead To Sale" :active.sync="popupAssign">
                <div class="mt-6 flex items-center justify-between px-6">
                </div>
                <VuePerfectScrollbar class="scroll-area--data-list-add-new pt-4 pb-6">


                    <div class="trainer-holder vs-con-loading__container" id="div-with-loading">
                        <ul>
                            <li :key="indextr" v-for="(tr, indextr) in options" :class="'active'">
                                <span></span>
                                <div class="flex items-center">
                                    <div class="con-vs-avatar flex-shrink-0 mr-2 30px"
                                         style="width: 30px; height: 30px; background: rgb(195, 195, 195);">
                                        <!---->
                                        <div class="con-img vs-avatar--con-img">
                                            <img v-show="tr.profileUrl != ''"
                                                 :src="tr.profileUrl ? tr.profileUrl : '../../../assets/images/portrait/small/default-profile.png'"
                                                 style="width: 60px; height: 60px;">
                                            <img v-show="tr.profileUrl == ''"
                                                 src="../../../assets/images/portrait/small/default-profile.png"
                                                 style="width: 60px; height: 60px;">

                                        </div>
                                    </div>
                                    <a @click="assignLead(tr.id,tr.name )" class="text-inherit hover:text-primary">
                                        {{ tr.name }}</a>
                                </div>

                            </li>
                        </ul>
                    </div>
                </VuePerfectScrollbar>

                <div class="flex flex-wrap items-center justify-center p-6" slot="footer">
                    <vs-button type="border" color="danger" @click.stop="isSidebarActiveLocal = false">Cancel
                    </vs-button>
                </div>
            </vs-popup>
        </div>

        <vs-table>
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

             <!--   <div class="con-input-search vs-table&#45;&#45;search">
                    <input type="text" class="search-member-input" v-model="search" @change="getSearchList"><i
                        class="vs-icon notranslate icon-scale material-icons null">
                    search</i></div>-->

                <div class="flex flex-wrap-reverse items-center">
                    <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary add-new"
                         @click="$router.push({name:'page-lead-create'})">

                        <span class="ml-2 text-base text-primary">Add New Lead</span>
                    </div>
                </div>
            </div>
            <div>
                <vs-tabs class="member-tabs">
                    <vs-tab label="Leads">
                        <vs-table
                                pagination
                                max-items="25"
                                search
                                :data="trainers">
                            <template slot="thead">
                                <vs-th sort-key="first_name">
                                    Name

                                </vs-th>
                                <vs-th sort-key="email">
                                    Email
                                </vs-th>
                                <vs-th sort-key="phone">
                                    Phone no.
                                </vs-th>
                                <vs-th sort-key="occupation">
                                    Occupation
                                </vs-th>
                                <vs-th>
                                    Status
                                </vs-th>
                                <vs-th>
                                    Lead Honor
                                </vs-th>
                                <vs-th>
                                    Actions
                                </vs-th>
                            </template>
                            <template slot-scope="{data}">
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr].first_name">
                                        {{data[indextr].first_name}} {{data[indextr].last_name}}
                                    </vs-td>

                                    <vs-td :data="data[indextr].email">
                                        {{data[indextr].email}}
                                    </vs-td>

                                    <vs-td :data="data[indextr].phone">
                                        <a :href='"tel:"+data[indextr].phone'>{{data[indextr].phone}}</a>

                                    </vs-td>
                                    <vs-td :data="data[indextr].occupation">
                                        {{data[indextr].occupation}}
                                    </vs-td>

                                    <vs-td>

                                        <div v-if="data[indextr].isLead == true"
                                             @click="popupuid=data[indextr].id,popfirst=data[indextr].first_name, poplast=data[indextr].last_name, popemail=data[indextr].email, popphone=data[indextr].phone,popupActivo=true">
                  <span class="ml-2 text-base text-primary" style="display: inline-flex;"><feather-icon
                          icon="RotateCwIcon" svgClasses="h-4 w-4"/>
                    </span>

                                        </div>

                                        <div v-if="data[indextr].isLead == false">
                  <span class="ml-2 text-base text-success" style="display: inline-flex;"><feather-icon icon="UserIcon"
                                                                                                        svgClasses="h-4 w-4"/>
                    </span>
                                        </div>
                                    </vs-td>
                                    <vs-td>

                                        <vs-dropdown>

                                            <a class="flex items-center" href="#">
                                                Assign
                                                <i class="material-icons"> expand_more </i>
                                            </a>


                                            <vs-dropdown-menu>

                                                <vs-dropdown-item :key="salesman_list"
                                                                  v-for="(tr, salesman_list) in options">
                                                    <label @click="popupLeadUid=data[indextr].id, popLeadFirst=data[indextr].first_name,
                         popLeadLast=data[indextr].last_name,popSaleName=tr.name, popSaleid=tr.id, openConfirm()">
                                                        {{ tr.name }}</label>
                                                </vs-dropdown-item>

                                            </vs-dropdown-menu>
                                        </vs-dropdown>


                                    </vs-td>

                                    <vs-td>
                                        <vs-button
                                                @click="$router.push({name:'lead-edit',params:{docID:data[indextr].id }})"
                                                icon="edit"
                                                color="primary"
                                                type="border"
                                        ></vs-button>

                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                    </vs-tab>
                    <vs-tab label="Assign Leads">
                        <vs-table
                                pagination
                                max-items="25"
                                search
                                :data="assignLeads">
                            <template slot="thead">
                                <vs-th sort-key="first_name">
                                    Name

                                </vs-th>
                                <vs-th sort-key="email">
                                    Email
                                </vs-th>
                                <vs-th sort-key="phone">
                                    Phone no.
                                </vs-th>
                                <vs-th sort-key="occupation">
                                    Occupation
                                </vs-th>
                                <vs-th>
                                    Status
                                </vs-th>
                                <vs-th>
                                    Lead Honor
                                </vs-th>
                                <vs-th>
                                    Actions
                                </vs-th>
                            </template>
                            <template slot-scope="{data}">
                                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                                    <vs-td :data="data[indextr].first_name">
                                        {{data[indextr].first_name}} {{data[indextr].last_name}}
                                    </vs-td>

                                    <vs-td :data="data[indextr].email">
                                        {{data[indextr].email}}
                                    </vs-td>

                                    <vs-td :data="data[indextr].phone">
                                        <a :href='"tel:"+data[indextr].phone'>{{data[indextr].phone}}</a>

                                    </vs-td>
                                    <vs-td :data="data[indextr].occupation">
                                        {{data[indextr].occupation}}
                                    </vs-td>

                                    <vs-td>

                                        <div v-if="data[indextr].isLead == true"
                                             @click="popupuid=data[indextr].id,popfirst=data[indextr].first_name, poplast=data[indextr].last_name, popemail=data[indextr].email, popphone=data[indextr].phone,popupActivo=true">
                  <span class="ml-2 text-base text-primary" style="display: inline-flex;"><feather-icon
                          icon="RotateCwIcon" svgClasses="h-4 w-4"/>
                    </span>

                                        </div>

                                        <div v-if="data[indextr].isLead == false">
                  <span class="ml-2 text-base text-success" style="display: inline-flex;"><feather-icon icon="UserIcon"
                                                                                                        svgClasses="h-4 w-4"/>
                    </span>
                                        </div>
                                    </vs-td>
                                    <vs-td>

                <span v-if="data[indextr].assign_lead == true"
                      color="primary">
                <!--    Assigned-->
                    {{data[indextr].lead_name}}
                </span>

                                    </vs-td>

                                    <vs-td>
                                        <vs-button
                                                @click="$router.push({name:'lead-edit',params:{docID:data[indextr].id }})"
                                                icon="edit"
                                                color="primary"
                                                type="border"
                                        ></vs-button>

                                    </vs-td>
                                </vs-tr>
                            </template>
                        </vs-table>
                    </vs-tab>
                </vs-tabs>
            </div>
            <div v-if="deadLeads.length > 0">
                <h1>Dead Leads </h1>
                <vs-table
                        pagination
                        max-items="25"
                        search
                        :data="deadLeads">
                    <template slot="thead">
                        <vs-th sort-key="first_name">
                            Name

                        </vs-th>
                        <vs-th sort-key="email">
                            Email
                        </vs-th>
                        <vs-th sort-key="phone">
                            Phone no.
                        </vs-th>
                        <vs-th sort-key="occupation">
                            Occupation
                        </vs-th>
                        <vs-th>
                            Lead Honor
                        </vs-th>
                        <vs-th>
                            Actions
                        </vs-th>
                    </template>
                    <template slot-scope="{data}">
                        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td :data="data[indextr].first_name">
                                {{data[indextr].first_name}} {{data[indextr].last_name}}
                            </vs-td>

                            <vs-td :data="data[indextr].email">
                                {{data[indextr].email}}
                            </vs-td>

                            <vs-td :data="data[indextr].phone">
                                <a :href='"tel:"+data[indextr].phone'>{{data[indextr].phone}}</a>

                            </vs-td>
                            <vs-td :data="data[indextr].occupation">
                                {{data[indextr].occupation}}
                            </vs-td>


                            <vs-td>

                                <vs-dropdown>

                                    <a class="flex items-center" href="#">
                                        Assign
                                        <i class="material-icons"> expand_more </i>
                                    </a>


                                    <vs-dropdown-menu>

                                        <vs-dropdown-item :key="salesman_list" v-for="(tr, salesman_list) in options">
                                            <label @click="popupLeadUid=data[indextr].id,popLeadFirst=data[indextr].first_name,
                         popLeadLast=data[indextr].last_name,assignLead(data[indextr].id,tr.id,tr.name )">
                                                {{ tr.name }}</label>
                                        </vs-dropdown-item>

                                    </vs-dropdown-menu>
                                </vs-dropdown>


                            </vs-td>

                            <vs-td>
                                <vs-button
                                        @click="$router.push({name:'lead-edit',params:{docID:data[indextr].id }})"
                                        icon="edit"
                                        color="primary"
                                        type="border"
                                ></vs-button>

                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </div>
        </vs-table>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    import axios from 'axios';
    import $ from 'jquery'

    export default {
        components: {},
        data() {
            return {
                search: '',
                usersAll: [],
                options: [],
                days_paused: 0,
                assign_lead:false,
                popupActivo: false,
                popupAssign: false,
                popupSaleUid: '',
                popLeadFirst: '',
                popLeadLast: '',
                popfirst: '',
                poplast: '',
                popemail: '',
                popphone: '',
                trainers: [],
                deadLeads: [],


                activeConfirm: false,
                popupLeadUid: '',
                popSaleName: '',
                popSaleid: '',
                assignLeads: [],
                addNewDataSidebar: false,
                trIndex: '',
                trainerUID: '',
                addNewFlag: false,
                program_type: '',
            }
        },
        computed: {},
        methods: {
            getSearchList(){
                $(document).find('.vs-pagination--ul li:first-child').click();
                const search = this.search
                if (!search) this.trainers = this.usersAll;
                this.trainers = this.usersAll.filter(item => {
                    return item.name.indexOf(search) > -1
                        || item.email.toLowerCase().indexOf(search) > -1 || item.phone.trim().replace(/[\s\/]/g, '').indexOf(search.replace(/[\s\/]/g, '')) > -1
                })
            },

            popupClose(){
                this.addNewDataSidebar = false
                this.getLeads()
                this.getSearchList()
            },
            getLeads(){

                firebase.firestore().collection('leads').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                    this.trainers = []
                    querySnapshot.forEach((doc) => {
                        if (doc.data().lead_status != 'hgWSF4yia2KUmP4oVYq9') {
                            const trainer = {
                                docID: doc.id,
                                id: doc.id,
                                data: doc.data(),
                                "first_name": doc.data()['first_name'],
                                "last_name": doc.data()['last_name'],
                                "phone": doc.data()['mobileFormat'] ? doc.data()['mobileFormat'] : doc.data()['phone'],
                                "email": doc.data()['email'],
                                "occupation": doc.data()['occupation'],
                                "isLead": ((doc.data()['isLead'] != undefined ) ? doc.data()['isLead'] : true)
                            }
                            this.trainers.push(trainer)
                        }
                    })
                })
//          deadLeads
                firebase.firestore().collection('leads').where('lead_status', '==', 'hgWSF4yia2KUmP4oVYq9').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                    this.deadLeads = []
                    querySnapshot.forEach((doc) => {
                        const trainer = {
                            docID: doc.id,
                            id: doc.id,
                            data: doc.data(),
                            "first_name": doc.data()['first_name'],
                            "last_name": doc.data()['last_name'],
                            "phone": doc.data()['mobileFormat'] ? doc.data()['mobileFormat'] : doc.data()['phone'],
                            "email": doc.data()['email'],
                            "occupation": doc.data()['occupation'],
                            "isLead": ((doc.data()['isLead'] != undefined ) ? doc.data()['isLead'] : true)
                        }
                        this.deadLeads.push(trainer)
                    })
                })
            },
            getChangeSaleLeads(){
                firebase.firestore().collection('lead_assign_sale').where('old_sale_id', '==', localStorage.getItem('uid')).onSnapshot((querySnapshot) => {
//                    this.assignLeads=[]
                    querySnapshot.forEach((doc) => {
                        firebase.firestore().collection('leads').doc(doc.data().lead_id).get().then((docs) => {
                            if (docs.data().lead_status != 'hgWSF4yia2KUmP4oVYq9') {
                                const assign = {
                                    docID: docs.id,
                                    id: docs.id,
                                    data: docs.data(),
                                    "first_name": docs.data()['first_name'],
                                    "last_name": docs.data()['last_name'],
                                    "phone": docs.data()['mobileFormat'] ? docs.data()['mobileFormat'] : docs.data()['phone'],
                                    "email": docs.data()['email'],
                                    "occupation": docs.data()['occupation'],
                                    "isLead": ((docs.data()['isLead'] != undefined ) ? docs.data()['isLead'] : true)
                                }

                                firebase.firestore().collection('lead_assign_sale').where('lead_id', '==', docs.id).get().then((querySnapshot) => {

                                    querySnapshot.forEach((doc) => {
                                        firebase.firestore().collection('users').doc(doc.data().new_sale_id).get().then((snap) => {
                                            assign['lead_name'] = snap.data().name
                                            assign['assign_lead'] = true
//                                                this.assignLeads.push(assign)
                                        })
                                    })
                                })
                                this.assignLeads.push(assign)

                            }
                        })
                    })
                })

            },
            deleteLead(docID) {
                this.loadContent()
                firebase.firestore().collection('leads')
                    .doc(docID).delete()
                    .then(() => {
                        this.getLeads()
                        console.log('Successfully Deleted the record')
                    })
                    .catch(error => {
                        console.error('There was an error deleting the record: ' + error)
                    })
            },


            convertToMember(lead_uid = this.popupuid, first_name = this.popfirst, last_name = this.poplast, email = this.popemail, phone = this.popphone) {
                this.popupActivo = false
                this.loadContent()
                let password = Math.random().toString(36).slice(-8)
                const memberPayLoad = {
                    first_name: first_name,
                    last_name: last_name,
                    email: email ? email : '',
                    hash: password,
                    mobile: phone ? phone : '',
                    role: "member",
                    memberDetail: {
                        program_type: this.program_type ? this.program_type : ''
                    },
                    status: false,
                    firstTimeLogin: true,

                    /* isLead:true,
                     firstTimeLogin:true,*/
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                }
                /*   firebase.firestore().collection("notification").add(notification).then(() => {
                 console.log('notify done')
                 })*/
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then((user) => {
                            this.uid = user.user.uid
                            firebase.firestore().collection("users").doc(this.uid).set(memberPayLoad, {merge: true})
                            firebase.firestore().collection('leads').doc(lead_uid).get()
                                .then(snap => {
                                    snap.ref.update({isLead: false});
                                })
                            this.trIndex = this.trainers.findIndex(x => x.id === lead_uid)
                            this.trainers[this.trIndex]['isLead'] = false
                            const formData = new FormData();
                            formData.append('name', first_name + ' ' + last_name);
                            formData.append('email', email);
                            formData.append('subject', 'Welcome to Xtreme Performance');
                            formData.append('link', 'https://backend.xtremeperformance.co.in/profile-complete/' + this.uid);
                            formData.append('type', 'leadProfileCompletion');

                            axios.post('https://backend.xtremeperformance.co.in/mailer/email.php', formData, {'Access-Control-Allow-Origin': '*'})
                                .then(response => {

                                }).catch(e => {
                                this.$vs.notify({
                                    title: 'Success',
                                    text: 'Leads Convert Into Member Successfully!',
                                    iconPack: 'feather',
                                    icon: 'icon-check',
                                    color: 'success'
                                });
                            })
                            const lead_conversion = {
                                member_id: this.uid,
                                lead_id: lead_uid,
                                lead_owner: localStorage.getItem('uid'),
                                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                            }
                            firebase.firestore().collection("lead_member_conversion").add(lead_conversion).then(() => {
                                console.log('lead_member conversion')
                            })
                            const notification = {
                                created_at: firebase.firestore.FieldValue.serverTimestamp(),
                                description: "Leads connverted to Member",
                                isSeen: false,
                                isAdminSeen: false,
                                receiver_id: '',
                                receiver_name: first_name + ' ' + last_name,
                                sender_id: localStorage.getItem('uid'),
                                sender_name: JSON.parse(localStorage.getItem('userInfo')).displayName,
                                type: 'lead',
                                url:'/members/edit/'+this.uid
                            };
                            firebase.firestore().collection("notification").add(notification).then(() => {
                                console.log('notify done')
                            })
                            this.$vs.notify({
                                title: 'Success',
                                text: 'Leads Convert Into Member Successfully!',
                                iconPack: 'feather',
                                icon: 'icon-check',
                                color: 'success'
                            });
                            this.$vs.loading.close()
                        },
                        (error) => {
                            this.$vs.loading.close()
                            this.$vs.notify({
                                title: 'Error',
                                text: error.message,
                                iconPack: 'feather',
                                icon: 'icon-alert-circle',
                                color: 'danger'
                            });
                        })
            },
            loadContent() {
                this.$vs.loading()
                setTimeout(() => {
                    this.$vs.loading.close()
                }, 1000);
            },
            getSale(){
                this.options = []
                firebase.firestore().collection('users').where('role', '==', 'sale').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const trainer = {
                            id: doc.id,
                            name: doc.data()['name'],
                            profileUrl: doc.data()['profileUrl']
                        }
                        this.options.push(trainer)
                    })
                })
            },
            assignLead(){
                var sale_name = this.popSaleName
                var sale_uid = this.popSaleid
                this.setUID(this.popupLeadUid)
                this.trainers.splice(this.trIndex, 1)
                const assign_Data = {
                    created_at: firebase.firestore.FieldValue.serverTimestamp(),
                    lead_id: this.popupLeadUid,
                    old_sale_id: localStorage.getItem('uid'),
                    new_sale_id: sale_uid
                };

                firebase.firestore().collection('lead_assign_sale').add(assign_Data)
                    .then((snap) => {
                        console.log('lead_assign_sale done')
                        console.log(snap)

                    })
                firebase.firestore().collection('leads').doc(this.popupLeadUid).get()
                    .then(snap => {
                        snap.ref.update({lead_owner: sale_uid});
                        this.trIndex = this.trainers.findIndex(x => x.id === this.popupLeadUid)
                        this.trainers[this.trIndex]['assign_lead'] = true
                        this.trainers[this.trIndex]['lead_name'] = sale_name

                        const notification = {
                            created_at: firebase.firestore.FieldValue.serverTimestamp(),
                            description: this.popLeadFirst + ' ' + this.popLeadLast + " Assign To " + sale_name,
                            isSeen: false,
                            isAdminSeen: false,
                            receiver_id: sale_uid,
                            receiver_name: sale_name,
                            sender_id: localStorage.getItem('uid'),
                            sender_name: JSON.parse(localStorage.getItem('userInfo')).displayName,
                            url: '/lead/edit/'+this.popupLeadUid,
                            type: 'assign_lead'
                        };
                        firebase.firestore().collection("notification").add(notification).then(() => {
                            console.log('notify done')
                        })
                   /*     const adminNotification = {
                            created_at: firebase.firestore.FieldValue.serverTimestamp(),
                            description: this.popLeadFirst + ' ' + this.popLeadLast + " Assign To " + sale_name + " by the sales person " + JSON.parse(localStorage.getItem('userInfo')).displayName,
                            isSeen: false,
                            isAdminSeen: false,
                            receiver_id: '',
                            receiver_name: this.popLeadFirst + ' ' + this.popLeadLast,
                            sender_id: localStorage.getItem('uid'),
                            sender_name: JSON.parse(localStorage.getItem('userInfo')).displayName,
                            url: 'member-edit',
                            type: 'assign_lead'
                        };
                        firebase.firestore().collection("notification").add(adminNotification).then(() => {
                            console.log('admin notify done')
                        })*/
                        this.$vs.loading.close()
                        this.$vs.notify({
                            title: 'Success',
                            text: this.popLeadFirst + ' ' + this.popLeadLast + ' Leads Assign Successfully! to ' + sale_name,
                            iconPack: 'feather',
                            icon: 'icon-check',
                            color: 'success'
                        });
                    })
                    .catch(error => {
                        console.error('There was an error editing the record: ' + error)
                    }), (error) => {
                    this.$vs.notify({
                        title: 'Error',
                        text: error.message,
                        iconPack: 'feather',
                        icon: 'icon-alert-circle',
                        color: 'danger'
                    });
                }
            },
            openConfirm() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: '',//`Assign`,
                    text: 'Are you sure you want to Assign',
                    accept: this.assignLead
                })
            },
            acceptAlert() {
                this.$vs.notify({
                    color: 'danger',
                    title: 'Deleted image',
                    text: 'The selected image was successfully deleted'
                })
            },
            setUID(uid) {
                this.trIndex = this.trainers.findIndex(x => x.id === uid)
            }
        },
        created() {
            this.package = []
            this.getLeads()
            this.getChangeSaleLeads()
            this.getSale()
            firebase.firestore().collection('package').get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const trainer = {
                        id: doc.id,
                        name: doc.data()['title']
                    }
                    this.package.push(trainer)
                })
            })
        }
    }
</script>
<style>

    .member-tabs .vs-tabs--li {
        display: block;
        position: relative;
        width: 50%;
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


