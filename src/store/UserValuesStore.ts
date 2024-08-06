import { defineStore } from "pinia";

export const UseUserValues = defineStore('UserStore',{
    state() {
        return{
            isAuth:false,       
            userUid:'',
        }
    },
    getters:{
        getIsAuth():boolean{
            return this.isAuth;
        },
        getUserUid():string{
            return this.userUid;
        }
    },
    actions:{        
        setIsAuth(isAuth:boolean){
            this.isAuth = isAuth;
        },
        setUserUid(payloadUid:string){
            this.userUid = payloadUid;
        }   
    }
})