<template>
  <header class="navbar"></header>
</template>

<script>
import firebase from 'firebase/app'
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle'])
  },
  methods: {
    async logout() {
      await firebase.auth().signOut()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.navbar {
  position: relative;
  height: 156px;
  background-color: #5CA5A5;
  background-image: url('../assets/img/header-background.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media (max-width: 500px) {
    background-image: url('../assets/img/header-background-mobile.png');
  }
}
</style>
