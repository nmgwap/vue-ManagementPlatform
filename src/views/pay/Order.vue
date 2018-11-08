/**
 * 订单管理 交易订单
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>交易订单</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.machineNo" placeholder="输入终端编号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="formInline.orderNo" placeholder="输入订单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input size="small" v-model="formInline.transId" placeholder="输入交易单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="formInline.payType" placeholder="请选择">
          <el-option v-for="type in payType" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="formInline.orderStatus" placeholder="请选择">
          <el-option v-for="type in payway" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column sortable prop="machineNo" label="终端编号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="orderNo" label="订单号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="transId" label="交易单号" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="payType" label="支付方式" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="transType" label="交易类型" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="goodsPrice" label="商品价格" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="payAmount" label="支付金额" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="goodsName" label="商品名称" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="orderStatus" label="订单状态" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="addTime" label="创建时间" width="180" show-overflow-tooltip>
        <template slot-scope="scope">
          <div>{{scope.row.addTime|timestampToTime}}</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">预览</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">退款</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="50%" @click="closeDialog('editForm')">
      <el-form label-width="120px" :model="editForm" ref="editForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="公司编号">
              <el-input size="small" v-model="editForm.deptId" auto-complete="off" placeholder="请输入名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="订单号">
              <el-input size="small" v-model="editForm.orderNo" auto-complete="off" placeholder="请输入商户号" disabled></el-input>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-input size="small" v-model="editForm.payType" auto-complete="off" placeholder="请输入商户号" disabled></el-input>
            </el-form-item>
            <el-form-item label="交易类型">
              <el-input size="small" v-model="editForm.transType" auto-complete="off" placeholder="请输入微信子商户" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品编号">
              <el-input size="small" v-model="editForm.goodsNo" auto-complete="off" placeholder="请输入应用ID" disabled></el-input>
            </el-form-item>
            <el-form-item label="支付金额">
              <el-input size="small" v-model="editForm.payAmount" auto-complete="off" placeholder="请输入通知回调" disabled></el-input>
            </el-form-item>
            <el-form-item label="货道号">
              <el-input size="small" v-model="editForm.aisleNo" auto-complete="off" placeholder="请输入加密类型" disabled></el-input>
            </el-form-item>
            <el-form-item label="买家标识">
              <el-input size="small" v-model="editForm.openId" auto-complete="off" placeholder="请输入商户签名密钥" disabled></el-input>
            </el-form-item>
            <el-form-item label="子商户号">
              <el-input size="small" v-model="editForm.subMchId" auto-complete="off" placeholder="请输入支付宝卖家" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名称">
              <el-input size="small" v-model="editForm.deptName" auto-complete="off" placeholder="请输入名称" disabled></el-input>
            </el-form-item>
            <el-form-item label="交易单号">
              <el-input size="small" v-model="editForm.transId" auto-complete="off" placeholder="请输入商户号" disabled></el-input>
            </el-form-item>
            <el-form-item label="子支付方式">
              <el-input size="small" v-model="editForm.subPayType" auto-complete="off" placeholder="请输入商户号" disabled></el-input>
            </el-form-item>
            <el-form-item label="终端编号">
              <el-input size="small" v-model="editForm.machineNo" auto-complete="off" placeholder="请输入微信子商户" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
              <el-input size="small" v-model="editForm.goodsPrice" auto-complete="off" placeholder="请输入应用ID" disabled></el-input>
            </el-form-item>
            <el-form-item label="商品名称">
              <el-input size="small" v-model="editForm.goodsName" auto-complete="off" placeholder="请输入通知回调" disabled></el-input>
            </el-form-item>
            <el-form-item label="订单状态">
              <el-input size="small" v-model="editForm.orderStatus" auto-complete="off" placeholder="请输入加密类型" disabled></el-input>
            </el-form-item>
            <el-form-item label="商户号">
              <el-input size="small" v-model="editForm.mchId" auto-complete="off" placeholder="请输入商户签名密钥" disabled></el-input>
            </el-form-item>
            <el-form-item label="编辑用户">
              <el-input size="small" v-model="editForm.editUser" auto-complete="off" placeholder="请输入支付宝卖家" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input size="small" v-model="editForm.remark" auto-complete="off" placeholder="请输入微信证书路径" disabled></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { OrderList, OrderRefund, OrderDelete } from '../../api/payMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '预览',
      payType: [
        { key: '请选择', value: 0 },
        { key: '现金', value: 1 },
        { key: '支付宝', value: 2 },
        { key: '微信', value: 3 },
        { key: 'POS通', value: 4 },
        { key: '闪付', value: 5 },
        { key: 'POS通C扫B', value: 6 },
        { key: '银联二维码', value: 8 },
        { key: '会员余额支付', value: 9 }
      ],
      payway: [
        { key: '请选择', value: 0 },
        { key: '初始化', value: 1 },
        { key: '已支付', value: 2 },
        { key: '出货成功', value: 3 },
        { key: '出货失败', value: 4 },
        { key: '订单超时', value: 5 },
        { key: '退款初始化', value: 11 },
        { key: '退款进行中', value: 12 },
        { key: '退款成功', value: 13 },
        { key: '退款失败', value: 14 },
        { key: '订单处理中', value: 10 }
      ],
      editForm: {
        id: '',
        name: '',
        payType: 1,
        partner: '',
        subMchId: '',
        appid: '',
        notifyUrl: '',
        signType: '',
        partnerKey: '',
        sellerUserId: '',
        certPath: '',
        certPassword: '',
        rsaKey: '',
        token: localStorage.getItem('logintoken')
      },
      formInline: {
        page: 1,
        limit: 10,
        machineNo: '',
        orderNo: '',
        transId: '',
        payType: 0,
        orderStatus: 0,
        token: localStorage.getItem('logintoken')
      },
      // 删除部门
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  // 注册组件
  components: {
    Pagination
  },
  /**
   * 数据发生改变
   */

  /**
   * 创建完毕
   */
  created() {
    this.getdata(this.formInline)
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取公司列表
    getdata(parameter) {
      this.loading = true
      // 模拟数据开始
      let res = {
        code: 0,
        msg: null,
        count: 23,
        data: [
          {
            addUser: null,
            editUser: null,
            addTime: 1526380193000,
            editTime: 1526380193000,
            orderId: 109,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: 'xxxx',
            transId: 'xxxx',
            payType: 6,
            subPayType: 'WXPay',
            transType: '退款',
            machineNo: '111111',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: -0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 14,
            openId: null,
            mchId: '111111111111111',
            subMchId: null,
            remark: '不允许从此IP发起交易: 101.81.251.226'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1526380176000,
            editTime: 1526380176000,
            orderId: 108,
            deptId: 1,
            deptName: 'xxxxxx',
            orderNo: 'xxxx',
            transId: 'xxxxx',
            payType: 6,
            subPayType: 'WXPay',
            transType: '退款',
            machineNo: 'J1AX904002',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: -0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 14,
            openId: null,
            mchId: '898310154990338',
            subMchId: null,
            remark: '不允许从此IP发起交易: 101.81.251.226'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1524921444000,
            editTime: 1524894094000,
            orderId: 107,
            deptId: 1,
            deptName: 'xxxxxx',
            orderNo: 'J1AX90400220180428101723945',
            transId: '4200000137201804287543647891',
            payType: 6,
            subPayType: 'WXPay',
            transType: '消费',
            machineNo: 'J1AX904002',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 7,
            openId: null,
            mchId: '898310154990338',
            subMchId: null,
            remark: '无法找到指定的账单'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1521307596000,
            editTime: 1524641207000,
            orderId: 20,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: '9300079120180318142634440',
            transId: null,
            payType: 0,
            subPayType: '0',
            transType: '消费',
            machineNo: '111111111111111',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 7,
            openId: null,
            mchId: null,
            subMchId: null,
            remark: '1111111111111111111111'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520195909000,
            editTime: 1520195909000,
            orderId: 19,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: '9300079120180305183828606',
            transId: null,
            payType: 0,
            subPayType: '0',
            transType: '消费',
            machineNo: '93000791',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 1,
            openId: null,
            mchId: null,
            subMchId: null,
            remark: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520035180000,
            editTime: 1520035180000,
            orderId: 18,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: '4200000056201803031934477774',
            transId: '9300079120180303170851281',
            payType: 6,
            subPayType: 'WXPay',
            transType: '退款',
            machineNo: '222222222222222222',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 8,
            openId: null,
            mchId: '898310154990338',
            subMchId: null,
            remark: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520020261000,
            editTime: 1520185478000,
            orderId: 17,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: '9300079120180303175059985',
            transId: '4200000072201803031887274444',
            payType: 6,
            subPayType: 'WXPay',
            transType: '消费',
            machineNo: '93000791',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 7,
            openId: null,
            mchId: '898310154990338',
            subMchId: null,
            remark: '不允许从此IP发起交易: 116.247.119.165'
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520019911000,
            editTime: 1520020075000,
            orderId: 16,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: '9300079120180303174511778',
            transId: '4200000055201803031949877221',
            payType: 6,
            subPayType: 'WXPay',
            transType: '消费',
            machineNo: '93000791',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 1,
            openId: null,
            mchId: '898310154990338',
            subMchId: null,
            remark: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520019776000,
            editTime: 1520019776000,
            orderId: 15,
            deptId: 1,
            deptName: 'xxxx',
            orderNo: '9300079120180303174256156',
            transId: null,
            payType: 0,
            subPayType: '0',
            transType: '消费',
            machineNo: '93000791',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 1,
            openId: null,
            mchId: null,
            subMchId: null,
            remark: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1520019729000,
            editTime: 1520019729000,
            orderId: 14,
            deptId: 1,
            deptName: '上海XX',
            orderNo: '9300079120180303174208429',
            transId: null,
            payType: 0,
            subPayType: '0',
            transType: '消费',
            machineNo: '93000791',
            goodsNo: '123456',
            goodsPrice: 0.01,
            payAmount: 0.01,
            goodsName: '可乐',
            aisleNo: null,
            orderStatus: 1,
            openId: null,
            mchId: null,
            subMchId: null,
            remark: null
          }
        ]
      }
      this.loading = false
      this.listData = res.data
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */

      // OrderList(parameter)
      //   .then(res => {
      //     this.loading = false
      //     if (res.success == false) {
      //       this.$message({
      //         type: 'info',
      //         message: res.msg
      //       })
      //     } else {
      //       this.listData = res.data
      //       // 分页赋值
      //       this.pageparm.currentPage = this.formInline.page
      //       this.pageparm.pageSize = this.formInline.limit
      //       this.pageparm.total = res.count
      //     }
      //   })
      //   .catch(err => {
      //     this.loading = false
      //     this.$message.error('菜单加载失败，请稍后再试！')
      //   })
    },
    // 分页插件事件
    callFather(parm) {
      this.formInline.page = parm.currentPage
      this.formInline.limit = parm.pageSize
      this.getdata(this.formInline)
    },
    // 搜索事件
    search() {
      this.getdata(this.formInline)
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      this.editForm = row
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          ConfigSave(this.editForm)
            .then(res => {
              this.editFormVisible = false
              this.loading = false
              if (res.success) {
                this.getdata(this.formInline)
                this.$message({
                  type: 'success',
                  message: '公司保存成功！'
                })
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.editFormVisible = false
              this.loading = false
              this.$message.error('支付配置信息保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除公司
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ConfigDelete(row.deptId)
            .then(res => {
              if (res.success) {
                this.$message({
                  type: 'success',
                  message: '公司已删除!'
                })
                this.getdata(this.formInline)
              } else {
                this.$message({
                  type: 'info',
                  message: res.msg
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('支付配置信息删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 关闭编辑、增加弹出框
    closeDialog(formName) {
      this.editFormVisible = false
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>

 
 

 