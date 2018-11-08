/**
 * 支付管理 支付配置信息
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>支付配置信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="formInline.machineNo" placeholder="输入终端号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="machineNo" label="终端号" width="200">
      </el-table-column>
      <el-table-column sortable prop="payType" label="支付方式" width="200">
      </el-table-column>
      <el-table-column sortable prop="configName" label="显示名称" width="200">
      </el-table-column>
      <el-table-column sortable prop="payOpen" label="状态" width="200">
      </el-table-column>
      <el-table-column sortable prop="editTime" label="修改时间" width="200">
        <template slot-scope="scope">
          <div>{{scope.row.editTime|timestampToTime}}</div>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column sortable prop="editUser" label="修改人" width="150">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click="closeDialog">
      <el-form label-width="120px" :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="终端号" prop="machineNo">
          <el-input size="small" v-model="editForm.machineNo" auto-complete="off" placeholder="请输入终端号"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-select size="small" v-model="editForm.payType" placeholder="请选择" class="userRole">
            <el-option v-for="type in payType" :label="type.key" :value="type.value" :key="type.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="配置序号" prop="configId">
          <el-input size="small" v-model="editForm.configId" auto-complete="off" placeholder="请输入配置序号"></el-input>
        </el-form-item>
        <el-form-item label="显示名称" prop="configName">
          <el-input size="small" v-model="editForm.configName" auto-complete="off" placeholder="请输入显示名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="payOpen">
          <el-select size="small" v-model="editForm.payOpen" placeholder="请选择" class="userRole">
            <el-option label="正常" value="T"></el-option>
            <el-option label="禁用" value="N"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeDialog">取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  MachineConfigList,
  MachineConfigSave,
  MachineConfigDelete
} from '../../api/payMG'
import Pagination from '../../components/Pagination'
export default {
  data() {
    return {
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      title: '添加',
      payType: [
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
        tcId: '',
        machineNo: '',
        payType: '',
        configId: '',
        configName: '',
        payOpen: '',
        token: localStorage.getItem('logintoken')
      },
      // rules表单验证
      rules: {
        machineNo: [
          { required: true, message: '请输入终端号', trigger: 'blur' }
        ],
        payType: [
          { required: true, message: '请选择支付方式', trigger: 'blur' }
        ],
        configId: [
          { required: true, message: '请输入配置序号', trigger: 'blur' }
        ],
        configName: [
          { required: true, message: '请输入显示名称', trigger: 'blur' }
        ],
        payOpen: [{ required: true, message: '请选择状态', trigger: 'blur' }]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
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
        count: 5,
        data: [
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: 1524046759000,
            tcId: 1,
            deptId: 1,
            machineNo: '564565656666',
            payType: 3,
            payOpen: 'T',
            configId: 63,
            configName: '微信',
            posNo: '098'
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            tcId: 2,
            deptId: 1,
            machineNo: '66666666',
            payType: 2,
            payOpen: 'T',
            configId: 64,
            configName: '支付宝',
            posNo: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            tcId: 3,
            deptId: 1,
            machineNo: '93066545645546500791',
            payType: 6,
            payOpen: 'T',
            configId: 67,
            configName: '银商微信、支付宝',
            posNo: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: null,
            editTime: null,
            tcId: 4,
            deptId: 1,
            machineNo: '65545656565',
            payType: 6,
            payOpen: 'T',
            configId: 67,
            configName: '银商微信、支付宝',
            posNo: null
          },
          {
            addUser: null,
            editUser: null,
            addTime: 1527409037000,
            editTime: 1527409037000,
            tcId: 6,
            deptId: 1,
            machineNo: '565654545454545',
            payType: 6,
            payOpen: 'T',
            configId: 96,
            configName: '微信',
            posNo: null
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
      // MachineConfigList(parameter)
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
        this.editForm.tcId = row.tcId
        this.editForm.machineNo = row.machineNo
        this.editForm.configId = row.configId
        this.editForm.payType = row.payType
        this.editForm.configName = row.configName
        this.editForm.payOpen = row.payOpen
      } else {
        this.title = '添加'
        this.editForm.tcId = ''
        this.editForm.machineNo = ''
        this.editForm.payType = ''
        this.editForm.configId = ''
        this.editForm.configName = ''
        this.editForm.payOpen = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          MachineConfigSave(this.editForm)
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
          MachineConfigDelete(row.deptId)
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
    closeDialog() {
      this.editFormVisible = false
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

 
 