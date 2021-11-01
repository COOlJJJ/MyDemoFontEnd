<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showaddnewRoleDialog()"
            >添加角色</el-button
          >
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
      <el-table :data="roleList" border stripe>
        <!--  展开列-->
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 加两个样式 用数组  for循环控制行数 同时渲染一级菜单 -->
            <!--  @close="removeRightById(scpoe.row, item1.id)"  closable-->
            <el-row
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
              :key="item1.id"
              v-for="(item1, i1) in scope.row.children"
            >
              <!-- 渲染一级权限 -->
              <el-col :span="5">
                <el-tag>{{ item1.authName }}</el-tag>
                <!-- 图标 -->
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 渲染二级权限 -->
              <el-col :span="19">
                <!-- 通过for循环嵌套渲染二级权限 在第二列中for循环控制多少行 每行又分2列-->
                <!--  @close="removeRightById(scpoe.row, item2.id)"  closable -->
                <el-row
                  :class="[i2 === 0 ? '' : 'bdtop', 'vcenter']"
                  :key="item2.id"
                  v-for="(item2, i2) in item1.children"
                >
                  <el-col :span="6">
                    <el-tag type="success">{{ item2.authName }}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!--  @close="removeRightById(scpoe.row, item3.id)"  closable -->
                  <el-col :span="18">
                    <el-tag
                      :key="item3.id"
                      type="warning"
                      v-for="item3 in item2.children"
                      >{{ item3.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <!-- 索引列 -->
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="name"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              icon="el-icon-edit"
              size="mini"
              type="primary"
              @click="showEditDialog(scope.row)"
              >编辑</el-button
            >
            <!-- 分配权限 -->
            <el-button
              @click="showSetRightDialog(scope.row)"
              icon="el-icon-setting"
              size="mini"
              type="warning"
              >分配权限</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              icon="el-icon-delete"
              size="mini"
              type="danger"
              @click="DeleteroleDialog(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限的对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="setRightDialogVisible"
      @close="setRightDialogClosed"
      title="分配权限"
      width="40%"
    >
      <!-- 树形控件 node-key绑定选中ID props绑定显示规则 data为绑定数据 default-expand-all打开全部节点-->
      <el-tree
        :data="rightslist"
        :props="treeProps"
        default-expand-all
        :default-checked-keys="defkeys"
        node-key="id"
        ref="treeRef"
        show-checkbox
      ></el-tree>
      <span class="dialog-footer" slot="footer">
        <el-button @click="setRightDialogVisible = false">取 消</el-button>
        <el-button @click="allotRights" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改角色名称的对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="editDialogVisible"
      title="编辑角色信息"
      width="50%"
    >
      <el-form :model="editForm" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button @click="editRoleName()" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加角色对话框 -->
    <el-dialog
      :close-on-click-modal="false"
      :visible.sync="addDialogVisible"
      @close="addnewroleDialogClosed"
      title="添加角色"
      width="50%"
    >
      <el-form :model="addform" label-width="70px">
        <el-form-item label="角色名称">
          <el-input v-model="addform.name"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button @click="AddNewRole()" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { create } from 'domain'
export default {
  data() {
    return {
      // 所有角色列表
      roleList: [],
      //控制分配权限的对话框的显示与隐藏
      setRightDialogVisible: false,
      //所有权限的数据
      rightslist: [],
      //树形控件的树形绑定对象
      treeProps: {
        label: 'authName', //显示的标签
        children: 'children' //父子关系通过哪个节点实现嵌套
      },
      //默认勾选的节点
      defkeys: [],
      //分配角色Id
      roleID: '',
      editDialogVisible: false,
      editForm: {
        id: 0,
        name: ''
      },
      //添加新角色
      addDialogVisible: false,
      addform: {
        name: ''
      }
    }
  },
  created() {
    this.getroleslist()
  },
  methods: {
    //删除角色
    async DeleteroleDialog(role) {
      this.roleID = role.id
      //弹框提示用户是否要删除
      const result = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err)
      if (result !== 'confirm') {
        return this.$message.info('取消本次删除')
      }
      const { data: res } = await this.$http.get('Rights/DeleteRole', {
        params: {
          roleID: this.roleID
        }
      })
      if (res.status == 201) {
        return this.$message.error('删除角色失败')
      }
      this.getroleslist()
      this.$message.success('删除角色成功')
    },
    addnewroleDialogClosed() {
      this.addform.name = ''
    },
    //显示添加角色对话框
    showaddnewRoleDialog() {
      this.addDialogVisible = true
    },
    //添加新角色,新角色默认没有权限 需要添加权限
    async AddNewRole() {
      const { data: res } = await this.$http.get('Rights/AddNewRole', {
        params: {
          name: this.addform.name
        }
      })
      if (res.status == 201) {
        return this.$message.error('添加失败')
      }
      this.addDialogVisible = false
      this.getroleslist()
      this.$message.success('添加角色成功')
    },
    //编辑角色信息
    async editRoleName() {
      const { data: res } = await this.$http.get('Rights/EditRoleName', {
        params: {
          roleid: this.editForm.id,
          name: this.editForm.name
        }
      })
      if (res.status == 201) {
        return this.$message.error('修改失败')
      }
      this.editDialogVisible = false
      this.getroleslist()
      this.$message.success('修改成功')
    },
    //显示角色编辑对话框
    showEditDialog(row) {
      this.editDialogVisible = true
      this.editForm.name = row.name
      this.editForm.id = row.id
    },
    // 获取所有数据
    async getroleslist() {
      const { data: res } = await this.$http.get('Rights/GetRolesList')
      if (res.status == 201) {
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList = res.response
    },
    // //根据ID删除对应的权限
    // async removeRightById(role, rightid) {
    //   //弹框提示用户是否要删除
    //   const res = await this.$confirm(
    //     '此操作将永久删除该用户, 是否继续?',
    //     '提示',
    //     {
    //       confirmButtonText: '确定',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }
    //   ).catch(err => err)
    //   if (res !== 'confirm') {
    //     return this.$message.info('取消本次删除')
    //   }
    //   console.log('确认删除!') //可以换成对应AXIOS操作
    //   //不使用刷新函数 直接赋值
    //   role.children = res.data //最新的数据赋值给role.children 防止重新刷新 提升用户体验
    // },
    //显示分配权限的对话框
    async showSetRightDialog(role) {
      this.roleID = role.id
      const { data: res } = await this.$http.get('Rights/GetRightsTree')//通过参数控制获取的数据样式 获取列表所有的权限 渲染树形结构
      if (res.status == 201) {
        return this.$message.error('获取权限树失败！')
      }
      this.rightslist = res.response
      //递归获取三级节点的ID
      this.getLeafKeys(role, this.defkeys)
      this.setRightDialogVisible = true //显示对话框
    },

    //通过递归形式,获取角色下所有三级权限的ID 保存到defkeys中(只看三级节点 如果没有三级节点出问题)
    //node判断节点 arr数组
    getLeafKeys(node, arr) {
      //不包含子节点就是三级节点
      // if (!node.children) {
      //    console.log('children'+node.id)
      //  return arr.push(node.id)//push添加进数组
      // }
      arr.push(node.id)//push添加进数组
      if (node.children) {
        node.children.forEach(item => this.getLeafKeys(item, arr))
      }

    },
    //监听对话框关闭事件
    setRightDialogClosed() {
      this.defkeys = []
    },
    //点击为角色分配权限
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        //...拆开运算符 如此得到了新的数组
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')//数组以逗号拼接字符串
      const { data: res } = await this.$http.get('Rights/GiveRights', {
        params: {
          roleid: this.roleID,
          permissionid: idStr
        }
      })//通过参数控制获取的数据样式 获取列表所有的权限 渲染树形结构
      if (res.status == 201) {
        return this.$message.error('分配权限失败')
      }
      this.$message.success('分配权限成功')
      this.setRightDialogVisible = false
      this.getroleslist()
      // 删除数组中对应的选项
      //arr.splice(i,1)   i索引 1为1位 i索引位key绑定的值 在v-for中为i in arr   另外arr需要从函数中传递过来即scope.row

    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
}

.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>