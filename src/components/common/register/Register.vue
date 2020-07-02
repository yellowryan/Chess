<template>
  <div id="register" v-if="isShow">
    <div class="ui-dialog account-dialog-wrapper">
      <div class="ui-dialog-wrapper">
        <div class="account-dialog">
          <div class="left"></div>
          <div class="right">
            <div class="login__switches">
              <span
                class="login__switch"
                @click="()=>switchClick(1)"
                :class="{'active':isActive===1}"
              >登录账号</span>
              <span
                class="login__switch"
                @click="()=>switchClick(2)"
                :class="{'active':isActive===2}"
              >账号注册</span>
            </div>
            <div v-if="isActive===1">
              <div class="ui-input login__input">
                <input
                  placeholder="请输入账号"
                  type="text"
                  key="account"
                  v-model="loginCount"
                  maxlength="16"
                />
              </div>
              <div class="login__error"></div>
              <div class="ui-input login__input">
                <input
                  placeholder="请输入密码"
                  type="password"
                  key="password"
                  v-model="loginPwd"
                  maxlength="16"
                />
              </div>
            </div>
            <div v-else>
              <div class="ui-input login__input">
                <input
                  placeholder="请输入账号"
                  type="text"
                  key="account1"
                  v-model="regCount"
                  maxlength="16"
                />
              </div>
              <div class="login__error"></div>
              <div class="ui-input login__input">
                <input
                  placeholder="请输入密码"
                  type="password"
                  key="password1"
                  v-model="regPwd"
                  maxlength="16"
                />
              </div>
              <div class="login__error"></div>
              <div class="ui-input login__input">
                <input
                  placeholder="再次确认密码"
                  type="password"
                  key="password2"
                  v-model="regPwd2"
                  maxlength="16"
                />
              </div>
            </div>
            <div class="login__error"></div>
            <button
              type="button"
              class="ui-button login__button ui-button--colorful"
              v-if="isActive===1"
              @click="loginClick"
            >登录</button>
            <button
              type="button"
              class="ui-button login__button ui-button--colorful"
              v-else
              @click="registerClick"
            >注册</button>
            <div class="login__alter"></div>
            <div class="login__footer">
              若登录则表示已阅读并同意本网站的
              <a href="javascript:void(0)">《用户协议》</a>
              <br />最终所有权归||877520264@qq.com所有
            </div>
          </div>
        </div>
        <span class="ui-dialog-close icon-close" @click="closeDialog">x</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUserRegister, reqUserLogin } from "../../../http/user";
import { userRegister, userLogin } from "../../../store/action";
import { Message } from "element-ui";
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    path: {
      type: String,
      default: "/"
    }
  },
  data() {
    return {
      isActive: 1,
      loginCount: "",
      loginPwd: "",
      regCount: "",
      regPwd: "",
      regPwd2: ""
    };
  },
  methods: {
    switchClick(num) {
      if (num === this.isActive) {
        return;
      } else {
        this.isActive = num;
      }
    },
    closeDialog() {
      $(".ui-dialog").css("display", "none");
      this.$emit("closeLogin");
    },
    async registerClick() {
      const reg = /^[_a-zA-Z](\w){5,15}$/;
      const reg2 = /[^\s]{6,16}/;
      if (!this.regCount) {
        $(".login__error")
          .eq(0)
          .text("账号不能为空");
        return;
      }
      $(".login__error")
        .eq(0)
        .text("");
      if (!this.regPwd) {
        $(".login__error")
          .eq(1)
          .text("密码不能为空");
        return;
      }
      $(".login__error")
        .eq(1)
        .text("");
      if (this.regPwd !== this.regPwd2) {
        $(".login__error")
          .eq(2)
          .text("两次密码不一致");
        return;
      }
      $(".login__error")
        .eq(2)
        .text("");
      if (!reg.test(this.regCount)) {
        $(".login__error")
          .eq(0)
          .text("格式错误,只允许字母数字下划线开头，长度为6到16位");
      }
      $(".login__error")
        .eq(0)
        .text("");
      if (!reg2.test(this.regPwd)) {
        $(".login__error")
          .eq(1)
          .text("密码长度为6-16位且不含空格");
        return;
      }
      $(".login__error")
        .eq(1)
        .text("");
      const user = {
        username: this.regCount,
        password: this.regPwd
      };
      const response = await reqUserRegister(user);
      const result = response.data;
      if (result.status === 1) {
        $(".login__error")
          .eq(0)
          .text(result.msg);
      } else {
        Message.success({
          message: "注册成功",
          center: true,
          duration: 1000,
          onClose: () => {
            this.isActive = 1;
            this.regCount = "";
            this.regPwd = "";
            this.regPwd2 = "";
          }
        });

        this.$store.dispatch("userRegister");
      }
    },
    async loginClick() {
      if (!this.loginCount) {
        $(".login__error")
          .eq(0)
          .text("账号不能为空");
        return;
      }
      $(".login__error")
        .eq(0)
        .text("");
      if (!this.loginPwd) {
        $(".login__error")
          .eq(1)
          .text("密码不能为空");
        return;
      }
      const user = {
        username: this.loginCount,
        password: this.loginPwd
      };
      const response = await reqUserLogin(user);
      const result = response.data;
      if (result.status === 1) {
        $(".login__error")
          .eq(0)
          .text("用户名或密码错误");
      } else {
        this.$store.dispatch("userLogin", result.data);
        Message.success({
          message: "登录成功",
          duration: 1000,
          center: true,
          onClose: () => {
            this.loginCount = "";
            this.loginPwd = "";
            // this.$router.replace(path).catch(err => {
            //   err;
            // });

            location.href = "http://localhost:8001" + this.path;
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#register {
  width: 100vw;
}
.ui-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
}
.ui-dialog-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  max-height: 100%;
  transform: translate(-50%, -50%);
  box-shadow: 0 10px 22px 0 rgba(0, 0, 0, 0.08), 0 4px 8px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
}
.account-dialog-wrapper {
  background-color: rgba(0, 0, 0, 0.3);
  .ui-dialog-wrapper {
    width: 748px;
    height: 426px;
    background-color: transparent;
  }
  .ui-dialog-close {
    color: #ffffff;
    right: -38px;
    top: -34px;
  }
}
.ui-dialog-close {
  position: absolute;
  margin-right: -50px;
  font-size: 32px;
  cursor: pointer;
}
.account-dialog {
  position: absolute;
  overflow: hidden;
  display: flex;
  border-radius: 6px;
  background-color: #ffffff;
  z-index: 999;
  font-size: 14px;
  height: 426px;
  .left {
    position: relative;
    overflow: hidden;
    width: 400px;
    background: url("https://chess-img.oss-cn-hangzhou.aliyuncs.com/login.jpg")
      no-repeat;
    background-size: cover;
    color: #ffffff;
    display: inline-block;
  }
  .right {
    display: inline-block;
    padding: 22px 54px 0 54px;
  }
  .login__switches {
    font-size: 18px;
    font-weight: 500;
    color: #a2a2a2;
    margin-top: 15px;
    margin-bottom: 16px;
    .login__switch {
      cursor: pointer;
      &.active {
        color: #2c2f36;
      }
      & + .login__switch {
        margin-left: 40px;
      }
    }
  }
  .login__input {
    width: 300px;
    padding: 8px 0;
  }
  .login__error {
    font-size: 12px;
    height: 24px;
    line-height: 32px;
    color: #ff785c;
    text-align: left;
  }
  .login__button {
    margin-top: 13px;
    width: 300px;
  }
  .login__footer {
    font-size: 12px;
    line-height: 1.5;
    color: #a2a2a2;
    margin-top: 42px;
    text-align: center;
  }
}
.ui-input {
  position: relative;
  padding: 15px 0;
  border-bottom: 1px solid #dfe6e5;
  input {
    width: 100%;
    height: 30px;
    font-size: 14px;
    outline: none;
    border: none;
  }
}
.ui-button {
  min-width: 64px;
  height: 40px;
  font-weight: 500;
  font-size: 14px;
  outline: none;
  vertical-align: middle;
  padding: 0;
  cursor: pointer;
}
.ui-button--colorful {
  background: linear-gradient(to left, #f58365, #ff188a);
  color: #fff;
  border: none;
  border-radius: 26px;
}
.icon-close {
}
</style>