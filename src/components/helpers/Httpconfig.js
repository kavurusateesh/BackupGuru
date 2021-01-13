import React, { Component } from "react";
import axios from 'axios';
export default {
  
  httpPost(url,postdata){
    return axios.post(url, postdata)    
  },
  httptokenpost(url,postdata){
    const options = {   headers: {'validated': localStorage.getItem("validated"),'userName' : localStorage.getItem("UserName"),  'userID' : localStorage.getItem("userID"), 'Authorization': localStorage.getItem('token') } }
    return axios.post(url, postdata,options);
  },
  httptokenget(url){
    const options = {   headers: {'validated': localStorage.getItem("validated"),'userName' : localStorage.getItem("UserName"),  'userID' : localStorage.getItem("userID"), 'Authorization': localStorage.getItem('token') } }
    return axios.get(url,options);
  },
  httptokendelete(url){
    const options = {   headers: {'validated': localStorage.getItem("validated"),'userName' : localStorage.getItem("UserName"),  'userID' : localStorage.getItem("userID"), 'Authorization': localStorage.getItem('token') } }
    return axios.delete(url,options);
  },
  httptokenput(url,putdata){
    const options = {   headers: {'validated': localStorage.getItem("validated"),'userName' : localStorage.getItem("UserName"),  'userID' : localStorage.getItem("userID"), 'Authorization': localStorage.getItem('token') } }
    return axios.put(url,putdata,options);
  }

}

