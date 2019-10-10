<template lang="pug">
    .container-numberinput
        .left(@click="sub",:class="{disable:!subStatus}")
            span.fa.fa-minus
        .center
            input(v-model="innerValue" type='number')
        .right(@click="add",:class="{disable:!addStatus}")
            span.fa.fa-plus
</template>
<script lang="ts">
import {Vue,Component, Prop, Watch} from 'vue-property-decorator'

@Component({name:'NumberInput'})
export default class NumberInput extends Vue{
    @Prop({type:Number,default:0})
    value!:number
    @Prop({type:Number,default:0})
    min!:number
    @Prop({type:Number,default:Infinity})
    max!:number
    @Prop({type:Function,default:()=>{}})
    onMax!:()=>void
    @Prop({type:Function,default:()=>{}})
    onMin!:()=>void
    innerValue:number = 0;
    addStatus:boolean = true;
    subStatus:boolean = true;
    mounted(){
        this.updateButtonStatus();
    }
    updateButtonStatus(){
        if(this.innerValue>=this.max){
            this.onMax();
            this.addStatus = false;
        } else if(this.innerValue<=this.min){
            this.onMin();
            this.subStatus = false;
        }else {
            this.addStatus = true;
            this.subStatus = true;
        }
    }
    add(){
        if(this.addStatus)this.innerValue++;
        this.updateButtonStatus();
    }
    sub(){
        if(this.subStatus)this.innerValue--;
        this.updateButtonStatus();
    }
    @Watch('value')
    valueChange(val:number){
        if(this.min<val&&val<this.max)
        {
            this.innerValue = val;
        }
    }
    
    @Watch('innerValue')
    innerValueChange(val:number){
        let newVal = Number(val);
        if(Number.isNaN(newVal))return;
        this.$emit('input',newVal);
        this.updateButtonStatus();
    }
}
</script>
<style lang="scss" scoped>
$button-color-base:rgb(251,251,251);
$button-color-active:rgb(25,186,255);
$button-color-disable:rgb(203,203,203);
.container-numberinput{
    display: inline-block;
    border-radius: 3px;
    border:1px solid rgb(212, 212, 212);
    overflow: hidden;
    &:hover{
        border-color:$button-color-active;
    }
    .right,.left{
        text-align: center;
        display: inline-block;
        position: relative;
        width: 33.333%;
        height: 100%;
        background-color: $button-color-base;
        vertical-align: top;
        cursor: pointer;
        pointer-events: all;
        span{
            color: $button-color-active;
            vertical-align: middle;

        }
        &:before{
            content: "";
            display: inline-block;
            height: 100%;
            width: 0;
            vertical-align: middle;   
        }
        &.disable{
            span{
                color:$button-color-disable;
            }
            
            cursor:not-allowed; 
        }
    }
    .left:after{
        content: "";
        position: absolute;
        right: 0;
        width: 1px;
        top:0;
        height: 100%;
        background-color: rgb(212, 212, 212);
    }
    .right:after{
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        top:0;
        height: 100%;
        background-color: rgb(212, 212, 212);
    }
    .center{
        display: inline-block;
        width: 33.333%;
        height: 100%;
        input{
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            border:0px;
            height: 100%;
            background-color:$button-color-base;
            color: rgb(40, 40, 40);
            font-size: 18px;
            font-weight: 600;
        }
    }
}
</style>