<template lang="pug">
    .container-question
        .wrapper
            .question(v-for='(ques,idx) in questions.q',:key="idx")
                .cell
                    .title {{ques.title}}
                .cell
                    input(v-if='ques.type==="text"',v-model="questions.a[idx].answer",:placeholder="ques.description").answer-input
                    .radios(v-else-if='ques.type==="radio"')
                        el-radio(v-for='(option,i) in ques.optionList',v-model="questions.a[idx].answer",:label="option") {{option}}
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import {
    TicketQuestion,
    TicketPostQuestion,
    TicketModule,
    TicketPostModule
} from '../service/ServiceType'

@Component({ name: 'TicketQuestionComp' })
export default class TicketQuestionComponent extends Vue {
    @Prop({
        type: Object,
        required: true
    })
    questions!: {q:TicketQuestion[],a:TicketPostQuestion[]}
}
</script>
<style lang="scss" scoped>
.container-question {
    width: 100%;
    background-color:white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 24px;
    .cell {
        box-sizing: border-box;
        width: 100%;
        padding: 0 15px;
    }
    .title {
        font-size: 16px;
        font-weight: 600;
        color: black;
        margin-bottom: 10px;
    }
    .radios,.answer-input{
        margin-bottom: 24px;
    }
    .answer-input{
        width: 100%;
        height: 42px;
        border-radius: 5px;
        border:1px solid rgb(214, 214, 214);
        padding-left: 12px;
       
        box-sizing: border-box;
    }
}
</style>