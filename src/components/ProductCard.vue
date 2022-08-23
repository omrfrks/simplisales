<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear color="deep-purple" height="10" indeterminate></v-progress-linear>
    </template>

    <v-card-title>{{ product.description1 }}</v-card-title>

    <v-card-text>
      <div class="my-4 text-subtitle-1">$ {{ product.price?.price?.price }}</div>
      <v-row>
        <v-chip v-for="category in product.categories" :key="category.id" class="mr-6">
          <v-avatar left v-if="category.pictureUrl"><v-img :src="category.pictureUrl"></v-img></v-avatar>
          {{ category.name }}
        </v-chip>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    product: {
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
