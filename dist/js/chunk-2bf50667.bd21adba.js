(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2bf50667"],{"03c4":function(e,t,a){"use strict";a("5c12")},"5c12":function(e,t,a){},8489:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"sale-form",attrs:{id:"form"}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full mb-base",staticStyle:{margin:"0 auto"}},[a("vx-card",{attrs:{title:""}},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col lg:w-1/2 sm:w-1/2"},[a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col lg:w-1/2 sm:w-1/2 mb-6"},[a("v-select",{attrs:{options:e.contactMode,placeholder:"Please Select Result Measurement"},model:{value:e.result_mesurement,callback:function(t){e.result_mesurement=t},expression:"result_mesurement"}})],1)]),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col lg:w-1/2 sm:w-1/2 mb-6"},[a("vs-input",{directives:[{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"},{name:"validate-on",rawName:"v-validate-on",value:e.blur,expression:"blur"}],staticClass:"mt-1 w-full",attrs:{"data-v":"",name:"result","label-placeholder":"Result"},model:{value:e.result,callback:function(t){e.result=t},expression:"result"}}),a("span",{staticClass:"text-danger text-sm"},[e._v(e._s(e.errors.first("result")))])],1)]),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col lg:w-1/2 sm:w-1/2 mb-6"},[a("flat-pickr",{attrs:{config:e.configdateTimePicker,placeholder:"Result Date"},model:{value:e.next.contact,callback:function(t){e.$set(e.next,"contact",t)},expression:"next.contact"}})],1)]),a("div",{staticClass:"vx-row"},[a("div",{staticClass:"vx-col w-full"},[a("vs-button",{staticClass:"mr-3 mb-2",attrs:{id:"button-save"},on:{click:function(t){return e.saveData()}}},[e._v("Save\n                                ")])],1)])])])])],1)])])},l=[],c=a("9d63"),n=a.n(c),r=a("59ca"),o=a.n(r),i=a("4a7a"),u=a.n(i),m=a("c1df"),d=a.n(m),v=a("ae2e"),f=a.n(v),b=a("7891"),x=a("41cb"),w=a("c38f"),h=a.n(w);a("0952");a("e71f");var p={data:function(){return{settings:{maxScrollbarLength:60,wheelSpeed:.6},datetime:null,configdateTimePicker:{enableTime:!1,dateFormat:"m-d-Y"},next_contact:[],last_contact:[],options:[],contactLogs:[],comments:[],status:[],source:[],trainer_category:[],form:{regions:[]},last:{contact:[]},next:{contact:[]},contactMode:[{label:"Weight",value:"weight"},{label:"Waist",value:"waist"},{label:"Thigh",value:"thigh"},{label:"Arm",value:"arm"},{label:"Chest",value:"chest"},{label:"Fat",value:"fat"}],leadSource:{},selected:{name:null,id:null},result_mesurement:"",result:"",contact_mode:"",lead_source:"",lead_status:""}},computed:{},methods:{customFormatter:function(e){return""!=e?d()(e).format("MMMM Do YYYY"):""},prueba:function(){console.log("prueba de focsu")},saveData:function(){var e=this;this.$validator.validateAll().then((function(t){if(t){var a={result:e.result?e.result:"",result_mesurement:e.result_mesurement["value"]?e.result_mesurement["value"]:"",user_id:localStorage.getItem("uid"),result_date:e.next.contact?e.next.contact:"",createdAt:o.a.firestore.FieldValue.serverTimestamp()};o.a.firestore().collection("measurement").add(a).then((function(){x["a"].push({name:"memberStat"}),e.$vs.notify({title:"measurement Created Successfully!",text:"",iconPack:"feather",icon:"icon-check",color:"success"})}),(function(t){e.$vs.notify({title:"Error",text:t.message,iconPack:"feather",icon:"icon-alert-circle",color:"danger"})}))}}))},loadContent:function(){var e=this;this.$vs.loading(),setTimeout((function(){e.$vs.loading.close()}),3e3)}},components:{flatPickr:h.a,"v-select":u.a,VuePerfectScrollbar:n.a,Dropdown:f.a,datetime:b["a"],moment:d.a},created:function(){}},g=p,_=(a("03c4"),a("2877")),C=Object(_["a"])(g,s,l,!1,null,null,null);t["default"]=C.exports}}]);
//# sourceMappingURL=chunk-2bf50667.bd21adba.js.map