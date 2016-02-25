
/******** callHandler - js call bc *******/



/********* registerHandler - oc call js -*******/

// get user info from app
export let CALL_HANDLER_GET_USER_INFO = 'getUserInfoFromApp'

// call out login panel
export let CALL_HANDLER_CALL_OUT_LOGIN_PANEL = 'callOutLoginPanel'

//notify app to checkout
export let CALL_HANDLER_CHECKOUT = 'notifyAppToCheckout'

// share to social circle
export let  CALL_HANDLER_SHARE = 'shareToSocialCircle'

// for router
export let ROUTER_SHOPPING_CART_SCAN = 'scan'
export let ROUTER_SHOPPING_CART_EDIT = 'edited'
export let ROUTER_RECIEVER_INFO_SCAN = 'scan'
export let ROUTER_RECIEVER_INFO_EDIT = 'edited'
export let UNDERWEAR_BRA_SIZE = ['A', 'B', 'C', 'D']
export let UNDERWEAR_BASE_SIZE = ['70', '75', '80', '85']

/********************************url**********************************/

// base directory
export let FETCH_BASE_URL = '/app'

// fetch scenes data for index page
export let FETCH_INDEX_DATA = FETCH_BASE_URL + '/get_all_scenes_goods'

// fetch goods data for list page
export let FETCH_GOODS = FETCH_BASE_URL + '/goods_filter'


// fetch cities by province id
export let FETCH_CITIES = FETCH_BASE_URL + '/get_province_city'

// fetch receiver info by receiverInfoId
export let FETCH_RECEIVER_INFO = FETCH_BASE_URL + '/get_address'


// test Cookie token
export let TEST_TOKEN = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2IiwiaWF0IjoxNDUzODg1MjM3LCJleHAiOjE3NjkyNDUyMzd9.chIaWYg_3_Y9wuMMuYGluDtjDxDz7kDxdXGebpP1cX4'
export let MIDOU_TOKEN = 'x-midou-token'
export let NOT_LOGIN_ERROR = 'use is not login'
