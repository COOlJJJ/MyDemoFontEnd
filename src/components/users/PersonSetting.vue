<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <span>个人信息</span>
          <el-divider></el-divider>
          <el-tag style="font-size: 20px; margin-bottom: 15px">基础数据</el-tag>
          <div>
            <el-tag type="success" style="margin-bottom: 15px">用户账号:</el-tag
            >{{ this.userInfo.id }}
          </div>
          <div>
            <el-tag type="success" style="margin-bottom: 15px">姓名:</el-tag
            >{{ this.userInfo.name }}
          </div>
          <div>
            <el-tag type="success" style="margin-bottom: 15px">角色:</el-tag
            >{{ this.userInfo.role }}
          </div>
          <div>
            <el-tag type="success">邮箱:</el-tag>{{ this.userInfo.email }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="18">
        <el-card>
          <span>修改密码</span>
          <el-divider></el-divider>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="你的新密码">
              <el-input v-model="form.newpwd" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认你的密码">
              <el-input v-model="form.confirmpwd" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="ChangePassword"
                >更新密码</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        id: '',
        name: '',
        role: '',
        email: '',
      },
      form: {
        //新密码
        newpwd: '',
        //确认密码
        confirmpwd: '',
      }

    }
  },
  created() {
    this.GetSingleUserInfo()
  },
  methods: {

    //获取单个用户的信息
    async GetSingleUserInfo() {
      const { data: res } = await this.$http.get("User/GetSingleUserInfo")
      if (res.status == 201) {
        this.$message.error('读取个人信息失败')
        return
      }
      this.userInfo.name = res.response.name
      this.userInfo.email = res.response.email
      this.userInfo.id = res.response.id
      this.userInfo.role = res.response.role
    },
    //更改密码
    async ChangePassword() {
      if (this.form.newpwd != this.form.confirmpwd) {
        this.$message.error('两次输入的密码不一致')
        this.form.newpwd = ''
        this.form.confirmpwd = ''
        return
      }
      const { data: res } = await this.$http.post("User/ChangePassword", this.form)
      if (res.status == 200) {
        this.$message.success('更新成功')
        //登出清空token就好了
        window.sessionStorage.setItem('activepath', null)
        window.localStorage.clear();
        this.$router.push('/login')
      } else {
        this.$message.success('更新失败')
      }
      this.form.newpwd = ''
      this.form.confirmpwd = ''
    }

  }
}
</script>