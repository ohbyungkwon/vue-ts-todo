import { Module } from "vuex";
import { RootStore } from "..";
import Axios from "@/utils/Axois";
import { ApiPathNamespace } from "@/enums/ApiPathNameSpace";
import { ResponseVo } from "@/vo/ResponseVo";
import { UserInfoVo } from "@/vo/UserInfoVo";

export interface LoginStore {
    userInfo: UserInfoVo;
}

const Login:Module<LoginStore, RootStore> = {
    namespaced: true,
    state: {
        userInfo: new UserInfoVo({})
    },
    mutations: {
        setUserInfo: function(state, payload:UserInfoVo) {
            state.userInfo = payload;
        }
    },
    actions: {
        doLogin: async function({commit}, loginVo) {
            const response:ResponseVo<UserInfoVo> = await Axios.post(ApiPathNamespace.LOGIN, loginVo)
            if(response.code === 200) {
                const payload = response.body;
                commit('setUserInfo', payload);
            }
            return response;
        }  
    }
}

export default Login;