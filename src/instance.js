import SecureLS from "secure-ls";
import { secret_key } from "./config";

var CryptoJS = require("crypto-js");

const encrypt = (text) => {

    return CryptoJS.HmacMD5(text, secret_key).toString();
    //return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    
  };
class StorageHelper {
    static instance = null;
    static createInstance() {
        var object = new StorageHelper();
        return object;
    }

    static getInstance() {
        if (!StorageHelper.instance) {
            StorageHelper.instance = StorageHelper.createInstance();
        }
        return StorageHelper.instance;
    }

    constructor(){
        this.ls = new SecureLS({ encodingType: "aes", isCompression: true, encryptionSecret: secret_key });
    }

    /* Cifra el key(input) y lo inserta en el localStorage */
    setItem(key,value){
        
        var key_crypt = encrypt(key);
        //console.log(key_crypt);
        
        try {
            if(value!=null){
                this.ls.set(key_crypt, JSON.stringify(value));
            } else {
                this.ls.set(key_crypt, "");
            }

        } catch (error) {
            this.ls.set(key_crypt, "");
        }
    }

    /* Cifra el key(input) y recibe la información en el localStorage */
    getItem(key){
        
        var key_crypt = encrypt(key);
        //console.log(key_crypt);

        
        try {
            var value = this.ls.get(key_crypt);
            
            if(value==null || value==""){
                return "";
            }

            return JSON.parse(value);

        } catch (error) {
            return "";
        }
    }

    removeItem(key){
        var key_crypt = encrypt(key);
        this.ls.remove(key_crypt);
    }

    clear(){
        this.ls.clear();
    }
}

const instance = StorageHelper.getInstance();
export default instance;