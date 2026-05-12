<script lang="ts" setup>
import ServerImage from "@/components/server-image.vue";

type DishItem = {
    id: number;
    name: string;
    image: string;
    tag: string;
};

const recentDishes: DishItem[] = [
    {
        id: 1,
        name: "土豆丝",
        image: "/static/images/home/dish_potato_shreds.png",
        tag: "常吃"
    },
    {
        id: 2,
        name: "鸡蛋面",
        image: "/static/images/home/dish_egg_noodles.png",
        tag: "常吃"
    },
    {
        id: 3,
        name: "蛋炒饭",
        image: "/static/images/home/dish_fried_rice.png",
        tag: "常吃"
    },
    {
        id: 4,
        name: "青椒肉丝",
        image: "/static/images/home/dish_green_pepper_pork.png",
        tag: "常吃"
    }
];

function handleGoMenu() {
    uni.switchTab({
        url: "/pages/menu/index"
    });
}

function handleRandomDish() {
    uni.showToast({
        title: "随机点餐功能开发中",
        icon: "none"
    });
}

function handleWantRecommend() {
    uni.showToast({
        title: "已加入今日菜单",
        icon: "success"
    });
}

function handleDishClick(dish: DishItem) {
    uni.navigateTo({
        url: `/pages/dish/detail?id=${dish.id}`
    });
}
</script>

<template>
    <view class="min-h-[calc(100vh-var(--window-bottom))rpx] relative bg-#fffaf5 pb-160rpx">
        <!-- 顶部背景图：不需要状态栏，不需要 Header -->
        <view class="relative w-full overflow-hidden">
            <server-image
                :mode="'widthFix'"
                customClass="block w-full"
                url="/static/images/home/bg_home_kitchen_header.png"
            />
            <view
                class="pointer-events-none absolute bottom-0 left-0 h-120rpx w-full bg-gradient-to-b from-transparent to-#fffaf5"
            />
            <!-- 首页问候语 -->
            <view class="absolute left-0 bottom-[35%] w-full px-56rpx pt-110rpx">
                <text class="block text-44rpx font-bold leading-58rpx text-#3a1f12"> 早上好呀，小湉厨房 ☀️ </text>
                <text class="mt-14rpx block text-30rpx text-#5f3b2b"> 今天想吃点什么呢？ </text>
            </view>
        </view>

        <!-- 主内容：向上压住 Header 底部 -->
        <view class="relative z-2 -mt-[64rpx] px-30rpx">
            <!-- 今日推荐 -->
            <view class="rounded-36rpx bg-white p-30rpx shadow-[0_14rpx_42rpx_rgba(80,45,20,0.08)]">
                <view class="mb-26rpx flex items-center justify-between">
                    <view class="inline-flex items-center rounded-999rpx bg-#ff704d px-24rpx py-12rpx">
                        <text class="mr-8rpx text-24rpx text-white">★</text>
                        <text class="text-26rpx font-bold text-white"> 今日推荐 </text>
                    </view>
                    <view class="flex gap-8rpx pr-12rpx">
                        <view class="h-8rpx w-8rpx rounded-full bg-#ffd9cc" />
                        <view class="h-8rpx w-8rpx rounded-full bg-#ffd9cc" />
                        <view class="h-8rpx w-8rpx rounded-full bg-#ffd9cc" />
                    </view>
                </view>
                <view class="flex gap-26rpx">
                    <server-image
                        customClass="h-214rpx w-246rpx shrink-0 rounded-26rpx"
                        mode="aspectFill"
                        url="/static/images/home/dish_tomato_egg.png"
                    />
                    <view class="flex min-w-0 flex-1 flex-col justify-between">
                        <view>
                            <text class="block text-34rpx font-bold text-#3a1f12"> 番茄炒蛋 </text>
                            <text class="mt-12rpx block text-26rpx leading-38rpx text-#8a7468">
                                酸甜开胃，百吃不厌的家常菜
                            </text>
                            <view class="mt-20rpx flex flex-wrap gap-12rpx">
                                <view class="rounded-999rpx bg-#fff4ea px-18rpx py-10rpx">
                                    <text class="text-23rpx text-#7a503d">简单</text>
                                </view>
                                <view class="rounded-999rpx bg-#fff4ea px-18rpx py-10rpx">
                                    <text class="text-23rpx text-#7a503d">15分钟</text>
                                </view>
                                <view class="rounded-999rpx bg-#fff4ea px-18rpx py-10rpx">
                                    <text class="text-23rpx text-#7a503d">家常菜</text>
                                </view>
                            </view>
                        </view>

                        <button
                            class="mt-22rpx h-72rpx rounded-999rpx bg-#ff704d text-28rpx font-bold leading-72rpx text-white shadow-none"
                            hover-class="opacity-85"
                            @click="handleWantRecommend"
                        >
                            ♡ 想吃这个
                        </button>
                    </view>
                </view>
            </view>

            <!-- 快捷入口 -->
            <view class="mt-24rpx grid grid-cols-2 gap-24rpx">
                <view
                    class="relative h-220rpx overflow-hidden rounded-32rpx bg-#fff0e9 p-28rpx"
                    @click="handleRandomDish"
                >
                    <text class="block text-32rpx font-bold text-#3a1f12"> 随机点餐 </text>
                    <text class="mt-18rpx block text-26rpx leading-38rpx text-#8a7468"> 不知道吃什么？ </text>
                    <text class="block text-26rpx leading-38rpx text-#8a7468"> 随机来一个吧 </text>
                    <view
                        class="absolute bottom-24rpx left-28rpx flex h-52rpx w-52rpx items-center justify-center rounded-full bg-#ff7a59"
                    >
                        <text class="text-36rpx text-white">›</text>
                    </view>
                    <server-image
                        customClass="absolute bottom-8rpx right-8rpx h-146rpx w-146rpx"
                        mode="aspectFit"
                        url="/static/images/home/card_random_dish.png"
                    />
                </view>
                <view class="relative h-220rpx overflow-hidden rounded-32rpx bg-#fff8df p-28rpx" @click="handleGoMenu">
                    <text class="block text-32rpx font-bold text-#3a1f12"> 浏览全部菜单 </text>
                    <text class="mt-18rpx block text-26rpx leading-38rpx text-#8a7468"> 看看今天 </text>
                    <text class="block text-26rpx leading-38rpx text-#8a7468"> 有什么想吃的 </text>
                    <view
                        class="absolute bottom-24rpx left-28rpx flex h-52rpx w-52rpx items-center justify-center rounded-full bg-#f8bd3c"
                    >
                        <text class="text-36rpx text-white">›</text>
                    </view>
                    <server-image
                        customClass="absolute bottom-8rpx right-8rpx h-146rpx w-146rpx"
                        mode="aspectFit"
                        url="/static/images/home/card_browse_menu.png"
                    />
                </view>
            </view>
            <!-- 最近常吃 -->
            <view class="mt-38rpx">
                <view class="mb-22rpx flex items-center justify-between">
                    <view class="flex items-center">
                        <text class="mr-10rpx text-28rpx">❤️</text>
                        <text class="text-34rpx font-bold text-#3a1f12"> 最近常吃 </text>
                    </view>
                    <view class="flex items-center" @click="handleGoMenu">
                        <text class="text-26rpx text-#9a8b83">查看更多</text>
                        <text class="ml-6rpx text-32rpx text-#9a8b83">›</text>
                    </view>
                </view>
                <scroll-view class="w-full whitespace-nowrap" scroll-x>
                    <view class="inline-flex gap-24rpx">
                        <view
                            v-for="dish in recentDishes"
                            :key="dish.id"
                            class="inline-block w-154rpx"
                            @click="handleDishClick(dish)"
                        >
                            <server-image
                                :url="dish.image"
                                customClass="h-138rpx w-154rpx rounded-22rpx"
                                mode="aspectFill"
                            />
                            <text class="mt-14rpx block text-center text-26rpx font-bold text-#3a1f12">
                                {{ dish.name }}
                            </text>
                            <view class="mt-8rpx flex items-center justify-center">
                                <text class="mr-6rpx text-20rpx text-#ff9c8a">♥</text>
                                <text class="text-22rpx text-#9a8b83">
                                    {{ dish.tag }}
                                </text>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>
