import Vue from 'vue';
import Vuex from 'vuex';
import Service from './service'
import { TicketPost } from './service/ServiceType';
var service = new Service();
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ticketsPost:{
      tickets:[],
      lockedSeat:[],
      totalInfo:{
        totalTickets:0,
        totalPrice:0
      }
    }
  },
  mutations: {
    updateTickets(state,tickets){
      state.ticketsPost.tickets = tickets;
    },
    updateTotalInfo(state,totalInfo){
      state.ticketsPost.totalInfo = totalInfo;
    },
    updateLockedSeat(state,lockedSeat){
      state.ticketsPost.lockedSeat = lockedSeat;
    }

  },
  actions: {
    ticketsPageConfirm(state,confirmData:{tickets:[],totalInfo:{}}){
      state.commit('updateTickets',confirmData.tickets);
      state.commit('updateTotalInfo',confirmData.totalInfo);
    },
    seatsPageConfirm(state,confirmData:[]){
      state.commit('updateLockedSeat',confirmData);
    },
    async postData(state){
      
      let {error,value} = TicketPost.validate((<any>state.state.ticketsPost)as TicketPost);
      if(error)return {
        success:false,
        msg:error
      }
      return await service.postInfo(value);
    }
  },
});
