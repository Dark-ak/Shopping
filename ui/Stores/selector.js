import { createSelector } from "reselect";

const selectProductSlice = (state) => state.products 
const selectSelectedCategory = (state) => state.products.selectedCategory


export const selectProducts = createSelector(
    selectProductSlice,
    (productSlice) => productSlice.products
)

export const selectFilteredProducts = createSelector(
    selectProducts,
    selectSelectedCategory,

    (products, selectedCategory) => {
        return products
    }
)