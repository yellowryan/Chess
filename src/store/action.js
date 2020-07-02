import {
    USER_REGISTER,
    USER_LOGIN,
    ERROR_MESSAGE,
    USER_AUTO_LOGIN,
    USER_RESET,
    USER_UPDATE,
    LIKE_IMAGE_OR_ARTICLE,
    UNLIKE_IMAGE_OR_ARTICLE,
    ARTICLE_LIST,
    ONE_ARTICLE,
    USER_STAR,
    USER_UNSTAR
} from './mutation-types'
import {
    reqUserAutoLogin,
    reqArticleList
} from '../http/user'


export default {

    userRegister({
        commit
    }) {
        commit(USER_REGISTER)
    },

    userLogin({
        commit
    }, user) {
        commit(USER_LOGIN, user)
    },

    async userAutoLogin({
        commit
    }) {
        const response = await reqUserAutoLogin()
        const result = response.data
        if (result.status === 1) {
            commit(USER_RESET)
        } else {
            commit(USER_AUTO_LOGIN, result.data)
        }
    },

    userUpdate({
        commit
    }, user) {
        commit(USER_UPDATE, user)
    },

    userStar({
        commit
    }, {
        type,
        to
    }) {
        if (type === 'active') {
            commit(USER_STAR, {
                to
            })
        } else if (type === 'unactive') {
            commit(USER_UNSTAR, {
                to
            })
        }
    },

    likeImageOrArticle({
        commit
    }, {
        id,
        kind
    }) {
        commit(LIKE_IMAGE_OR_ARTICLE, {
            id,
            kind
        })
    },

    unlikeImageOrArticle({
        commit
    }, {
        id,
        kind
    }) {
        commit(UNLIKE_IMAGE_OR_ARTICLE, {
            id,
            kind
        })
    },

    articleList({
        commit
    }, page) {
        const newPage = page + 1
        reqArticleList(newPage).then(res => {
            if (res.data.status === 0) {
                commit(ARTICLE_LIST, res.data.data)
            } else {
                commit(ERROR_MESSAGE, res.data.msg)
            }
        })
    },

    oneArticle({
        commit
    }, art) {
        commit(ONE_ARTICLE, art)
    }
}