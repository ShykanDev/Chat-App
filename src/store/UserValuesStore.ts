import { defineStore } from "pinia";

export const UseUserValues = defineStore('UserStore',{
    state() {
        return{
            isAuth:false,       
            userUid:'',
            userName:'',
            userEmail:'',
        }
    },
    getters:{
        getIsAuth():boolean{
            return this.isAuth;
        },
        getUserUid():string{
            return this.userUid;
        },
        getUserName():string{
            return this.userName;
        },
        getUserEmail():string{
            return this.userEmail;
        }
    },
    actions:{        
        setIsAuth(isAuth:boolean){
            this.isAuth = isAuth;
        },
        setUserUid(payloadUid:string){
            this.userUid = payloadUid;
        },
        setUserName(userName:string){
            this.userName = userName;
        },
        setUserEmail(userEmail:string){
            this.userEmail = userEmail;
        }   
    }
})