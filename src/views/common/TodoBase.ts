import Component from "vue-class-component"
import RootBase from "./RootBase"
import { StoreNamespace } from "@/enums/StoreNamespace";
import { Action, Getter, Mutation, State } from "vuex-class";
import Todo from "@/store/modules/Todo";
import { TodoVo } from "@/vo/TodoVo";

@Component({
    name: 'TodoBase'
})
export default class TodoBase extends RootBase {

    @State('storedTodoList', { namespace: StoreNamespace.TODO }) protected storedTodoList!:TodoVo[];

    @Mutation('toggleCompleteTodoItem', { namespace: StoreNamespace.TODO }) protected toggleCompleteTodoItem!:(idx:number) => void

    @Action('addTodoItemAct', { namespace: StoreNamespace.TODO }) protected addTodoItemAct!: (todoItem: TodoVo) => void
    @Action('addTodoApiTest', { namespace: StoreNamespace.TODO }) protected addTodoApiTest!: (todoItem: TodoVo) => any
    @Action('delTodoItemAct', { namespace: StoreNamespace.TODO }) protected delTodoItemAct!: (idx:number) => void
    
    @Action('delTodoListAct', { namespace: StoreNamespace.TODO }) protected delTodoListAct!:() => void
    @Action('searchTodoListAct', { namespace: StoreNamespace.TODO }) protected searchTodoListAct!: () => void

    @Getter('getTodoItemIdx', { namespace: StoreNamespace.TODO }) protected getTodoItemIdx!:(text:string) => number;


    beforeCreate(){
        const isAlreadyHas = this.$store.hasModule(StoreNamespace.TODO);
        if(!isAlreadyHas)
            this.$store.registerModule(StoreNamespace.TODO, Todo);
    }
  
    beforeDestroy(){
        this.$store.unregisterModule(StoreNamespace.TODO);
    }
}