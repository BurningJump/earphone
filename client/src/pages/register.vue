<template>
  <div id="register">
    <el-form :model="registerForm" status-icon :rules="regRules" ref="registerForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="手机" prop="phone">
        <el-input v-model.number="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="registerForm.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="repwd">
        <el-input type="password" v-model="registerForm.repwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 18) {
            callback(new Error('必须年满18岁'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var validatePwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerForm.repwd !== '') {
          this.$refs.registerForm.validateField('repwd')
        }
        callback()
      }
    }
    var validateRepwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.pwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        pwd: '',
        repwd: '',
        phone: ''
      },
      regRules: {
        pwd: [
          { validator: validatePwd, trigger: 'blur' }
        ],
        repwd: [
          { validator: validateRepwd, trigger: 'blur' }
        ],
        phone: [
          { validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.registerForm.pwd = this.md5(this.registerForm.pwd)
          this.registerForm.repwd = this.md5(this.registerForm.repwd)
          this.$http.post('api/user/register', this.registerForm).then(res => {
            console.log(res.data)
          }).catch(err => {
            console.log(err)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss">

</style>

