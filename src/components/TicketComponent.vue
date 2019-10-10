<template lang="pug">
    .container-ticket
        .left.info
            .cell
                .text.title {{ticket.title}}
            .cell
                .text.desc {{ticket.description}}
            .cell
                .price
                    .int {{Math.floor(ticket.price)}}
                    .dot .
                    .dec {{((ticket.price.toFixed(2)-Math.floor(ticket.price))*100).toFixed(0)}}
                    .cur 元
                    .only {{ticket.remainingQuantity<5?'仅剩 '+ticket.remainingQuantity+" 张":''}}
        .right
            NumberInput(v-model="count",:max="ticket.remainingQuantity").input
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import NumberInput from './NumberInput.vue'
import { Ticket } from '../service/ServiceType'
@Component({ name: 'TicketComp', components: { NumberInput } })
export default class TicketComponent extends Vue {
    @Prop({
        type: Object,
        required: true
    })
    ticket!: Ticket
    @Prop({
        type: Number,
        default: 0
    })
    value!: number
    count: number = 0
    @Watch('count')
    CountChange(nval: any) {
        let nNum = Number(nval)
        if (Number.isNaN(nNum)) return
        this.$emit('input', nval)
    }
    @Watch('value')
    ValueChange(nval: any) {
        let nNum = Number(nval)
        if (Number.isNaN(nNum)) return
        this.count = nval
    }
}
</script>
<style lang="scss" scoped>
$button-color-active: rgb(25, 186, 255);
.container-ticket {
    width: 100%;
    background-color: white;
    .left,
    .right {
        display: inline-block;
        width: 50%;
        vertical-align: middle;
        .cell {
            margin: 5px 0;
            padding-left: 15px;
            text-align: left;
            .text {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .title {
                font-size: 18px;
                font-weight: 800;
                color: black;
            }
            .desc {
                font-size: 12px;
                color: rgb(184, 184, 184);
            }
            .price {
                * {
                    display: inline-block;
                    color: $button-color-active;
                    font-size: 14px;
                }
                .int {
                    font-size: 16px;
                }
            }
            .only {
                margin: 0 5px;
                color: rgb(234, 109, 109);
            }
        }
    }
    .right {
        &:before {
            content: '';
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;
        }
        text-align: center;
        padding: 0 15px;
        box-sizing: border-box;
    }
    .input {
        vertical-align: middle;
        height: 35px;
    }
}
</style>