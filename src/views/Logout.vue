<template>
    <div class="log">

    </div>
</template>

<script>
export default {
  

    created () {
      this.$store.dispatch('userLogout')
          .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('refresh')
                this.$router.push({ name: 'Login' })
            })
          .catch((err) => {
                console.log(err)
            })
    }
}
</script>