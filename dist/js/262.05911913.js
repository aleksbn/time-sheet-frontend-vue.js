"use strict";(self["webpackChunktime_sheet_spa"]=self["webpackChunktime_sheet_spa"]||[]).push([[262],{1431:function(e,t,a){a.r(t),a.d(t,{default:function(){return I}});var l=a(3396),r=a(2268);const s=e=>((0,l.dD)("data-v-19adc132"),e=e(),(0,l.Cn)(),e),i={class:"form-control"},n=s((()=>(0,l._)("label",{for:"ID"},"ID:",-1))),u={class:"form-control"},o=s((()=>(0,l._)("label",{for:"firstName"},"First name:",-1))),m={class:"form-control"},p=s((()=>(0,l._)("label",{for:"lastName"},"Last name:",-1))),d={class:"form-control"},c=s((()=>(0,l._)("label",{for:"department"},"Department:",-1))),f={class:"form-control"},g=s((()=>(0,l._)("label",{for:"hourlyRate"},"Hourly rate:",-1))),_=s((()=>(0,l._)("br",null,null,-1))),h=s((()=>(0,l._)("br",null,null,-1))),b={style:{"text-align":"center"}},v={class:"form-control"},N=s((()=>(0,l._)("label",null,[(0,l.Uk)("Page number "),(0,l._)("span",{style:{margin:"0 20px"}},"/"),(0,l.Uk)(" Page size")],-1))),y=["value"],F={class:"form-control"},z=["value"];function S(e,t,a,s,S,w){const k=(0,l.up)("base-card");return(0,l.wg)(),(0,l.j4)(k,null,{default:(0,l.w5)((()=>[(0,l._)("form",null,[(0,l._)("div",i,[n,(0,l._)("input",{type:"text",name:"id",id:"id",onInput:t[0]||(t[0]=(...e)=>w.setFilter&&w.setFilter(...e))},null,32)]),(0,l._)("div",u,[o,(0,l._)("input",{type:"text",name:"firstName",id:"firstName",onInput:t[1]||(t[1]=(...e)=>w.setFilter&&w.setFilter(...e))},null,32)]),(0,l._)("div",m,[p,(0,l._)("input",{type:"text",name:"lastName",id:"lastName",onInput:t[2]||(t[2]=(...e)=>w.setFilter&&w.setFilter(...e))},null,32)]),(0,l._)("div",d,[c,(0,l._)("input",{type:"text",name:"department",id:"department",onInput:t[3]||(t[3]=(...e)=>w.setFilter&&w.setFilter(...e))},null,32)]),(0,l._)("div",f,[g,(0,l._)("input",{type:"number",name:"hourlyRate",id:"hourlyRate",value:"0",min:"0",onChange:t[4]||(t[4]=(...e)=>w.setFilter&&w.setFilter(...e))},null,32)]),_,h,(0,l._)("div",b,[(0,l._)("div",v,[N,(0,l._)("select",{name:"pageNumber",id:"pageNumber",onChange:t[5]||(t[5]=(...e)=>w.setFilter&&w.setFilter(...e))},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(w.pageSizeNumbers,(e=>((0,l.wg)(),(0,l.iD)("option",{key:e,value:e},(0,r.zw)(e+1),9,y)))),128))],32)]),(0,l.Uk)(" / "),(0,l._)("div",F,[(0,l._)("select",{name:"pageSize",id:"pageSize",onChange:t[6]||(t[6]=(...e)=>w.setFilter&&w.setFilter(...e))},[((0,l.wg)(!0),(0,l.iD)(l.HY,null,(0,l.Ko)(S.pageSize,(e=>((0,l.wg)(),(0,l.iD)("option",{key:e,value:e},(0,r.zw)(e),9,z)))),128))],32)])])])])),_:1})}a(7658);var w={emits:["change-filter"],data(){return{pageNumbers:[],pageSize:[10,20,50,100],numberOfRecords:0,filters:{id:"",firstName:"",lastName:"",department:"",hourlyRate:0,pageNumber:0,pageSize:10}}},computed:{pageSizeNumbers(){return this.pageNumbers}},async created(){this.numberOfRecords=await this.$store.getters["employees/numberOfEmployees"],this.loadSelect()},methods:{setFilter(e){const t=e.target.id;var a=e.target.value;"hourlyRate"===t&&""===a&&(a=0),"pageSize"!==t&&"pageNumber"!==t||(a=parseInt(a));const l={...this.filters,[t]:a};"pageSize"===t&&(this.filters.pageNumber=0),this.filters=l,this.$emit("change-filter",this.filters)},loadSelect(){this.pageNumbers=[];for(let e=0;e<this.numberOfRecords;e+=this.filters.pageSize)this.pageNumbers.push(e/this.filters.pageSize)}}},k=a(89);const D=(0,k.Z)(w,[["render",S],["__scopeId","data-v-19adc132"]]);var I=D}}]);
//# sourceMappingURL=262.05911913.js.map