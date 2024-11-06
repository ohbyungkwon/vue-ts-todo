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
            commit('setLoading', true,  { root: true });
            const response:ResponseVo<UserInfoVo> = await Axios.post(ApiPathNamespace.LOGIN, loginVo)
            console.log(response)
            const payload = response.resultObj;
            commit('setUserInfo', payload);
            commit('setLoading', false,  { root: true });
            return response;
        }  
    }
}

export default Login;