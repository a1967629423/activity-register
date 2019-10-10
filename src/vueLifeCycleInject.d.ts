import Vue from 'vue'
declare module 'vue/types/vue'{
    interface Vue
    {
        /**
         * when component is will be created to call
         */
        beforeCreate():void
        /**
         * when component is created to call
         */
        created():void
        beforeMount():void
        mounted():void
        beforeUpdate():void
        updated():void
        beforeDestroy():void
        destroyed():void
        /**
         * for keep-alive, when component is actived to call
         */
        activated():void
        /**
         * for keep-alive, when component is removed to call
         */
        deactivated():void
    }
}