// 公共axios请求方法
import axios from 'axios'

axios.defaults.timeout = 5000;
axios.defaults.header.post['Content-Type'] = 'application/x-www=form-urlencoded';

export default {
    fetchGet(url,params = {}){
        return new Promise((resolve, reject) => {
            axios.get(url,params).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    },
    fetchPost(url,params = {}){
        return new Promise((resolve,reject) => {
            axios.post(url,params).then(res => {
                resolve(res.data);
            }).catch(err =>{
                reject(err);
            });
        })
    }
}