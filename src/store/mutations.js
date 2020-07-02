import {
    USER_REGISTER,
    USER_LOGIN,
    USER_AUTO_LOGIN,
    ERROR_MESSAGE,
    USER_RESET,
    USER_UPDATE,
    LIKE_IMAGE_OR_ARTICLE,
    UNLIKE_IMAGE_OR_ARTICLE,
    ARTICLE_LIST,
    ONE_ARTICLE,
    USER_STAR,
    USER_UNSTAR
} from "./mutation-types";




export default {
    [USER_REGISTER](state) {
        state.user = {}
    },

    [USER_LOGIN](state, user) {
        state.user = user
    },

    [ERROR_MESSAGE](state, msg) {
        state.message = msg
    },

    [USER_AUTO_LOGIN](state, user) {
        state.user = user
    },

    [USER_RESET](state) {
        state.user = {}
    },

    [USER_UPDATE](state, user) {
        state.user = {}
        state.user = user
    },

    [USER_STAR](state, { to }) {
        state.user.star.push(to)
    },

    [USER_UNSTAR](state, { to }) {
        var index = state.user.star.indexOf(to)
        state.user.star.splice(index, 1)
    },

    [LIKE_IMAGE_OR_ARTICLE](state, {
        id,
        kind
    }) {
        if (kind === 'image') {
            if (!state.user.likeImages.includes(id)) {
                state.user.likeImages.push(id)
            }
        } else {
            if (!state.user.likeArticles.includes(id)) {
                state.user.likeArticles.push(id)
                var articles = JSON.parse(sessionStorage.getItem('articles') || "[]")
                articles.forEach(article => {
                    if (article._id === id) {
                        ++article.likes;
                    }
                })
                window.sessionStorage.setItem('articles', JSON.stringify(articles))
            }
        }
    },

    [UNLIKE_IMAGE_OR_ARTICLE](state, {
        id,
        kind
    }) {
        if (kind === 'image') {
            if (state.user.likeImages.includes(id)) {
                var index = state.user.likeImages.indexOf(id)
                state.user.likeImages.splice(index, 1)
            }
        } else {
            if (state.user.likeArticles.includes(id)) {
                var index = state.user.likeArticles.indexOf(id)
                state.user.likeArticles.splice(index, 1)
                var articles = JSON.parse(sessionStorage.getItem('articles') || "[]")
                articles.forEach(article => {
                    if (article._id === id) {
                        --article.likes;
                    }
                })
                window.sessionStorage.setItem('articles', JSON.stringify(articles))
            }
        }

    },

    [ARTICLE_LIST](state, data) {
        state.articles.page += 1
        if (!window.sessionStorage.getItem('articles')) {
            window.sessionStorage.setItem('articles', JSON.stringify(data))
            state.articles.list.push(...data)
        } else {
            var arts = JSON.parse(window.sessionStorage.getItem('articles'))
            var newArts = arts.push(...data)
            window.sessionStorage.setItem('articles', JSON.stringify(newArts))
        }
    },

    [ONE_ARTICLE](state, art) {
        state.articles.list.forEach(article => {
            if (article._id === art._id) {
                article.likes = art.likes
            }
        })
    }
}