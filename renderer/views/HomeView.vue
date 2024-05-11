<template>
  <div class="layout">
    
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  components: {
    
  },
  data() {
    return {

    }
  },
  computed: {
  },
  mounted() {

  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.layout {
  text-align: center;
  ul {
    padding: 0;
    list-style: none;
  }
  .thinking {
    display: flex;
    padding: 10px;
    justify-content: space-between;
    .user-info {
      display: flex;
      .avatar {
        display: inline-block;
        width: 3em;
        height: 3em;
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 5px 1px rgba(230, 230, 230, .5);
        img {
          object-fit: cover;
          width: 100%;
        }
      }
      .username {
        display: inline-block;
        margin-left: 10px;
        font-size: 16px;
        font-weight: bold;
      }
      .link-btn {
        display: inline-block;
        margin-left: 10px;
        border-radius: 5px;
        font-size: 12px;
        text-decoration: none;
        color: royalblue;
        font-weight: bold;
      }
    }
    .count-timer {
      font-weight: bold;
      .count-timer-val {
        
        color: rgb(219, 148, 26);
      }
    }
  }
}
</style>

