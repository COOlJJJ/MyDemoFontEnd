<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-button round type="primary" @click="showAddPermission"
        >添加权限</el-button
      >
      <div>PS:</div>
      <div>1.一级权限为根目录菜单; 二级权限为子目录菜单; 三级权限为按钮</div>
      <div>2.方便配置,不用去数据库配置;但仍需Vue配置路由</div>
      <div>3.父节点为0即是根结点</div>
      
      <div>.NET Core 权限认证 jwt模式</div>
      <div>分为授权和鉴权</div>
      <div>403禁止访问 401为未授权或Token过期 200正常访问</div>
      <div>登陆系统后本地存储Token后 不存在未授权情况 401肯定是token过期</div>
      <div>三级权限 button权限 通过配置 在页面初始化时根据权限控制</div>

      <el-table :data="rightsList" border stripe :cell-style="tableCellStyle">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="父节点" prop="upId"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="nodeLevel">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.nodeLevel === 1">一级权限</el-tag>
            <el-tag type="success" v-else-if="scope.row.nodeLevel === 2">
              二级权限</el-tag
            >
            <el-tag type="warning" v-else> 三级权限</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加权限对话框 -->
    <el-dialog
      :visible.sync="addDialogVisible"
      @close="addDialogClosed"
      :close-on-click-modal="false"
      title="添加权限"
      width="50%"
    >
      <!-- 内容主体区域 ：model绑定addForm中 v-model绑定表单的数据项=》addForm prop验证规则的属性-->
      <el-form :model="addForm" label-width="70px" ref="addFormRef">
        <el-form-item label="权限名称" prop="authName">
          <el-input v-model="addForm.authName"></el-input>
        </el-form-item>
        <el-form-item label="权限等级" prop="NodeLevel">
          <el-input v-model="addForm.NodeLevel"></el-input>
        </el-form-item>
        <el-form-item label="父节点" prop="UpId">
          <el-input v-model="addForm.UpId"></el-input>
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="addForm.path"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 slot="footer" 可以理解为内容插槽 被设置Dom的位置 footer为底部-->
      <span class="dialog-footer" slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="addPermission" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 权限列表
      rightsList: [],
      //角色添加
      addForm: {
        authName: '',
        NodeLevel: 1,
        UpId: 0,
        path: ''
      },
      addDialogVisible: false
    }
  },
  created() {
    // 获取所有的权限
    this.getRightsList()
  },
  methods: {
    //打开添加权限对话框
    showAddPermission() {
      this.addDialogVisible = true
    },
    //添加权限
    addPermission() {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('Rights/AddNewRights', this.addForm)
        if (res.status == 201) {
          return this.$message.error('添加新权限失败')
        }
        this.$message.success('添加新权限成功')
        this.addDialogVisible = false
        this.getRightsList()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    addDialogClosed() {
      this.$refs['addFormRef'].resetFields();
    },
    tableCellStyle({ row, rowIndex }) {
      return 'font-size:14px'
    },
    // 获取权限列表
    async getRightsList() {
      const { data: res } = await this.$http.get('Rights/GetRightsList')
      if (res.status == 201) {
        return this.$message.error('获取权限列表失败！')
      }
      this.$message.success('获取权限列表成功!')
      this.rightsList = res.response
    }
  }
}
</script>

<style lang="less" scoped>
</style>