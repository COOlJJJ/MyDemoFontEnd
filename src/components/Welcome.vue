<template>
  <div>
    <h3>测试3级权限认证以及401 403权限认证</h3>
    <el-button type="primary" @click="click" v-if="permissionArr[0]"
      >查询按钮</el-button
    >
    <el-button type="primary" @click="click" v-if="permissionArr[1]"
      >编辑按钮</el-button
    >
  </div>
</template>

<script>
export default {

  data() {
    return {
      //权限数组
      permissionurlArr: ['/api/ReadButton', '/api/EditButton'],
      permissionArr: [false, false]

    }
  },
  created() {
    this.CheckPermission()
  },

  methods: {
    async CheckPermission() {
      const { data: res } = await this.$http.post('Rights/CheckPermission', {
        arr: this.permissionurlArr
      }

      )
      console.log(res);
      if (res.status == 200) {
        this.permissionArr = res.response
      }
    },

    //标准的用户管理与权限和角色管理 只能管理员 不需要权限 别人不可见
    //授权标准写法
    async click() {
      let that = this
      let isexpired = false //token是否过期
      let isforbbiden = false //是否禁止访问
      const { data: res } = await this.$http.get('Rights/GetRightsList').catch(function (error) {
        if (error.response.status == '401') {
          isexpired = true
          that.$router.push("/Login");
          return that.$message.error('授权已过期,请重新登陆')
        }
        if (error.response.status == '403') {
          isforbbiden = true
          return that.$message.error('无权访问')
        }
      })

      if (isexpired == true || isforbbiden == true) {
        return
      }

      if (res.status == 201) {
        return this.$message.error('获取权限列表失败！')
      }
      this.$message.success('获取权限列表成功!')
      this.rightsList = res.response
    }
  }
}

</script>

<style>
</style>