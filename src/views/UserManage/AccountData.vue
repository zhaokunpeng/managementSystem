<!--账户管理-->
<template>
  <div class="account-data">

  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
//import AddAccount from "./AddAccount.vue";
@Component({
  components: {  }
})
export default class AccountData extends Vue {

}
</script>

<style lang="scss" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>
