<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Service from '@/service'
import {Ticket} from '@/service/ServiceType'
import SeatsRender from '@/components/SeatsRenderComponent.vue';
var service = new Service();
(async ()=>{
  var tickets = await service.getTickets();
  console.log(tickets);
  for(var key in tickets){
    var {error,value} = Ticket.validate(tickets[key]);
    if(error)throw error;
    console.log(value);
  }
})()
@Component({
  components: {
    HelloWorld,
    SeatsRender
  },
})
export default class Home extends Vue {}
</script>
