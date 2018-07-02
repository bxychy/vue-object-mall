// 公共axios请求方法
import axios from 'axios'

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';

export default {
    fetchGet(url,params = {}){
        return new Promise((resolve, reject) => {
            // console.log('api--public---10',params);
            axios.get(url,{params}).then(res => {
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