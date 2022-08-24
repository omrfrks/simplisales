<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-card-title>{{ order.orderName }}</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">$ {{ order.details.reduce((acc, detail) => acc + detail.price, 0) }}</div>
      <v-row>
        <v-chip class="mr-6">
          {{ new Date(order.orderDate).toLocaleString() }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'OrderCard',
  props: {
    order: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
