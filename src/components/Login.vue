<template>
  <div class="login_container">
    <el-row>
      <el-col :span="24"
        ><el-card>
          <span class="head"
            ><span
              ><img
                style="width: 175px; height: 35px"
                alt
                src="../assets/logo.png"
            /></span>
            <b style="font-size: 25pt"> 访客系统</b></span
          >
        </el-card></el-col
      >
    </el-row>
    <div class="login_box">
      <!-- 登录表单区域 添加ref引用 就可以拿到FORM对象-->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
        label-width="0px"
      >
        <h1>登陆</h1>
        <p>用户名</p>
        <!-- 用户名 prop绑定规则-->
        <el-form-item prop="username">
          <!-- 添加前置图标prefix 也有后置的 v-model数据绑定-->
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            placeholder="用户名"
          ></el-input>
        </el-form-item>
        <p>密码</p>
        <!-- 密码 type='password'隐藏密码-->
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            type="password"
            v-model="loginForm.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login" style="width: 100%"
            >登录</el-button
          >
          <!-- <el-button type="info" @click="resetLoginForm" round>重置</el-button> -->
        </el-form-item>
      </el-form>
    </div>
    <div class="pic_box">
      <img alt src="../assets/Pic.svg" />
    </div>

    <div class="blewOne">Copyright © 2021, All Rights Reserved.</div>
    <div class="blew">Powered By OP OE Digital</div>
  </div>
</template>


<script>  
// 行为区
export default {
  data() {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        //  验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();//表单重置
    },
    login() {
      this.$refs.loginFormRef.validate(async valid => {//箭头函数 一个参数 可以去掉大括号 validate预验证
        if (!valid) return;
        // await简化promise对象 返回了6个axios封装好的属性 其中data属性就是我们需要的值 data:res 解构只要data值 res是重命名的变量 data是返回promise对象中的data 不是json中的data  重名为res await只能用async修饰的方法 即valid方法
        const { data: res } = await this.$http.post("Login/Login", this.loginForm);
        if (res.status !== 200) return this.$message.error('登录失败');//this.$message调用挂载对象message消息弹框 后面是警告error方法 success方法是成功
        this.$message.success('登录成功');
        window.localStorage.setItem('Token', res.response.token);//将返回的信息中的RoleId保存在session中 用于会话期间
        //this.$router编程式导航 push到对应的地址
        this.$router.push("/Home");
      });//验证
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  border-radius: 15px; //圆角边框
  position: absolute; //绝对位置
  left: 25%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.pic_box {
  width: 340px;
  height: 250px;
  border-radius: 15px; //圆角边框
  position: absolute; //绝对位置
  right: 25%;
  top: 40%;
  transform: translate(-50%, -50%);
}

.login_form {
  bottom: 0;
  width: 100%;
  padding: 0 20px; //只写两位的话是 第一位是上下 第二是左右
  box-sizing: border-box; //IE盒子包括padding和border
}

.head {
  display: flex; //弹性模型
  justify-content: space-between; //直接可以居中 flex-end 居左
}
.blewOne {
  position: absolute;
  bottom: 3%;
  left: 50%;
  transform: translate(-50%, -50%); //(X,Y)水平减少自身的50%距离
}
.blew {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%); //(X,Y)水平减少自身的50%距离
}
</style>