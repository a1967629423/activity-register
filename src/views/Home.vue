<template>
  <div class="home">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
// (async ()=>{
//   var tickets = await service.getTickets();
//   console.log(tickets);
//   for(var key in tickets){
//     var {error,value} = Ticket.validate(tickets[key]);
//     if(error)throw error;
//     console.log(value);
//   }
// })()
@Component({
  components: {
  },
})
export default class Home extends Vue {
}
</script>
