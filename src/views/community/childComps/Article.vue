<template>
  <div id="content" class="content">
    <div class="graphic-content-container photos_index_layout">
      <div class="graphic-head-region">
        <div class="head-img-region">
          <div
            class="head-img copyright-contextmenu"
            :style="{backgroundImage:'url('+articleMessage[0].pageSrc+')'}"
          ></div>
        </div>
        <div class="top-content-container main_container">
          <div class="graphic-title">{{articleMessage[0].title}}</div>
          <div class="action-container photo_sidebar">
            <heart @click.native.stop="likeHandle" :artId="articleId">
              <div slot="like-count" class="likeCount" id="likeCount2">{{articleMessage[0].likes}}</div>
            </heart>
          </div>
        </div>
        <div class="graphic-author">
          <a href>{{articleMessage[0].author}}</a>
        </div>
        <div class="tags-container">
          <span class="tags-per">{{articleMessage[0].type}}</span>
        </div>
        <div class="other-data-container">
          <span class="time-ago">{{articleMessage[0].create_time|getTime}}</span>
        </div>
      </div>
      <div class="graphic-main-content-region">
        <div class="main-content-container">
          <div class="contents" v-html="articleMessage[0].content"></div>
        </div>
      </div>
      <div class="comment-container">
        <div class="photo_activity_section">
          <div class="new_comment_sticky_placeholder">
            <div class="new_comment_container" :class="{'login_out':user&&!user._id}">
              <div class="photographer_info comment new">
                <div class="commentleft">
                  <a class="avatar new_comment__avatar" href="javascript:void(0)">
                    <img
                      :src="user&&user.avatar?user.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                      alt
                    />
                  </a>
                  <div class="comment_icon" @click="sendComment"></div>
                </div>
                <div class="commentright">
                  <textarea
                    class="new_comment"
                    maxlength="300"
                    rows="1"
                    placeholder="发表您的想法"
                    v-model.trim="comment"
                  ></textarea>
                  <span class="signup">
                    <a href="javascript:void(0)" @click="login">登录</a>
                    并分享您的想法
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="comments_region">
            <ul class="comments-contain">
              <li v-for="(comment,index) in commentsList" :key="comment._id" class="comment-li">
                <ul class="replies">
                  <li v-for="(reply,index2) in comment.replies" :key="reply._id">
                    <div class="comment_container">
                      <div
                        class="reply_line"
                        :class="{'hidden':comment.replies.length>=1&&index2!==comment.replies.length-1?false:true}"
                      ></div>
                      <div class="photographer_info comment">
                        <div class="commentleft">
                          <a href="javascript:void(0)" class="avatar new_comment_avatar">
                            <img
                              :src="reply.avatar?reply.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                              alt
                            />
                          </a>
                        </div>
                        <div class="commentright">
                          <div class="comment_body">
                            <span class="info">
                              {{reply.creator}}
                              <span
                                v-if="comment.replies.length>1&&index2!==0"
                              >回复了{{comment.replies[currentIndex]?comment.replies[currentIndex].creator:''}}</span>
                            </span>
                            <div class="body_text">{{reply.content}}</div>
                          </div>
                          <a
                            v-if="user&&user._id"
                            href="javascript:void(0)"
                            class="reply"
                            id="reply"
                            @click="replyClick(index, index2)"
                          >回复</a>
                          <div class="comment_date">{{reply.create_time|formate}}</div>
                          <a
                            href="javascript:void(0)"
                            class="delete"
                            v-if="reply.creator===user.username"
                            @click="deleteComment(comment._id,reply._id,index2)"
                          >删除</a>
                        </div>
                      </div>
                    </div>
                    <div
                      class="new_reply_container hidden"
                      v-if="index2===comment.replies.length-1"
                    >
                      <div class="photographer_info comment new">
                        <div class="commentleft">
                          <a class="avatar new_comment__avatar" href="javascript:void(0)">
                            <img
                              :src="user&&user.avatar?user.avatar:'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'"
                              alt
                            />
                          </a>
                          <div
                            class="comment_icon"
                            @click="sendReplyComment(comment._id,reply.creator)"
                          ></div>
                        </div>
                        <div class="commentright">
                          <textarea
                            class="new_comment"
                            maxlength="300"
                            rows="1"
                            :placeholder="`回复 ${comment.replies[currentIndex]?comment.replies[currentIndex].creator:''}`"
                            v-model.trim="replyComment"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <register :isShow="loginShow" @closeLogin="closeLogin" :path="$route.path"></register>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Register from "../../../components/common/register/Register";
import Heart from "../../../components/common/heart/Heart";
import { myMixin } from "../../../mixins/mixins";
import {
  reqLikeImg,
  reqOneArticle,
  reqComment,
  reqGetComments,
  reqReplyComment,
  reqDeleteComment
} from "../../../http/user";
import { dateFormate } from "../../../utils/utils";
export default {
  name: "arts",
  mixins: [myMixin],
  components: {
    Heart,
    Register
  },
  filters: {
    getTime(value) {
      var time = new Date(value);
      return `${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}`;
    },
    formate(value) {
      let date = new Date(value);
      return dateFormate("YYYY-mm-dd HH:MM", date);
    }
  },
  data() {
    return {
      articleId: "",
      articleMessage: null,
      comment: "",
      replyComment: "",
      commentsList: null,
      isShow: false,
      currentIndex: 0
    };
  },
  computed: {
    ...mapState(["user", "articles"]),
    isLikedArticle() {
      return this.user.likeArticles.includes(this.articleId);
    },
    currentArticle() {
      return this.articles.list.filter(article => {
        return article._id === this.articleId;
      });
    }
  },
  methods: {
    login() {
      this.loginShow = true;
    },
    likeHandle() {
      if (!this.user._id) {
        this.$message({
          type: "warning",
          message: "请登录后点赞"
        });
        return false;
      }
      if (this.isLikedArticle) {
        const info = {
          from: this.user._id,
          to: this.articleId,
          type: "unactive",
          kind: "article"
        };
        reqLikeImg(info).then(res => {
          this.$store.dispatch("unlikeImageOrArticle", {
            id: res.data.data,
            kind: "article"
          });
          reqOneArticle(res.data.data).then(res2 => {
            this.$store.dispatch("oneArticle", res2.data.data);
          });
          this.$notify.success({
            message: "取消点赞成功",
            position: "top-right",
            duration: 3000
          });
        });
      } else {
        const info = {
          from: this.user._id,
          to: this.articleId,
          type: "active",
          kind: "article"
        };
        reqLikeImg(info).then(res => {
          this.$store.dispatch("likeImageOrArticle", {
            id: res.data.data,
            kind: "article"
          });
          reqOneArticle(res.data.data).then(res2 => {
            this.$store.dispatch("oneArticle", res2.data.data);
          });
        });
      }
    },
    reqArts() {
      if (this.articles.list.length !== 0) {
        this.articleMessage = this.articles.list.filter(article => {
          return article._id === this.articleId;
        });
      }
    },
    reqComments() {
      reqGetComments(this.articleId).then(res => {
        this.commentsList = res.data.data;
      });
    },
    sendComment() {
      console.log(!this.user);
      if (!this.user._id) {
        return;
      }
      if (!this.comment) {
        this.$message({
          type: "warning",
          message: "评论不能为空"
        });
      } else {
        const info = {
          creator: this.user.username,
          avatar: this.user.avatar,
          content: this.comment,
          articleId: this.articleId
        };
        reqComment(info).then(res => {
          this.comment = "";
          this.reqComments();
        });
      }
    },
    sendReplyComment(commentId, toUsername) {
      if (!this.replyComment) {
        this.$message({
          type: "warning",
          message: "回复消息不能为空"
        });
        return;
      }
      const info = {
        from: this.user._id,
        to: commentId,
        content: this.replyComment,
        fromUsername: this.user.username,
        toUsername,
        avatar: this.user.avatar
          ? this.user.avatar
          : "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      };
      reqReplyComment(info).then(res => {
        this.reqComments();
      });
    },
    replyClick(index, index2) {
      this.currentIndex = index2;
      $(".comments-contain")
        .children()
        .eq(index)
        .find(".new_reply_container")
        .toggleClass("hidden");
      $(".comments-contain")
        .children()
        .eq(index)
        .siblings()
        .find(".new_reply_container")
        .addClass("hidden");
      this.replyComment = "";
    },
    deleteComment(mainId, subId, index2) {
      this.$confirm("此操作将删除评论, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (index2 >= 1) {
            const info = {
              mainId,
              subId,
              type: "sub",
              articleId: this.articleId
            };
            reqDeleteComment(info).then(res => {
              this.reqComments();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          } else {
            const info = {
              mainId,
              subId,
              type: "main",
              articleId: this.articleId
            };
            reqDeleteComment(info).then(res => {
              this.reqComments();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    window.scrollTo(0, 0);
    this.articleId = this.$route.params.articleId;
    this.reqArts();
    this.reqComments();
  },
  mounted() {
    console.log(this.$route.path);
    window.scrollTo(0, 0);
    $(function() {
      $(".comments-contain")
        .on("mouseenter", ".comment_container", function() {
          $(this)
            .find(".delete")
            .css("display", "inline-block");
        })
        .on("mouseleave", ".comment_container", function() {
          $(this)
            .find(".delete")
            .css("display", "none");
        });
    });
  },
  updated() {
    $(function() {
      $(".graphic-main-content-region")
        .find("img")
        .css({
          width: "100%",
          height: "auto"
        });
    });
  }
};
</script>

<style lang="less" scoped>
.hidden {
  display: none !important;
}
#content .el-button {
  height: 30px;
}

.photos_index_layout {
  text-align: center;
  background-color: #f7f8fa;
  width: 100%;
  height: 100%;
}
.graphic-content-container {
  background-color: #fff;
}

.graphic-head-region {
  background-color: #fff;
  .head-img-region {
    position: relative;
    .head-img {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      display: block;
      height: 430px;
    }
  }
  .top-content-container {
    margin-top: 20px;
    margin-bottom: 15px;
    width: 100%;
    position: relative;
    .graphic-title {
      width: 650px;
      margin: 0 auto;
      text-align: center;
      font-size: 20px;
      color: #222;
      line-height: 30px;
    }
    .action-container {
      position: absolute;
      right: 10%;
      top: -20px;
      overflow-x: inherit;
      overflow-y: inherit;
      border: none;
    }
  }
  .graphic-author {
    width: 250px;
    margin: 0 auto;
    height: 25px;
    line-height: 25px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: #525558;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .tags-container {
    margin-top: 15px;
    width: 100%;
    text-align: center;
    height: 20px;
    .tags-per {
      display: inline-block;
      width: 80px;
      height: 24px;
      font-size: 16px;
      border-radius: 12px;
      background-color: #eaebed;
    }
  }
  .other-data-container {
    padding: 20px 0;
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #b8c1c8;
  }
}

.graphic-main-content-region {
  background-color: #f7f8fa;
  border: solid 1px #eeeff2;
  width: 100%;
  height: auto;
  padding-top: 20px;
  padding-bottom: 30px;
  .main-content-container {
    width: 640px;
    margin: 0 auto;
    .contents {
      text-align: left;
      .part {
        margin: 20px 0;
      }
    }
  }
}

.comment-container {
  width: 640px;
  margin: 0 auto;
  padding-top: 30px;
  .photo_activity_section {
    min-height: 300px;
    text-align: left;
    height: 100%;
    position: relative;
    .new_comment_sticky_placeholder {
      .new_comment_container {
        padding: 10px 20px;
        max-height: 100%;
        width: 100%;
        background-color: #fff;
        .photographer_info {
          overflow: hidden;
          .commentleft {
            float: left;
            width: 22px;
            height: 22px;
            .comment_icon {
              cursor: pointer;
              position: absolute;
              top: 18px;
              right: 55px;
              z-index: 1;
              width: 25px;
              height: 25px;
              background-image: url(https://node.500px.me/images/comment/reply.svg);
              background-size: 16px;
              background-repeat: no-repeat;
              background-position: center center;
              display: inline-block;
            }
          }
          .commentright {
            width: calc(100% - 55px);
            width: -webkit-calc(100% - 55px);
            padding-left: 10px;
            float: left;
            .new_comment {
              overflow: hidden;
              word-wrap: break-word;
              height: 16px;
              position: relative;
              padding: 10px 30px 10px 10px;
              line-height: 1.4em;
              max-height: 75px;
              font-size: 12px;
              border: 1px solid #eeeff2;
              box-sizing: content-box;
              width: calc(100% - 39px);
              resize: none;
              border-radius: 6px;
              width: 500px;
            }
          }
          .new_comment__avatar {
            margin-top: 10px;
          }
          .avatar.new_comment__avatar {
            width: 22px;
            height: 22px;
          }
          .avatar img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        &.login_out {
          .new_comment__avatar,
          .new_comment {
            display: none;
          }
          .comment_icon {
            left: 27px;
          }
          .signup {
            display: inline-block;
          }
        }
        .signup {
          line-height: 1.4em;
          font-size: 12px;
          color: #b9c1c7;
          display: none;
          width: calc(100% - 39px);
          padding: 8px 0 0 10px;
          height: 34px;
          background-color: #fff;
        }
      }
    }
    .comments_region {
      .replies {
        li {
          padding-top: 10px;
          .reply_line {
            border: 1px solid rgba(185, 193, 199, 0.5);
            width: 1px;
            position: absolute;
            top: 22px;
            left: 29px;
            height: 100%;
          }
        }
      }
      .comment_container,
      .new_reply_container {
        padding-left: 20px;
        position: relative;
      }
      .comment_container {
        .photographer_info {
          overflow: hidden;
          .commentleft {
            float: left;
            width: 22px;
            height: 22px;
            .avatar.new_comment_avatar {
              width: 22px;
              height: 22px;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                vertical-align: top;
              }
            }
          }
          .commentright {
            padding-left: 10px;
            float: left;
            width: 100%;
            width: calc(100% - 55px);
            padding-right: 5px;
            .comment_body {
              font-size: 12px;
              line-height: 1.4em;
              font-weight: 400;
              color: #525558;
              padding-right: 20px;
              word-wrap: break-word;
              .info {
                width: 100%;
                margin-bottom: 2px;
                color: #000;
              }
            }
            a.reply {
              transition: opacity 0.2s ease-out, color 0.2s ease-out;
              font-size: 12px;
              float: left;
              &:link {
                color: #0099e5;
              }
              &:visited {
                color: #0099e5;
              }
            }
            .comment_date {
              display: inline-block;
              font-size: 12px;
              color: #b9c1c7;
              line-height: 20px;
              float: left;
              margin-left: 4px;
            }
            a.delete {
              display: none;
              float: right;
              line-height: 20px;
              transition: opacity 0.2s ease-out, color 0.2s ease-out;
              font-size: 12px;
              text-decoration: none;
              &:link {
                color: #ef4546;
              }
              &:visited {
                color: #ef4546;
              }
            }
          }
        }
      }
      .new_reply_container {
        padding-top: 10px;
        .photographer_info {
          overflow: hidden;
          .avatar {
            display: inline-block;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }
          .commentleft {
            float: left;
            width: 22px;
            height: 22px;
            .comment_icon {
              cursor: pointer;
              position: absolute;
              top: 18px;
              right: 55px;
              z-index: 1;
              width: 25px;
              height: 25px;
              background-image: url(https://node.500px.me/images/comment/reply.svg);
              background-size: 16px;
              background-repeat: no-repeat;
              background-position: center center;
              display: inline-block;
            }
          }
          .commentright {
            padding-left: 10px;
            float: left;
            width: calc(100% - 55px);
            .new_comment {
              overflow: hidden;
              word-wrap: break-word;
              height: 16px;
              position: relative;
              padding: 10px 30px 10px 10px;
              line-height: 1.4em;
              max-height: 75px;
              font-size: 12px;
              border: 1px solid #eeeff2;
              box-sizing: content-box;
              width: calc(100% - 39px);
              resize: none;
              border-radius: 6px;
            }
          }
          .avatar.new_comment__avatar {
            width: 22px;
            height: 22px;
          }
        }
      }
    }
  }
}
</style>