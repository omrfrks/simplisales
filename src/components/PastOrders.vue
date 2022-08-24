<template>
  <div>
    <h1 class="text-center">Past Orders</h1>
    <v-row>
      <v-col cols="12" md="4" v-for="number in skeletonLoading" :key="number">
        <v-skeleton-loader class="mx-auto" max-width="300" type="card"></v-skeleton-loader>
      </v-col>
      <v-col cols="12" md="4" v-for="order in ordersToShow" :key="order.id">
        <OrderCard :order="order" :loading="$apollo.queries.orders.loading" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import OrderCard from './OrderCard.vue'
export default {
  name: 'PastOrders',
  components: {
    OrderCard,
  },
  data() {
    return {
      name: '',
      email: '',
      ordersToShow: [],
    }
  },
  computed: {
    skeletonLoading() {
      return this.$apollo.queries.orders.loading && this.ordersToShow.length === 0 ? 50 : 0
    },
  },
  apollo: {
    orders: {
      query: gql`
        query ordersQuery {
          orders {
            id
            orderName
            orderDate
            total
            notes
            details {
              price
            }
          }
        }
      `,
      update(data) {
        this.ordersToShow = data.orders
      },
    },
  },
}
</script>

<style scoped></style>
