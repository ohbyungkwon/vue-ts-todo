import { StoreNamespace } from "@/enums/StoreNamespace";
import Login from "@/store/modules/Login";
import Vue from "vue"
import Component from "vue-class-component";
import { Action, Mutation } from "vuex-class";

@Component({
    name: 'RootBase'
})
export default class RootBase extends Vue {
    @Mutation('setLoading') protected setLoading!: (isShowLoading: boolean) => void;

    @Action('doLogin', { namespace: StoreNamespace.LOGIN }) protected doLogin!:(loginVo:{}) => any;
  
    beforeCreate(){
        const isAlreadyHas = this.$store.hasModule(StoreNamespace.LOGIN);
        if(!isAlreadyHas)
            this.$store.registerModule(StoreNamespace.LOGIN, Login);
    }
  
    beforeDestroy(){
        this.$store.unregisterModule(StoreNamespace.LOGIN);
    }
}