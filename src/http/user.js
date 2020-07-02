import { ajax } from './ajax'

const BASE_URL = '/api'

//用户注册
export const reqUserRegister = (user) => ajax(`${BASE_URL}/register`, user, "POST")

export const reqUserLogin = (user) => ajax(`${BASE_URL}/login`, user, "POST")

export const reqUserAutoLogin = () => ajax(`${BASE_URL}/autologin`)

export const reqTopPosts = (number) => ajax(`${BASE_URL}/topposts`, { number })

export const reqPhotoList = (type, page) => ajax(`${BASE_URL}/photos/photolist`, { type, page })

export const reqImgUpload = (formdata) => ajax(`${BASE_URL}/photos/upload`, formdata, "POST")

export const reqVlogList = (word) => ajax(`${BASE_URL}/vlogs/vloglist`, { word })

export const reqUserModify = (user) => ajax(`${BASE_URL}/modifyinfo`, user, "POST")

export const reqLikeImg = ({ from, to, type, kind }) => ajax(`${BASE_URL}/photos/likeimg`, { from, to, type, kind }, "POST")

export const reqArticle = (article) => ajax(`${BASE_URL}/article`, article, "POST")

export const reqStar = (info) => ajax(`${BASE_URL}/userstar`, info, "POST")

export const reqArticleList = (page) => ajax(`${BASE_URL}/articlelist`, { page })

export const reqOneArticle = (artId) => ajax(`${BASE_URL}/onearticle`, { artId })

export const reqComment = (comment) => ajax(`${BASE_URL}/comment`, comment, "POST")

export const reqGetComments = (articleId) => ajax(`${BASE_URL}/getcomments`, { articleId })

export const reqReplyComment = (comment) => ajax(`${BASE_URL}/replycomment`, comment, "POST")

export const reqDeleteComment = ({ mainId, subId, type, articleId }) => ajax(`${BASE_URL}/deletecomment`, { mainId, subId, type, articleId }, "POST")

export const reqVlogUpload = (formdata) => ajax(`${BASE_URL}/photos/upload`, formdata, "POST")

export const reqVlog = ({ type, vlogSrc }) => ajax(`${BASE_URL}/vlogs/vlogupload`, { type, vlogSrc }, "POST")

export const reqExhibits = (userId) => ajax(`${BASE_URL}/exhibits`, { userId }, "POST")

export const reqImage = ({ author, photoSrc }) => ajax(`${BASE_URL}/image`, { author, photoSrc }, "POST")