<template>
<div>
  <h1 class="text-center">Products</h1>
  <v-row>
    <v-col cols="4" v-for="product in productsToShow" :key="product.id">
<ProductCard  :product="product" :loading="$apollo.queries.products.loading" />
</v-col>
</v-row>
    <v-pagination
      v-model="page"
      :length="length"
      :total-visible="7"
    ></v-pagination>
</div>
</template>

<script>
import gql from 'graphql-tag'
import ProductCard from './ProductCard.vue'
export default {
  name: 'HomeView',
  components: {
    ProductCard,
  },
  data() {
    return {
      name: '',
      email: '',
      index: 0,
      page: 1,
      length: 1,
      limit: 50,
      productsToShow: [],
    }
  },
  apollo: {
    products: {
   query : gql`
      query productsQuery($index: Int!, $limit: Int!) {
        products(index: $index, limit: $limit) {
          count
          products {
            id
            description1
            itemType
            notes
            isNew
            isFavorites
            code
            price {
              price {
                price
              }
            }
            categories {
              name
              id
              pictureUrl
            }
          }
        }
      }
    `,
    variables() {
      return {
        index: (this.page-1) * this.limit,
        limit: this.limit,
      }
    },
    update(data){
      this.length = Math.ceil(data.products.count / this.limit)
      this.productsToShow = data.products.products
    }
      }
  },
}
</script>

<style scoped></style>
