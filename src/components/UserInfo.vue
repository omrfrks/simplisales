<template>
  <h1>Home</h1>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'UserInfo',
  data() {
    return {
      name: '',
      email: '',
    }
  },
  apollo: {
    user: gql`
      query {
        user {
          name
          email
        }
      }
    `,
  },
}
</script>

<style scoped></style>
