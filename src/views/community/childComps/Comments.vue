<template>
  <div class="comments container" v-if="articles">
    <el-card
      class="box-card"
      v-for="article in articles.list"
      :key="article._id"
      @click.native="articleClick(article)"
    >
      <div slot="header" class="clearfix">
        <div
          class="box-card-image article-image"
          :style="{backgroundImage:'url('+article.pageSrc+')'}"
        ></div>
      </div>
      <div class="body clearfix">
        <el-popover placement="top-start" width="200" trigger="hover">
          <el-card>
            @{{article.author}}
            <el-button
              type="primary"
              :icon="isStar(article.author)?'el-icon-star-on':'el-icon-star-off'"
              @click="starClick(article.author)"
              v-if="user&&article.author!==user.username"
            >{{isStar(article.author)?'已关注':'关注'}}</el-button>
          </el-card>
          <el-avatar
            size="medium"
            :src="article.avatar?article.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
            slot="reference"
          ></el-avatar>
        </el-popover>

        <p class="title">{{article.title}}</p>
        <div class="content" v-html="article.content.substring(0,100)"></div>
        <time class="time">{{article.create_time|getTime}}</time>
      </div>
      <el-divider></el-divider>
      <div class="bottom clearfix">
        <div class="type">{{article.type}}</div>
        <div class="likes">
          <span style="color:deeppink">{{article.likes}}</span>
          <i class="iconfont icon-aixin"></i>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { reqStar } from "../../../http/user";
export default {
  filters: {
    getTime(value) {
      var time = new Date(value);
      return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`;
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["user", "articles"]),
    isStar() {
      return to => {
        return this.user.star ? this.user.star.includes(to) : false;
      };
    }
  },
  methods: {
    ...mapActions(["userStar"]),
    articleClick(article) {
      this.$router.push({
        name: "arts",
        params: {
          articleId: article._id
        }
      });
    },
    starClick(to) {
      if (!this.user._id) {
        this.$message({
          type: "warning",
          message: "请登录后关注"
        });
        return;
      }
      if (this.isStar(to)) {
        const info = {
          from: this.user._id,
          to,
          type: "unactive"
        };
        reqStar(info).then(res => {
          if (res.data.status === 0) {
            this.userStar({
              type: "unactive",
              to
            });
          }
        });
      } else {
        const info = {
          from: this.user._id,
          to,
          type: "active"
        };
        reqStar(info).then(res => {
          if (res.data.status === 0) {
            this.userStar({
              type: "active",
              to
            });
          }
        });
      }
    }
  }
};
</script>

<style lang="less">
.comments {
  width: 1190px;
  .box-card {
    width: 430px;
    flex: 0 1 430px;
    margin-top: 40px;
    cursor: pointer;
  }

  .el-card__body {
    position: relative;
    padding: 20px 20px 0 20px;
  }

  .el-divider--horizontal {
    margin: 0;
  }

  .el-avatar {
    position: absolute;
    left: 10px;
    top: 5px;
  }

  .box-card-image.article-image {
    position: relative;
    width: 100%;
    height: 240px;
    background-size: cover;
    background-position: center;
  }
}
</style>

<style lang='less' scoped>
@import url("http://at.alicdn.com/t/font_1822150_kuc7ggj6e38.css");

.iconfont {
  font-size: 22px;
  color: #dc3545;
}

.likes {
  text-align: right;
  float: right;
  span {
    font-size: 14px;
    vertical-align: middle;
  }
}

.comments {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}
.text {
  font-size: 14px;
}

.time {
  font-size: 13px;
  color: #999;
  position: absolute;
  right: 10px;
  top: 5px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

p {
  text-align: left;
  position: relative;
  left: 10%;
  top: -10px;
  width: 220px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #60bde8;
  font-size: 18px;
  margin-bottom: 0;
}

.content {
  font-size: 14px;
  width: 320px;
  display: -webkit-box;
  position: relative;
  left: 30px;
  top: -10px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: left;
  height: 58px;
}

.type {
  border-radius: 14px;
  padding: 2px 10px;
  float: left;
  font-size: 14px;
  background: #eaebed;
  position: relative;
  top: 4px;
}
</style>