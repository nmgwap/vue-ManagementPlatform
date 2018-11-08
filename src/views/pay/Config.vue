/**
 * 支付管理 支付配置
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>支付配置</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.name" placeholder="输入名称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="formInline.payType" placeholder="请选择">
          <el-option v-for="type in payType" :label="type.key" :value="type.value" :key="type.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input size="small" v-model="formInline.partner" placeholder="输入商户号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="index" width="60">
      </el-table-column>
      <el-table-column sortable prop="name" label="名称" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="payType" label="支付类型" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="partner" label="商户号" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="subMchId" label="微信子商户" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="appid" label="应用ID" width="100" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="signType" label="加密类型" width="120" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="partnerKey" label="商户签名密钥" width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="notifyUrl" label="通知回调" width="140" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="sellerUserId" label="支付宝卖家" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column sortable prop="certPath" label="微信证书路径" width="150" show-overflow-tooltip>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog('editForm')">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="支付类型" prop="payType">
          <el-select size="small" v-model="editForm.payType" placeholder="请选择" class="userRole">
            <el-option v-for="type in payType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商户号" prop="partner">
          <el-input size="small" v-model="editForm.partner" auto-complete="off" placeholder="请输入商户号"></el-input>
        </el-form-item>
        <el-form-item label="微信子商户" prop="subMchId">
          <el-input size="small" v-model="editForm.subMchId" auto-complete="off" placeholder="请输入微信子商户"></el-input>
        </el-form-item>
        <el-form-item label="应用ID" prop="appid">
          <el-input size="small" v-model="editForm.appid" auto-complete="off" placeholder="请输入应用ID"></el-input>
        </el-form-item>
        <el-form-item label="通知回调" prop="notifyUrl">
          <el-input size="small" v-model="editForm.notifyUrl" auto-complete="off" placeholder="请输入通知回调"></el-input>
        </el-form-item>
        <el-form-item label="加密类型" prop="signType">
          <el-input size="small" v-model="editForm.signType" auto-complete="off" placeholder="请输入加密类型"></el-input>
        </el-form-item>
        <el-form-item label="商户签名密钥" prop="partnerKey">
          <el-input size="small" v-model="editForm.partnerKey" auto-complete="off" placeholder="请输入商户签名密钥"></el-input>
        </el-form-item>
        <el-form-item label="支付宝卖家" prop="sellerUserId">
          <el-input size="small" v-model="editForm.sellerUserId" auto-complete="off" placeholder="请输入支付宝卖家"></el-input>
        </el-form-item>
        <el-form-item label="微信证书路径" prop="certPath">
          <el-input size="small" v-model="editForm.certPath" auto-complete="off" placeholder="请输入微信证书路径"></el-input>
        </el-form-item>
        <el-form-item label="微信证书密码" prop="certPassword">
          <el-input size="small" v-model="editForm.certPassword" auto-complete="off" placeholder="请输入微信证书密码"></el-input>
        </el-form-item>
        <el-form-item label="支付宝私钥" prop="rsaKey">
          <el-input size="small" v-model="editForm.rsaKey" auto-complete="off" placeholder="请输入支付宝私钥"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog('editForm')">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { ConfigList, ConfigSave, ConfigDelete } from '../../api/payMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
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
      // rules表单验证
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        payType: [
          { required: true, message: '请选择支付方式', trigger: 'blur' }
        ],
        partner: [{ required: true, message: '请输入商户号', trigger: 'blur' }],
        subMchId: [
          { required: true, message: '请输入微信子商户号', trigger: 'blur' }
        ],
        appid: [{ required: true, message: '请输入应用ID', trigger: 'blur' }],
        notifyUrl: [
          { required: true, message: '请输入通知回调', trigger: 'blur' }
        ],
        signType: [
          { required: true, message: '请输入加密类型', trigger: 'blur' }
        ],
        partnerKey: [
          { required: true, message: '请输入商户签名密钥', trigger: 'blur' }
        ],
        sellerUserId: [
          { required: true, message: '请输入支付宝卖家', trigger: 'blur' }
        ],
        certPath: [
          { required: true, message: '请输入微信证书路径', trigger: 'blur' }
        ],
        certPassword: [
          { required: true, message: '请输入微信证书密码', trigger: 'blur' }
        ],
        rsaKey: [
          { required: true, message: '请输入支付宝私钥', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        limit: 10,
        name: '',
        payType: 0,
        partner: '',
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
      // 模拟数据
      let res = {
        code: 0,
        msg: null,
        count: 207,
        data: [
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 1,
            name: '支付宝2.0',
            payType: 1,
            partner: '2015122801047567',
            subMchId: '',
            appid: '2015122801047567',
            notifyUrl: 'r/pay/alipay/notify',
            signType: 'RSA',
            partnerKey: '==',
            sellerUserId: '2088121360144859',
            certPath: '',
            certPassword: '',
            rsaKey: '',
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 2,
            name: 'zzzzzz',
            payType: 2,
            partner: '1250856201',
            subMchId: null,
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl: null,
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1250856201.p12',
            certPassword: '1250856201',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 3,
            name: ' 待删除',
            payType: 2,
            partner: '1271942301',
            subMchId: '1273729701',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl: '/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: '',
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 5,
            name: '微信301',
            payType: 2,
            partner: '1271942301',
            subMchId: '1341564201',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl: 'er/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/---0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 6,
            name: '微信301',
            payType: 2,
            partner: '1271942301',
            subMchId: '1284797101',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl:
              'http://180.166.211.210:8114/machine-pay-consumer/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/--provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 7,
            name: '微信301',
            payType: 2,
            partner: '1271942301',
            subMchId: '1277531101',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl:
              'http://180.166.211.210:8114/machine-pay-consumer/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 8,
            name: '微信301',
            payType: 2,
            partner: '1271942301',
            subMchId: '1276485301',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl:
              'http://180.166.211.210:8114/machine-pay-consumer/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 9,
            name: '微信',
            payType: 2,
            partner: '1347158201',
            subMchId: '1351034701',
            appid: 'wx83a7489c10c9c952',
            notifyUrl: '',
            signType: 'NATIVE',
            partnerKey: 'f174607ba704632b6cad2df8b04650d6',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1347158201.p12',
            certPassword: '1347158201',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 10,
            name: '-微信301',
            payType: 2,
            partner: '1271942301',
            subMchId: '1357984702',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl:
              'http://180.166.211.210:8114/machine-pay-consumer/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            id: 11,
            name: '-微信301',
            payType: 2,
            partner: '1271942301',
            subMchId: '1357972202',
            appid: 'wx3ef7713adf0a97b8',
            notifyUrl:
              'http://180.166.211.210:8114/machine-pay-consumer/pay/wx/notify',
            signType: 'NATIVE',
            partnerKey: '2e3cdaf5aa051c16563c0b8916184d5d',
            sellerUserId: null,
            certPath:
              '/usr/local/tomcat_provider/webapps/machine-service-provider-0.0.1-SNAPSHOT/conf/apiclient_cert_1271942301.p12',
            certPassword: '1271942301',
            rsaKey: null,
            deptId: null
          }
        ]
      }
      this.loading = false
      this.listData = res.data
      // 分页赋值
      this.pageparm.currentPage = this.formInline.page
      this.pageparm.pageSize = this.formInline.limit
      this.pageparm.total = res.count
      // 模拟数据结束

      /***
       * 调用接口，注释上面模拟数据 取消下面注释
       */
      // ConfigList(parameter)
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
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.payType = row.payType
        this.editForm.partner = row.partner
        this.editForm.subMchId = row.subMchId
        this.editForm.appid = row.appid
        this.editForm.notifyUrl = row.notifyUrl
        this.editForm.signType = row.signType
        this.editForm.partnerKey = row.partnerKey
        this.editForm.sellerUserId = row.sellerUserId
        this.editForm.certPath = row.certPath
        this.editForm.certPassword = row.certPassword
        this.editForm.rsaKey = row.rsaKey
      } else {
        this.title = '添加'
        this.editForm.id = ''
        this.editForm.name = ''
        this.editForm.payType = ''
        this.editForm.partner = ''
        this.editForm.subMchId = ''
        this.editForm.appid = ''
        this.editForm.notifyUrl = ''
        this.editForm.signType = ''
        this.editForm.partnerKey = ''
        this.editForm.sellerUserId = ''
        this.editForm.certPath = ''
        this.editForm.certPassword = ''
        this.editForm.rsaKey = ''
      }
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

 
 