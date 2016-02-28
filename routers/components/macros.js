
/******** callHandler - js call bc *******/



/********* registerHandler - oc call js -*******/

// get user info from app
export let CALL_HANDLER_GET_USER_INFO = 'userInfoCallback'

// call out login panel
export let CALL_HANDLER_CALL_OUT_LOGIN_PANEL = 'callOutLoginPanel'

//notify app to checkout
export let CALL_HANDLER_CHECKOUT = 'orderInfoCallback'

// share to social circle
export let  CALL_HANDLER_SHARE = 'shareInCallback'
//export let  CALL_HANDLER_ = 'shareInCallback'

// for router
export let ROUTER_SHOPPING_CART_SCAN = 'scan'
export let ROUTER_SHOPPING_CART_EDIT = 'edit'
export let ROUTER_RECIEVER_INFO_ADD = 'add'
export let ROUTER_RECIEVER_INFO_EDIT = 'edit'
export let UNDERWEAR_BRA_SIZE = ['A', 'B', 'C', 'D']
export let UNDERWEAR_BASE_SIZE = ['70', '75', '80', '85']
export let UNDERWEAR_SIZE = ['S', 'M', 'L', 'XL']
export let UNDERWEAR_TAGS = [
    {id: "1", name:  "聚拢"},
    {id: "2", name:  "无痕"},
    {id: "3", name:  "侧收"},
    {id: "4", name:  "美背"},
    {id: "5", name:  "薄杯"},
    {id: "6", name:  "运动"},
    {id: "7", name:  "无钢圈"},
    {id: "8", name:  "情趣"},
    {id: "9", name:  "底裤"}
]
export let UNDERWEAR_TYPES = [
    {id: "1", name:  "内衣"},
    {id: "2", name:  "底裤"},
    {id: "3", name:  "情趣"}
]
export let CHEST_FEATRUES_1 = [
    {id: "1", name:  "聚拢"},
    {id: "2", name:  "正中"},
    {id: "3", name:  "外扩"}
]
export let CHEST_FEATRUES_2 = [
    {id: "1", name:  "翘挺"},
    {id: "2", name:  "一般"},
    {id: "3", name:  "松软"}
]
export let CHEST_FEATRUES_3 = [
    {id: "1", name:  "小底盘"},
    {id: "2", name:  "中等底盘"},
    {id: "3", name:  "大底盘"}
]
export let CHEST_FEATRUES_4 = [
    {id: "1", name:  "无副乳"},
    {id: "2", name:  "稍有副乳"},
    {id: "3", name:  "副乳明显"}
]
export let CHEST_FEATRUES_5 = [
    {id: "1", name:  "薄杯"},
    {id: "2", name:  "中厚"},
    {id: "3", name:  "超厚"}
]
export let CHEST_FEATRUES_6 = [
    {id: "1", name:  "彩虹"},
    {id: "2", name:  "性冷淡"},
    {id: "3", name:  "成熟"}
]
export let CHEST_FEATRUES_7 = [
    {id: "1", name:  "简洁"},
    {id: "2", name:  "大件重工"},
    {id: "3", name:  "轻薄性感"}
]


/********************************url**********************************/
export let BASE_PAGE_DIR = '/app-page'

export let BASE_STATIC_DIR = '/app-static'
// ajax base directory
export let FETCH_BASE_URL = '/app'

// fetch scenes data for index page
export let FETCH_INDEX_DATA = FETCH_BASE_URL + '/get_all_scenes_goods'

// fetch goods data for list page
export let FETCH_GOODS = FETCH_BASE_URL + '/goods_filter'

//fetch good's detail
export let FETCH_GOOD = FETCH_BASE_URL + '/get_goods_detail'

// fetch cities by province id
export let FETCH_CITIES = FETCH_BASE_URL + '/get_province_city'

// fetch receiver info by receiverInfoId
export let FETCH_RECEIVER_INFO = FETCH_BASE_URL + '/get_address'
export let PUT_RECEIVER_INFO = FETCH_BASE_URL + '/set_address'

export let FETCH_CARTS = FETCH_BASE_URL + '/get_cart_page'
export let PUT_TO_CART = FETCH_BASE_URL + '/add_to_cart'
export let PUT_BOX_SERVICE = FETCH_BASE_URL + '/add_try_cart'
export let DELETE_BOX_SERVICE = FETCH_BASE_URL + '/delete_try_cart'
export let EDIT_CART_GOODS = FETCH_BASE_URL + '/edit_cart'
export let EDIT_CART_GOODS_BY_IDS = FETCH_BASE_URL + '/get_cart'

export let DELETE_CART_GOODS = FETCH_BASE_URL + '/delete_cart'
// test Cookie token
export let TEST_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNDUzODg1MjM3LCJleHAiOjE3NjkyNDUyMzd9.chIaWYg_3_Y9wuMMuYGluDtjDxDz7kDxdXGebpP1cX4'
export let MIDOU_TOKEN_NAME = 'x-midou-token'
export let NOT_LOGIN_ERROR = 'use is not login'






export let FETCH_STATUS_NO_MORE_PRODUCT = '2001'
export let FETCH_SUCCESS = '0'
