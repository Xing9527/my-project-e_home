import Vue from 'vue'
import allapi from './allapi'
import base from './config'
import axios from 'axios'
import { MessageBox } from 'element-ui';
// import router from '../.././src/router'

let xhr = {
  get(url,params){
    return new Promise((resolve,reject) => {
    //  debugger
      base.get(allapi[url],{params}).then(res => {
        // console.log(res.data.code)

        resolve(res.data)
      }).catch(err => {
        console.log(err)
        reject(err)
      })
    })
  },
  post(url,params){
    return new Promise((resolve,reject) => {
      base.post(allapi[url],params).then(res => {
        resolve(res.data)
      }).catch((err) => {
        console.log(err)
        reject(err)
      })
    })
  },
  qiniuGet(){
    return new Promise((resolve,reject) => {
      base.get(allapi['qiniu']).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })

  }
}

Vue.prototype.$axios = xhr;


