<template lang="pug">
    .container(@click="seatClick")
        .wrapper
            .box-bottom(:class='seat.status')
            .box-top(:class='seat.status')
                i.fa(:class='iconMap[seat.status]?iconMap[seat.status]:""')
        
</template>
<script lang="ts">
import {Vue,Component, Prop} from 'vue-property-decorator'
import { Seat } from '../service/ServiceType';

@Component({name:'Seat'})
export default class SeatComponent extends Vue{
    @Prop({
        type:Object,
    })
    seat!:Seat;
    iconMap = {
        enable:'',
        lock:'fa-check',
        used:'fa-close'
    }
    seatClick(){
        switch(this.seat.status){
            case 'enable':
                this.seat.status = 'lock'
                break;
            case 'lock':
                this.seat.status = 'enable'
                break;
            case 'used':
                break;
        }
    }

}
</script>
<style lang="scss" scoped>
$enable-border:rgb(155, 196, 151);
$enable-background:rgb(215, 242, 223);
$lock-border:rgb(47, 145, 186);
$lock-background:rgb(185, 234, 255);
$used-border:rgb(255,145,145);
$used-background:rgb(255,227,227);
.container{
    width: 100%;
    height: 100%;
    position: relative;
    transition: .3s all ease-in-out;
    display: inline-block;
    padding: 3px;
    box-sizing: border-box;
    &:before{
        content: '';
        height: 100%;
        vertical-align: middle;
        width: 0;
        display: inline-block;
    }
}
.wrapper{
    width: 100%;
    padding-bottom: 100%;
    position: relative;
    display: inline-block;
    vertical-align: middle;
    transition: inherit;
}
.box-top{
    transition: inherit;
    position: absolute;
    top: 0;
    width: 70%;
    height: 70%;
    transform: translate(-50%,0);
    border-radius: 20%;
    border:3px solid; 
    display: inline-block;
    box-sizing: border-box;
    background-color: white;
    &.enable{
        border-color:$enable-border;
        i{
            color: $enable-border;
        }
    }
    &.lock{
        border-color:$lock-border;
        i{
            color:$lock-border;
        }

    }
    &.used{
        border-color: $used-border;
        i{
            color: $used-border;
        }
    }
    i{
        font-size: 16px;
        transition: inherit;
        
    }
    &:before{
        content: '';
        display: inline-block;
        height: 100%;
        width: 0;
        vertical-align: middle;
    }
}
.box-bottom{
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 80%;
    border:3px solid;
    transition: inherit;
    &.enable{
        border-color:$enable-border;
        background-color: $enable-background;
    }
    &.lock{
        border-color: $lock-border;
        background-color: $lock-background;
    }
    &.used{
        border-color: $used-border;
        background-color: $used-background;
    }
    border-radius: 20%;
    box-sizing: border-box;
}

</style>