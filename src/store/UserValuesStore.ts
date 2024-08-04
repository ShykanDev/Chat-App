import { defineStore } from "pinia";

export const UseUserValues = defineStore('UserStore',{
    state() {
        return{
            isAuth:false       
        }
    },
    getters:{
        getIsAuth():boolean{
            return this.isAuth;
        }
    },
    actions:{        setIsAuth(isAuth:boolean){
            this.isAuth = isAuth;
        }
    }
})