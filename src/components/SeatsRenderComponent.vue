<template lang="pug">
    .container-seat-render
        .side.left
            .cell(v-for="(hSeat,i) in seats" :key="i")
                span.col
                    span {{i}}
        .side.right
            .cell(v-for="(hSeat,i) in seats" :key="i")
                Seat(v-for='(seat,i) in hSeat' :style='{width:1/hSeat.length*100+"%",padding:"0 5px"}' :key="i" :seat="seat")


</template>
<script lang="ts">
import {Vue,Component, Prop} from 'vue-property-decorator';
import SeatComp from './SeatComponent.vue'
import {Seat} from '../service/ServiceType'
import Service from '../service'
@Component({
    name:'SeatsRender',
    components:{Seat:SeatComp}
})
export default class SeatsRenderComponent extends Vue{
    @Prop({
        type:Array,
        default:()=>{
            return [];
        }
    })
    seats!:Seat[][]
    async mounted(){

    }
}
</script>
<style lang="scss" scoped>
$left-sideWidth:16px;
.container-seat-render{
    width: 100%;
    box-sizing: border-box;
    display: flex;
}
.side{
    &.left{
        width: $left-sideWidth;
        margin-left: 10px;
        margin-right: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .col{
            border: 1px solid;
            border-radius: 50%;
            width: $left-sideWidth;
            height: $left-sideWidth;
            display: inline-block;
            vertical-align: top;
            color: rgb(189, 189, 189);
            span{
                display: block;
                height: $left-sideWidth;
                line-height: $left-sideWidth;
                text-align: center;
                color: rgb(113, 113, 113);
            }
        }
    }
    &.right{
        flex-grow: 1;
    }
    .cell{
        width: 100%;
        margin: 10px 0;
    }
    
}
</style>