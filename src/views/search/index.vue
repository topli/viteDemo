<template>
  <div class="search-container h-100">
    <div class="search-content">
      <van-cell-group>
        <van-cell title="朋友圈" is-link icon="location-o" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="扫一扫" is-link icon="location-o" />
        <van-cell title="摇一摇" is-link icon="location-o" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="附近" is-link icon="location-o" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="小程序" is-link icon="location-o" />
      </van-cell-group>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style scoped lang="scss">
  .search-content {
    .van-cell-group:not(:first-child) {
      margin-top: 8px;
    }
  }
</style>
