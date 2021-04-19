<template>
  <detail-nav-bar></detail-nav-bar>
</template>

<script>
import DetailNavBar from './childComponents/DetailNavBar'
export default {
  name: 'Detail',
  data() {
    return {
      iid: null
    }
  },
  created() {
  },
  activated () {
    this.iid = this.$route.params.iid
  },
  components: {
    DetailNavBar
  }
}
</script>

<style scoped>

</style>
