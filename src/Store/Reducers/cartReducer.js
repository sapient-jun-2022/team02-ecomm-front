import { ADD_CART, CLEAR_CART, DELETE_CART, RETERIVE_CART, UPDATE_CART } from "../Config/cartConfig";

const InitialState = {
    products:[],
    total:0
}

function cartReducer(state=InitialState,action){
    switch(action.type){
        case ADD_CART:
            const products = [...state.products];
            const findIndex = products.findIndex((_p)=>_p.productId==action.payload.product._id);
            const product = products[findIndex];
            if(product){
                product.quantity += action.payload.product.quantity;
                product.price = action.payload.product.price;
                products[findIndex] = product;
            }else{
                const productId = action.payload.product._id;
                products.push({...action.payload.product,productId});
            }
            const total = products.reduce((total,product)=>(total += +parseFloat(product.quantity * product.price).toFixed(2)),0);
            return {products,total};
            break;
        case DELETE_CART:
            return state;
            break;
        case UPDATE_CART:
            return state;
            break;
        case RETERIVE_CART:
            return action.payload;
        case CLEAR_CART:
            return InitialState;
        default:
            return state;
    }
}

export default cartReducer;