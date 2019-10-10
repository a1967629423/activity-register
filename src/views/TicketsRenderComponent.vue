<template lang="pug">
    .container-tickets-render
        .content
            .cell-bar
                span 选择票种
            .tickets
                TicketComp(v-for='(item,i) in tickets' :key="item.id" :ticket="item" v-model="selectCountMap[i].count").ticket-comp
            
            .ticket-questions.base
                .cell-bar 购票人信息
                TicketQuesitonComp(:questions="{q:baseInfoQuestion,a:baseInfoAnswer}")
            .ticket-modules(v-for='(qticket,idx) in ticketQuestions' :key="idx")
                .module(v-for='(m,j) in qticket.ticket.modules' :key="j")
                    .cell-bar {{`${m.title} ("${qticket.ticket.title}" 票第 ${qticket.i+1} 位)}`}}
                    TicketQuesitonComp(:questions="{q:m.questionList,a:qticket.modules[j].questionList}")
        .container-totalPlan
            .wrapper-totalPlan
                .left
                    .total-tickets
                        span 共
                        span.num {{` ${sum} `}}
                        span 张票
                    .total-price
                        span 合计
                        span.num 
                            span.int {{' '+Math.floor(totalpirce)}}
                            span .
                            span.dec {{((totalpirce.toFixed(2)-Math.floor(totalpirce))*100).toFixed(0)+' '}}
                        span 元
                .right
                    button.pay(@click="confirm") 立即支付
        

</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import TicketComp from '@/components/TicketComponent.vue'
import TicketQuesitonComp from '@/components/TicketQuestionComponent.vue'
import { Ticket, TicketPost, TicketPostModule, TicketPostTickets, TicketPostQuestion, TicketQuestion } from '../service/ServiceType'
import Service from '../service'
@Component({
    name: 'TicketsRender',
    components: { TicketComp, TicketQuesitonComp }
})
export default class TicketsRenderComponent extends Vue {
    tickets: Ticket[] = []
    selectResult!: TicketPost
    selectCountMap: { id: number; count: number }[] = []
    baseInfoQuestion:TicketQuestion[] = []
    baseInfoAnswer:{title:string,answer:string}[] = []

    ticketQuestions: {
        ticket: Ticket
        modules: TicketPostModule[]
        i: number
        l: number
    }[] = []

    sum: number = 0
    totalpirce: number = 0
    @Watch('selectCountMap', { deep: true })
    selectCountMapChange(nval: { id: number; count: number }[]) {
        let sum = 0
        let totalpirce = 0
        let ticketQuestions: {
            ticket: Ticket
            modules: TicketPostModule[]
            i: number
            l: number
        }[] = []
        nval.forEach(v => {
            if (v.count > 0) {
                let ticket: Ticket = this.tickets.find(
                    t => t.id === v.id
                ) as Ticket

                for (let i = 0; i < v.count; i++) {
                    let modules: TicketPostModule[] = []
                    if (ticket.type === 'moreinfo') {
                        ticket.modules.forEach(t => {
                            let questionList = (() => {
                                return t.questionList.map(q => {
                                    return {
                                        title: q.title,
                                        answer: ''
                                    }
                                })
                            })()
                            modules.push({ id: t.id, questionList })
                        })
                    }

                    ticketQuestions.push({
                        ticket,
                        modules,
                        i,
                        l: v.count
                    })
                }
                sum += v.count
                totalpirce += ticket.price * v.count
            }
            
        })
        this.ticketQuestions = ticketQuestions
        this.sum = sum
        this.totalpirce = totalpirce
        this.$forceUpdate()
    }
    async confirm(){
        let tickets:TicketPostTickets[] = []
        this.ticketQuestions.forEach(v=>{
            let baseInfos:TicketPostQuestion[] = v.ticket.baseInfos.map(b=>{
                let answer = this.baseInfoAnswer.find(bia=>bia.title === b.title)
                let baseInfo:TicketPostQuestion = {
                    title:b.title,
                    answer:answer?answer.answer:''
                } 
                return baseInfo;
            })
            tickets.push({
                id:v.ticket.id,
                type:v.ticket.type,
                moduleInfos:v.modules,
                baseInfos
            })
        })
        this.$store.dispatch('ticketsPageConfirm',{
            tickets,
            totalInfo:{
                totalTickets:this.sum,
                totalPrice:this.totalpirce
            }
        })
        let result = await this.$store.dispatch('postData')
        if(result.success){
            this.$notify({title:'提交成功',message:'您成功提交了订单',type:'success'});
        }else{
            console.log(result)
            this.$notify.error({
                title:'提交失败',
                message:result.msg
            })
        }
    }
    async mounted() {
        let service = new Service()
        const loading = this.$loading({
            lock:true,
            text:'数据加载中',
            spinner:'el-icon-loading',
            background:'rgba(0,0,0,0.6)'
        })
        let tickets = await service.getTickets()
        loading.close();
        this.selectCountMap = []
        this.baseInfoQuestion = [];
        this.baseInfoAnswer = [];
        tickets.forEach(v => {
            this.selectCountMap.push({ id: v.id, count: 0 });
            v.baseInfos.forEach(bi=>{
                let biq = this.baseInfoQuestion.find(biq=>bi.title===biq.title);
                if(!biq){
                    this.baseInfoQuestion.push({
                        ...bi
                    });
                    this.baseInfoAnswer.push({title:bi.title,answer:''});
                }
            })
        })
        

        this.tickets = tickets
        this.$forceUpdate()
    }
}
</script>
<style lang="scss" scoped>
.container-tickets-render {
    
    width: 100%;
    background-color: rgb(242, 242, 242);
    text-align: left;
    .cell-bar {
        text-align: left;
        padding-left: 15px;
        height: 45px;
        background-color: rgb(242, 242, 242);
        line-height: 45px;
        color: rgb(117, 117, 117);
        font-size: 14px;
    }
    .tickets {
        .ticket-comp {
            position: relative;
            &:after {
                content: '';
                width: 90%;
                position: absolute;
                height: 2px;
                background-color: rgb(242, 242, 242);
                display: inline-block;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: 0;
            }
        }
    }
    .content {
        padding-bottom: 60px;
        min-height: 100vh;
        box-sizing: border-box;
    }

    .container-totalPlan {
        position: relative;
        height: auto;
        min-height: 100%;
        pointer-events: none;
        .wrapper-totalPlan {
            background-color: white;
            width: 100%;
            bottom: 0;
            left: 0;
            position: absolute;
            display: flex;
            height: 50px;
            .right {
                pointer-events: all;
                text-align: center;
                width: 220px;
                &:before {
                    content: '';
                    height: 100%;
                    width: 0;
                    display: inline-block;
                    vertical-align: middle;
                }
                .pay {
                    border: 1px outset;
                    background-color: rgb(22, 185, 255);
                    color: white;
                    width: 80%;
                    height: 80%;
                    border-radius: 5px;
                    vertical-align: middle;
                }
            }
            .left {
                padding: 0 15px;
                flex-grow: 1;
                font-size: 14px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .num {
                    color: rgb(28, 187, 255);
                    .int {
                        font-size: 16px;
                    }
                }
            }
        }
    }
}
</style>