import{C as _}from"./CommonHeader-a8bbfa0e.js";import{d as m,j as f,k as y,c as g,m as h,f as c,N as v,g as x,o as a,s as I,_ as A}from"./index-6ebd5fd7.js";import{g as V}from"./address-c72b5d82.js";const k={class:"address"},N=m({__name:"index",setup(q){const u=v(),t=I(),s=f({chosenAddressId:"1",list:[],from:u.query.from??""}),i=(d,e)=>{console.log(d,e),t.push({path:"/create-order",query:{addressId:d.id}})},r=()=>{t.push({path:"/address-edit",query:{type:"add"}})},n=(d,e)=>{console.log(d,e),t.push({path:"/address-edit",query:{type:"edit",addressId:d.id}})},p=async()=>{const{data:{data:d}}=await V();if(d.length===0){s.list=[];return}s.list=d.map(e=>({id:e.addressId,name:e.userName,tel:e.userPhone,address:`${e.provinceName} ${e.cityName} ${e.regionName} ${e.detailAddress}`,isDefault:!!e.defaultFlag}))};return y(()=>{p()}),(d,e)=>{const l=x("van-address-list");return a(),g("div",k,[h(_,{title:"地址管理"}),s.from==="create-order"?(a(),c(l,{key:0,modelValue:s.chosenAddressId,"onUpdate:modelValue":e[0]||(e[0]=o=>s.chosenAddressId=o),list:s.list,"default-tag-text":"默认",onAdd:r,onEdit:n,onSelect:i},null,8,["modelValue","list"])):(a(),c(l,{key:1,modelValue:s.chosenAddressId,"onUpdate:modelValue":e[1]||(e[1]=o=>s.chosenAddressId=o),list:s.list,"default-tag-text":"默认",onAdd:r,onEdit:n},null,8,["modelValue","list"]))])}}});const E=A(N,[["__scopeId","data-v-76319ea2"]]);export{E as default};