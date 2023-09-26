const { createSlice } = require("@reduxjs/toolkit")
import api from "@/Utilities/products"


const initialState = {
    products: [],
    selectedCategory: "all"
}
const productSlice = createSlice({
    name: "products",

    initialState,

    reducers: {
        add(state, action) {
            state.products.push(action.payload)
        },
        reset(state) {
            state.products.length = 0;
        },
        setSelectedCategory(state, action) {
            state.selectedCategory = action.payload;
        },
    }
})

export const fetchProductByCategory = (category) => async (dispatch) => {
    try {
        if (category == "all") {
            const response = await api.allProducts()
            const products = response.products
            dispatch(reset())
            dispatch(add(products))

        }
        else {
            const response = await api.categories(category)
            const products = response.products
            dispatch(reset())
            dispatch(add(products))
        }

    } catch (error) {
        console.error('Error fetching products', error)
    }
}

export const { add, reset, setSelectedCategory } = productSlice.actions;
export default productSlice.reducer;