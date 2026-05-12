<script setup lang="ts">
type TodayMenuItem = {
    id: number;
    name: string;
    image: string;
    quantity: number;
};
const todayMenu: TodayMenuItem[] = [
    {
        id: 1,
        name: "番茄炒蛋",
        image: "/static/images/home/thumb_tomato_egg.png",
        quantity: 1
    },
    {
        id: 2,
        name: "鸡蛋面",
        image: "/static/images/home/thumb_egg_noodles.png",
        quantity: 1
    }
];
function handleGoTodayMenu() {
    uni.switchTab({
        url: "/pages/cart/index"
    });
}
</script>

<template>
    <view class="fixed bottom-8 left-0 right-0 z-99 px-4">
        <view class="rounded-32rpx bg-white p-32rpx shadow-[0_10rpx_36rpx_rgba(80,45,20,0.08)]">
            <view class="flex items-center justify-between">
                <view class="flex items-center">
                    <view class="mr-14rpx flex h-44rpx w-44rpx items-center justify-center rounded-14rpx bg-#fff2df">
                        <text class="text-28rpx">📋</text>
                    </view>

                    <text class="text-34rpx font-bold text-#3a1f12"> 今日菜单 </text>
                </view>

                <view class="flex items-end">
                    <text class="text-26rpx text-#9a8b83">已选</text>
                    <text class="mx-6rpx text-32rpx font-bold text-#ff704d">
                        {{ todayMenu.length }}
                    </text>
                    <text class="text-26rpx text-#9a8b83">道菜</text>
                </view>
            </view>

            <text class="mt-22rpx block text-26rpx text-#8a7468"> 已经选好啦，快去确认下吧～ </text>

            <view class="mt-24rpx flex items-center justify-between">
                <scroll-view class="w-430rpx whitespace-nowrap" scroll-x>
                    <view class="inline-flex gap-16rpx">
                        <view
                            v-for="item in todayMenu"
                            :key="item.id"
                            class="inline-flex items-center rounded-999rpx bg-#fff6ed py-8rpx pl-8rpx pr-20rpx"
                        >
                            <image :src="item.image" class="h-56rpx w-56rpx rounded-full" mode="aspectFill" />

                            <text class="ml-12rpx text-24rpx font-bold text-#3a1f12">
                                {{ item.name }}
                            </text>

                            <text class="ml-14rpx text-24rpx text-#3a1f12"> x{{ item.quantity }} </text>
                        </view>
                    </view>
                </scroll-view>

                <button
                    class="m-0 h-76rpx rounded-999rpx bg-#ff704d px-36rpx text-28rpx font-bold leading-76rpx text-white shadow-none"
                    hover-class="opacity-85"
                    @click="handleGoTodayMenu"
                >
                    去确认 ›
                </button>
            </view>
        </view>
    </view>
</template>
