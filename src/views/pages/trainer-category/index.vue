<!-- =========================================================================================
    File Name: Trainer Category List
    Description: These Details are added by Admin
     ========================================================================================== -->

<template>
    <vx-card>
        <vs-table
                pagination max-items="25"
                stripe
                search :data="Interests">
            <div slot="header" class="vs-lg-12">
                <div class="vx-row">
                    <div class="vx-col xs:w-full md:w-1/3lg:w-1/3  sm:w-1/3 mb-6">
                        <vs-input
                                v-validate="'required'"
                                data-vv-validate-on="blur"
                                name="title"
                                label-placeholder="Title"
                                v-model="title"
                                class="w-full no-icon-border"/>
                        <span class="text-danger text-sm">{{ errors.first('title') }}</span>

                    </div>
                    <div class="vx-col">
                        <button class="button-save p-3 mb-10 mr-4 rounded-lg vs-align-center cursor-pointer text-lg font-medium text-base text-primary border border-solid border-primary save"
                                v-if="!addNewFlag" @click="saveInterest()">
                            <span class="ml-2 text-base text-primary">Save</span>
                        </button>
                        <button class="button-save p-3 mb-10 mr-4 rounded-lg vs-align-center cursor-pointer text-lg font-medium text-base text-primary border border-solid border-primary save"
                                v-if="addNewFlag" @click="updateInterest()">
                            <span class="ml-2 text-base text-primary">Edit</span>
                        </button>
                        <button class="p-3 mb-10 mr-4 rounded-lg vs-align-center cursor-pointer text-lg font-medium text-base text-primary border border-solid border-primary save"
                                @click="clearFields">
                            <span class="ml-2 text-base text-primary">Cancel</span>
                        </button>

                    </div>
                </div>
            </div>
            <template slot="thead">
                <vs-th sort-key="title">Title</vs-th>
                <vs-th sort-key="action">Actions</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].data.title">
                        {{ data[indextr].data.title }}
                    </vs-td>
                    <vs-td>
                        <div class="p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary edit"
                             @click="editInterest(tr.uid),addNewFlag=true, interestUID = tr.uid">
                            <span class="ml-2 text-base text-primary"><feather-icon icon="EditIcon"
                                                                                    svgClasses="h-5 w-5"/></span>
                        </div>
                        <span><a
                                class="p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger trash"
                                button @click="deleteInterest(tr.uid,data[indextr].data.title)"><feather-icon
                                icon="TrashIcon" svgClasses="h-5 w-5"/></a> </span>

                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>
    </vx-card>
</template>

<script>
    import firebase from 'firebase/app'
    require('firebase/firestore')
    import 'firebase/auth'
    export default {
        components: {},
        data() {
            return {
                title: '',
                Interests: [],
                addNewDataSidebar: false,
                interestUID: '',
                addNewFlag: false
            }
        },
        computed: {},
        methods: {
            clearFields() {
                this.title = '';
                this.tenure = '';
            },
            loadContent() {
                this.$vs.loading({
                    background: this.backgroundLoading,
                    color: this.colorLoading,
                    container: ".button-save",
                    scale: 0.45
                })
                setTimeout(() => {
                    this.$vs.loading.close(".button-save > .con-vs-loading")
                }, 2000);
            },
            popupClose(){
                this.addNewDataSidebar = false

                this.getInterests()
            },
            getInterests(){
                firebase.firestore().collection('trainer-category').orderBy('createdAt', 'desc').get().then((querySnapshot) => {
                    this.Interests = []
                    querySnapshot.forEach((doc) => {
                        const interest = {
                            uid: doc.id,
                            data: doc.data(),
                            title: doc.data().title
                        }
                        this.Interests.push(interest)
                    })
                })
            },
            saveInterest(){
                this.$validator.validateAll().then(result => {
                    if (result) {
                        this.loadContent();
                        const memberPayLoad = {
                            title: this.title ? this.title : '',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        }
                        firebase.firestore().collection("trainer-category").add(
                            memberPayLoad
                        )
                            .then(() => {
                                    this.getInterests();
                                    this.title = '';
                                    this.$vs.notify({
                                        title: 'Interest Created',
                                        text: 'Successfully Created!',
                                        iconPack: 'feather',
                                        icon: 'icon-check',
                                        color: 'success'
                                    });
                                },
                                (error) => {
                                    this.$vs.notify({
                                        title: 'Error',
                                        text: error.message,
                                        iconPack: 'feather',
                                        icon: 'icon-alert-circle',
                                        color: 'danger'
                                    });
                                })
                    } else {
                        // form have errors
                    }
                })

            },
            deleteInterest(uid, title) {
                let title_text = title;
                firebase.firestore().collection('trainer-category')
                    .doc(uid).delete()
                    .then(() => {
                        this.getInterests()
                        console.log('Successfully Deleted the record')
                        this.$vs.notify({
                            title: '',
                            text: title_text + ' Deleted!!',
                            iconPack: 'feather',
                            icon: 'icon-alert-circle',
                            color: 'danger'
                        });
                        this.addNewFlag = false;
                        this.title = '';
                    })
                    .catch(error => {
                        console.error('There was an error deleting the record: ' + error)
                    })
            },
            editInterest(uid){
                // this.loadContent();
                firebase.firestore().collection('trainer-category').doc(uid).get().then((doc) => {
                    let value = doc.data();
                    this.title = value.title;
                })
            },
            updateInterest(){
                this.$validator.validateAll().then(result => {
                    if (result) {
                        firebase.firestore().collection('trainer-category').doc(this.interestUID).get()
                            .then(snap => {
                                return snap.ref.update({
                                    title: this.title
                                });
                            })
                            .then(() => {
                                this.addNewFlag = false;
                                this.$vs.notify({
                                    title: this.title + ' updated!!',
                                    text: 'Successfully Update!',
                                    iconPack: 'feather',
                                    icon: 'icon-check',
                                    color: 'success'
                                });
                                this.getInterests();
                                this.title = '';
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
                    } else {
                        // form have errors
                    }
                })


            },
        },
        created() {
            this.getInterests()
        }
    }
</script>

<style lang="scss">
    .vs-con-input-label.is-label-placeholder {
        margin-top: 0;
    }

    .vs-con-input-label.is-label-placeholder input {
        height: 50px;
        padding: 10px;
    }

    .vs-input--placeholder.normal {
        padding: 15px;
    }

    .edit {
        float: left;
        width: 30px;
        height: 30px;

    }

    .save {
        float: left;
        width: 100px;
        height: 50px;
        background: none;
    }

    .edit .text-base {
        margin: 0 !important;
    }

    .edit .feather-icon {
        color: #7367f0;
        margin: 7px 0 0 1px;
    }

    .edit:hover .feather-icon {
        color: #fff;
    }

    .trash {
        float: left;
        width: 30px;
        height: 30px;
    }

    .trash .text-base {
        margin: 0 !important;
    }

    .trash .feather-icon {
        color: #ff9f43;
    }

    .add-new:hover {
        background: #8c83f3;
    }

    .add-new:hover .text-primary {
        color: #fff !important;
    }

    #data-list-list-view {
        .vs-con-table {

            .vs-table--header {
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
                        padding: 8px;
                        &:first-child {
                            border-top-left-radius: .5rem;
                            border-bottom-left-radius: .5rem;
                        }
                        &:last-child {
                            border-top-right-radius: .5rem;
                            border-bottom-right-radius: .5rem;
                        }
                    }
                    td.td-check {
                        padding: 8px !important;
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

    .title-top {
        float: left;
        width: 250px !important;
    }

    .save {
        float: left;
        width: 100px;
        height: 50px;
        background: none;
        &:hover {
            background: rgb(115, 103, 240);
            &:hover span {
                color: #fff !important;
            }
        }
    }
</style>
