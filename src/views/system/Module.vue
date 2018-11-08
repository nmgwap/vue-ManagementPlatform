/**
 * 系统管理 菜单管理
 */
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 主体内容 -->
    <el-row>
      <!-- title -->
      <div class="modt-box">用户管理</div>
      <el-col :span="4"> </el-col>
      <el-col :span="6">
        <div class="mod-btnbox">
          <el-button size="small" type="primary">全部展开</el-button>
          <el-button size="small" type="primary">全部压缩</el-button>
        </div>
        <el-tree class="treeclass" ref="tree" :data="treeData" default-expand-all="" :props="defaultProps" @node-click="nodeclick" @check-change="handleClick" check-strictly node-key="id" show-checkbox></el-tree>
      </el-col>
      <el-col :span="18">
        <div class="mod-btnbox">
          <el-button size="small" type="primary" icon="el-icon-plus" @click="addModule">添加</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="父级菜单" prop="parentId">
            <el-select size="small" v-model="form.parentId" placeholder="请选择" class="selectw">
              <el-option v-for="parm in fmenu" :key="parm.id" :label="parm.name" :value="parm.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="菜单名称" prop="moduleName">
            <el-input size="small" v-model="form.moduleName"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="moduleIcon">
            <el-input size="small" v-model="form.moduleIcon"></el-input>
          </el-form-item>
          <el-form-item label="URL" prop="moduleUrl">
            <el-input size="small" v-model="form.moduleUrl"></el-input>
          </el-form-item>
          <el-form-item label="顺序" prop="moduleOrder">
            <el-input size="small" v-model="form.moduleOrder"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="saveModule('form')">保存</el-button>
            <el-button size="small" type="primary" v-show="showdelete" @click="deleteModule">删除</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  ModuleList,
  ModuleGet,
  ModuleNodes,
  ModuleSave,
  ModuleDelete
} from '../../api/userMG'
export default {
  data() {
    return {
      showdelete: false,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      form: {
        addUser: '',
        editUser: '',
        addTime: '',
        editTime: '',
        moduleId: '',
        parentId: '',
        moduleLevel: '',
        systemNo: '',
        isLeaf: '',
        fullIndex: '',
        moduleIcon: '',
        moduleOrder: '',
        moduleName: '',
        moduleNotes: '',
        moduleUrl: ''
      },
      // rules表单验证
      rules: {
        parentId: [
          { required: true, message: '请选择父级菜单', trigger: 'blur' }
        ],
        moduleName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        moduleIcon: [
          { required: true, message: '请输入菜单图标', trigger: 'blur' }
        ],
        moduleUrl: [{ required: true, message: '请输入URL', trigger: 'blur' }],
        moduleOrder: [
          { required: true, message: '请输入菜单顺序', trigger: 'blur' }
        ]
      },
      fmenu: []
    }
  },
  /**
   * 创建完毕
   */

  created() {
    this.getdata()
    this.getmenu()
  },

  /**
   * 里面的方法只有被调用才会执行
   */
  methods: {
    // 获取数据
    getdata() {
      ModuleList()
        .then(res => {
          this.treeData = [
            {
              id: 1,
              pId: 0,
              name: '平台顶级',
              open: true,
              checked: false
            },
            {
              id: 2,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 3,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 12,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 13,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 17,
              pId: 1,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 4,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 5,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 6,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            },
            {
              id: 7,
              pId: 2,
              name: '一层',
              open: true,
              checked: false
            }
          ]
        })
        .catch(err => {
          this.loading = false
          this.$message.error('菜单管理列表失败，请稍后再试！')
        })
    },
    // 添加
    addModule() {
      this.showdelete = false
      this.form.addUser = ''
      this.form.editUser = ''
      this.form.addTime = ''
      this.form.editTime = ''
      this.form.moduleId = ''
      this.form.parentId = ''
      this.form.moduleLevel = ''
      this.form.systemNo = ''
      this.form.isLeaf = ''
      this.form.fullIndex = ''
      this.form.moduleIcon = ''
      this.form.moduleOrder = ''
      this.form.moduleName = ''
      this.form.moduleNotes = ''
      this.form.moduleUrl = ''
    },
    // 获取父级菜单
    getmenu() {
      let parm = {
        page: '1',
        limit: '10'
      }
      ModuleNodes(parm)
        .then(res => {
          this.fmenu = res.data
        })
        .catch(err => {
          this.loading = false
          this.$message.error('父级菜单列表获取失败，请稍后再试！')
        })
    },
    // 复选变单选
    handleClick(data, checked, node) {
      if (checked) {
        this.$refs.tree.setCheckedNodes([])
        this.$refs.tree.setCheckedNodes([data])
        this.showdelete = true
      } else {
      }
    },
    // 点击节点
    nodeclick(arr, node, self) {
      ModuleGet(arr.id)
        .then(res => {
          console.log(JSON.stringify(res))
          this.form = res.data.data
          this.$refs.tree.setCheckedNodes([])
          this.$refs.tree.setCheckedNodes([arr])
        })
        .catch(err => {
          this.loading = false
          this.$message.error('用户管理获取失败，请稍后再试！')
        })
    },
    // 保存菜单
    saveModule(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          ModuleSave(this.form)
            .then(res => {
              this.getdata()
              this.getmenu()
            })
            .catch(err => {
              this.$message.error('菜单管理列表保存失败，请稍后再试！')
            })
        } else {
          return false
        }
      })
    },
    // 删除菜单
    deleteModule() {
      ModuleDelete(this.form.moduleId)
        .then(res => {
          this.getdata()
          this.getmenu()
          this.$message.error('菜单管理列表删除成功！')
        })
        .catch(err => {
          this.$message.error('菜单管理列表删除失败，请稍后再试！')
        })
    }
  }
}
</script>

<style>
.user-search {
  margin-top: 20px !important;
}
.user-search td {
  margin-top: 20px !important;
}
.userRole {
  width: 100%;
}
.el-table__expanded-cell {
  padding: 0px !important;
  margin: 0px !important;
}
.modt-box {
  width: 100%;
  height: 60px;
  line-height: 60px;
  background-color: #f0f2f5;
  text-align: center;
  color: #334157;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 24px;
}
.mod-btnbox {
  margin-bottom: 20px;
}
.treeclass {
  border: 1px solid #f3f3f3;
  padding-top: 20px;
  padding-bottom: 20px;
}
.selectw {
  width: 100%;
}
</style>
 
 