import Vue from 'vue'
import {AclInstaller, AclCreate, AclRule} from 'vue-acl'
import router from '@/router'
Vue.use(AclInstaller)
//******* Roles are assign according to user login*******

var initialRole;
initialRole = 'admin'
if (localStorage.getItem('userRole')) {
    initialRole = localStorage.getItem('userRole')
    console.log('Role changed to ' + initialRole)
}

if (localStorage.getItem('userRole') != null && localStorage.getItem('uid') == null) {
    localStorage.removeItem('userRole');
    initialRole = 'admin'
}

export default new AclCreate({
    initial: initialRole,
    notfound: '/pages/not-authorized',
    router,
    acceptLocalRules: true,
    globalRules: {
        admin: new AclRule('admin').generate(),
        trainer: new AclRule('trainer').generate(),
        member_trainer: new AclRule('trainer').or('member').generate(),
        member: new AclRule('member').generate(),
        sale: new AclRule('sale').generate(),
        admin_sale: new AclRule('sale').or('admin').generate(),
        editor: new AclRule('trainer').or('admin').generate(),
        public: new AclRule('public').or('admin').or('trainer').or('member').or('sale').generate(),
        member_trainer_admin_sale: new AclRule('admin').or('trainer').or('member').or('sale').generate(),
    }
})
