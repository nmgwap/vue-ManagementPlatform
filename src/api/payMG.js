import axios from 'axios';
import { req } from './axiosFun';

/**
 * 支付配置信息
 **/
// 支付配置信息-获取支付配置信息列表
export const MachineConfigList = (params) => { return req("post", "/api/MachineConfig/list", params) };
// 支付配置信息-保存支付配置信息
export const MachineConfigSave = (params) => { return req("post", "/api/MachineConfig/save", params) };
// 支付配置信息-删除支付配置信息
export const MachineConfigDelete = (params) => { return axios.delete("/api/MachineConfig/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 支付配置 
 **/
// 支付配置-获取支付配置列表
export const ConfigList = (params) => { return req("post", "/api/Config/list", params) };
// 支付配置-保存支付配置
export const ConfigSave = (params) => { return req("post", "/api/Config/save", params) };
// 支付配置-删除支付配置
export const ConfigDelete = (params) => { return axios.delete("/api/Config/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };

/**
 * 订单管理-交易订单 
 **/
// 交易订单-获取交易订单列表
export const OrderList = (params) => { return req("post", "/api/Order/list", params) };
// 交易订单-s删除交易订单
export const OrderDelete = (params) => { return axios.delete("/api/Order/delete?ids=" + params + "&token=" + localStorage.getItem('logintoken')).then(res => res.data) };
// 交易订单-交易订单退款
export const OrderRefund = (params) => { return req("post", "/api/Order/refund", params) };