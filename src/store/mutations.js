import { setStore, getStore } from '../utils/storage'

const INIT_BUYCART = 'INIT_BUYCART'
const ADD_CART = 'ADD_CART'
const GET_USERINFO = 'GET_USERINFO'
const RECORD_USERINFO = 'RECORD_USERINFO'
const ADD_ANIMATION = 'ADD_ANIMATION'
const SHOW_CART = 'SHOW_CART'
const REDUCE_CART = 'REDUCE_CART'
const EDIT_CART = 'EDIT_CART'

export default {
    // 网页初始化时从本地缓存获取购物车数据
    [INIT_BUYCART](state){
        let initCart = getStore('buyCart');
        if(initCart){
            state.cartList = JSON.parse(initCart);
        }
    },

    // 加入购物车
    [ADD_CART](state,{productId,productPrice,productName,productImg,productNum = 1}){
        // 购物车
        let cart = state.cartList;
        let falg = true;
        let goods = {
            productId,
            productPrice,
            productName,
            productImg,
        }
        // 判断有无物品
        if(cart.length){
            cart.forEach(element => {
                if(item.productId == productId){
                    if(item.productNum >= 0){
                        falg = false;
                        item.productNum += productNum;
                    }
                }
            });
        }
        if(!cart.length || falg){
            goods.productNum = productNum;
            goods.checked = '1';
            cart.push(goods);
        }
        state.cartList = cart;
        // 存入localStorage
        setStore('buyCart',cart);
    },

    // 加入购物车动画
    [ADD_ANIMATION](state,{moveShow,elLeft,elTop,img,cartPositionT,cartPositionL,receiveInCart}){
        state.showMoveImg = moveShow
        if(elLeft){
            state.elLeft = elLeft;
            state.elTop = elTop;
        }
        state.moveImgUrl = img;
        state.receiveInCart = receiveInCart;
        if(cartPositionT){
            state.cartPositionT = cartPositionT
            state.cartPositionL = cartPositionL
        }
    },

    // 是否显示购物车
    [SHOW_CART](state,{showCart}){
        state.showCart = showCart;
    },

    // 移出商品
    [REDUCE_CART](state,{productId}){
        let cart = state.cartList;
        cart.forEach((item,index) => {
            if(item.productId == productId){
                if(item.productNum > 1){
                    item.productNum--;
                }else{
                    cart.splice(index,1);
                }
            }
        })
        state.cartList = cart;
        // 存入localStorage
        setStore('buyCart',cart);
    },

    //修改购物车
    [EDIT_CART](state,{productId,productNum,checked}){
        let cart = state.cartList;
        if(productNum){
            cart.forEach((item,index) => {
                if(item.productId == productId){
                    item.productId == productNum;
                    item.checked = checked;
                }
            });
        }else if(productId){
            cart.forEach((item,index) => {
                if(item.productId == productId){
                    cart.splice(index,1);
                }
            });
        }
    }
}


