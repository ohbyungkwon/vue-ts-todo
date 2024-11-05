import { Module } from "vuex";
import { RootStore } from "..";
import Axios from "@/utils/Axois";
import { ApiPathNamespace } from "@/enums/ApiPathNameSpace";
import { ResponseVo } from "@/vo/ResponseVo";

export interface LoginStore {
    userInfo: {};
}

const Login:Module<LoginStore, RootStore> = {
    state: {
        userInfo: {}
    },
    mutations: {
        setUserInfo: function(state, payload) {
            state.userInfo = payload;
        }
    },
    actions: {
        doLogin: async function({commit}, loginVo) {
            const response:ResponseVo = await Axios.post(ApiPathNamespace.LOGIN, loginVo)
            
            // return new UserInfoVo(response.body);
        }  
    }
}

export default Login;