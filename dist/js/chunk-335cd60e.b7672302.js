(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-335cd60e"],{"038a":function(t,e,a){},"7cb2":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("vx-card",[a("vs-table",{attrs:{pagination:"","max-items":"25",stripe:"",search:"",data:t.Interests},scopedSlots:t._u([{key:"default",fn:function(e){var r=e.data;return t._l(r,(function(e,s){return a("vs-tr",{key:s,attrs:{data:e}},[a("vs-td",{attrs:{data:r[s].data.title}},[t._v("\n                    "+t._s(r[s].data.title)+"\n                ")]),a("vs-td",[a("div",{staticClass:"p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-primary edit",on:{click:function(a){t.editInterest(e.uid),t.addNewFlag=!0,t.interestUID=e.uid}}},[a("span",{staticClass:"ml-2 text-base text-primary"},[a("feather-icon",{attrs:{icon:"EditIcon",svgClasses:"h-5 w-5"}})],1)]),a("span",[a("a",{staticClass:"p-2 mb-2 rounded-lg cursor-pointer flex items-center justify-between text-sm font-medium text-base text-danger trash",attrs:{button:""},on:{click:function(a){return t.deleteInterest(e.uid,r[s].data.title)}}},[a("feather-icon",{attrs:{icon:"TrashIcon",svgClasses:"h-5 w-5"}})],1)])])],1)}))}}])},[a("div",{staticClass:"vs-lg-12",attrs:{slot:"header"},slot:"header"},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col xs:w-full md:w-1/3lg:w-1/3  sm:w-1/3 mb-6"},[a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"w-full no-icon-border",attrs:{"data-vv-validate-on":"blur",name:"title","label-placeholder":"Title"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),a("span",{staticClass:"text-danger text-sm"},[t._v(t._s(t.errors.first("title")))])],1),a("div",{staticClass:"vx-col"},[t.addNewFlag?t._e():a("button",{staticClass:"button-save p-3 mb-10 mr-4 rounded-lg vs-align-center cursor-pointer text-lg font-medium text-base text-primary border border-solid border-primary save",on:{click:function(e){return t.saveInterest()}}},[a("span",{staticClass:"ml-2 text-base text-primary"},[t._v("Save")])]),t.addNewFlag?a("button",{staticClass:"button-save p-3 mb-10 mr-4 rounded-lg vs-align-center cursor-pointer text-lg font-medium text-base text-primary border border-solid border-primary save",on:{click:function(e){return t.updateInterest()}}},[a("span",{staticClass:"ml-2 text-base text-primary"},[t._v("Edit")])]):t._e(),a("button",{staticClass:"p-3 mb-10 mr-4 rounded-lg vs-align-center cursor-pointer text-lg font-medium text-base text-primary border border-solid border-primary save",on:{click:t.clearFields}},[a("span",{staticClass:"ml-2 text-base text-primary"},[t._v("Cancel")])])])])]),a("template",{slot:"thead"},[a("vs-th",{attrs:{"sort-key":"title"}},[t._v("Title")]),a("vs-th",{attrs:{"sort-key":"action"}},[t._v("Actions")])],1)],2)],1)},s=[],n=(a("ac6a"),a("59ca")),i=a.n(n);a("ea7b");a("e71f");var o={components:{},data:function(){return{title:"",Interests:[],addNewDataSidebar:!1,interestUID:"",addNewFlag:!1}},computed:{},methods:{clearFields:function(){this.title="",this.tenure=""},loadContent:function(){var t=this;this.$vs.loading({background:this.backgroundLoading,color:this.colorLoading,container:".button-save",scale:.45}),setTimeout((function(){t.$vs.loading.close(".button-save > .con-vs-loading")}),2e3)},popupClose:function(){this.addNewDataSidebar=!1,this.getInterests()},getInterests:function(){var t=this;i.a.firestore().collection("trainer-category").orderBy("createdAt","desc").get().then((function(e){t.Interests=[],e.forEach((function(e){var a={uid:e.id,data:e.data(),title:e.data().title};t.Interests.push(a)}))}))},saveInterest:function(){var t=this;this.$validator.validateAll().then((function(e){if(e){t.loadContent();var a={title:t.title?t.title:"",createdAt:i.a.firestore.FieldValue.serverTimestamp()};i.a.firestore().collection("trainer-category").add(a).then((function(){t.getInterests(),t.title="",t.$vs.notify({title:"Interest Created",text:"Successfully Created!",iconPack:"feather",icon:"icon-check",color:"success"})}),(function(e){t.$vs.notify({title:"Error",text:e.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"})}))}}))},deleteInterest:function(t,e){var a=this,r=e;i.a.firestore().collection("trainer-category").doc(t).delete().then((function(){a.getInterests(),console.log("Successfully Deleted the record"),a.$vs.notify({title:"",text:r+" Deleted!!",iconPack:"feather",icon:"icon-alert-circle",color:"danger"}),a.addNewFlag=!1,a.title=""})).catch((function(t){console.error("There was an error deleting the record: "+t)}))},editInterest:function(t){var e=this;i.a.firestore().collection("trainer-category").doc(t).get().then((function(t){var a=t.data();e.title=a.title}))},updateInterest:function(){var t=this;this.$validator.validateAll().then((function(e){e&&i.a.firestore().collection("trainer-category").doc(t.interestUID).get().then((function(e){return e.ref.update({title:t.title})})).then((function(){t.addNewFlag=!1,t.$vs.notify({title:t.title+" updated!!",text:"Successfully Update!",iconPack:"feather",icon:"icon-check",color:"success"}),t.getInterests(),t.title=""})).catch((function(t){console.error("There was an error editing the record: "+t)}))}))}},created:function(){this.getInterests()}},c=o,l=(a("b074"),a("2877")),d=Object(l["a"])(c,r,s,!1,null,null,null);e["default"]=d.exports},b074:function(t,e,a){"use strict";a("038a")}}]);
//# sourceMappingURL=chunk-335cd60e.b7672302.js.map