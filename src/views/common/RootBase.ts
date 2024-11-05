import Vue from "vue"
import Component from "vue-class-component";
import { Mutation } from "vuex-class";

@Component({
    name: 'RootBase'
})
export default class RootBase extends Vue {
    @Mutation('setLoading') protected setLoading!: (isShowLoading: boolean) => void;
}