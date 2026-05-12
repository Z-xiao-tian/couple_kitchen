<script lang="ts" setup>
import ServerImage from "@/components/server-image.vue";

type StatisticItem = {
    id: string;
    label: string;
    value: number;
    icon: string;
};

type OrderStatusItem = {
    id: string;
    label: string;
    icon: string;
    badge?: number;
};

type PreferenceItem = {
    id: string;
    title: string;
    desc: string;
    icon: string;
};

type InteractionItem = {
    id: string;
    title: string;
    desc: string;
    icon: string;
};

type FunctionItem = {
    id: string;
    title: string;
    desc?: string;
    icon: string;
    path?: string;
};

const statistics: StatisticItem[] = [
    {
        id: "days",
        label: "点餐天数",
        value: 128,
        icon: "/static/images/profile/icon_order_days.png"
    },
    {
        id: "favorite",
        label: "收藏菜品",
        value: 56,
        icon: "/static/images/profile/icon_favorite_dishes.png"
    },
    {
        id: "common",
        label: "常吃菜品",
        value: 32,
        icon: "/static/images/profile/icon_common_dishes.png"
    },
    {
        id: "messages",
        label: "互动消息",
        value: 18,
        icon: "/static/images/profile/icon_messages.png"
    }
];

const orderStatuses: OrderStatusItem[] = [
    {
        id: "all",
        label: "全部订单",
        icon: "/static/images/profile/icons/order.svg"
    },
    {
        id: "pending",
        label: "待接受",
        icon: "/static/images/profile/icons/clock.svg",
        badge: 1
    },
    {
        id: "cooking",
        label: "制作中",
        icon: "/static/images/profile/icons/pot.svg",
        badge: 1
    },
    {
        id: "done",
        label: "已完成",
        icon: "/static/images/profile/icons/cloche.svg"
    }
];

const preferences: PreferenceItem[] = [
    {
        id: "like",
        title: "爱吃的菜",
        desc: "32 道",
        icon: "/static/images/profile/icons/heart.svg"
    },
    {
        id: "dislike",
        title: "不爱吃的菜",
        desc: "8 道",
        icon: "/static/images/profile/icons/dislike.svg"
    },
    {
        id: "avoid",
        title: "忌口食材",
        desc: "5 种",
        icon: "/static/images/profile/icons/avoid.svg"
    },
    {
        id: "taste",
        title: "口味偏好",
        desc: "偏清淡",
        icon: "/static/images/profile/icons/pepper.svg"
    }
];

const interactions: InteractionItem[] = [
    {
        id: "hard",
        title: "辛苦啦",
        desc: "16 次",
        icon: "/static/images/profile/icon_hard_work.png"
    },
    {
        id: "want",
        title: "想吃你做的",
        desc: "24 次",
        icon: "/static/images/profile/icon_want_you_cook.png"
    },
    {
        id: "random",
        title: "随机投喂",
        desc: "8 次",
        icon: "/static/images/profile/icon_random_feed.png"
    },
    {
        id: "remind",
        title: "做好了提醒",
        desc: "12 次",
        icon: "/static/images/profile/icon_done_reminder.png"
    }
];

const functionItems: FunctionItem[] = [
    {
        id: "favorite",
        title: "我的收藏",
        icon: "/static/images/profile/icons/star.svg",
        path: "/pages/favorite/index"
    },
    {
        id: "address",
        title: "收货地址",
        icon: "/static/images/profile/icons/location.svg",
        path: "/pages/profile/address"
    },
    {
        id: "role",
        title: "角色切换",
        desc: "切换为厨师端",
        icon: "/static/images/profile/icons/role.svg",
        path: "/pages/profile/role"
    },
    {
        id: "about",
        title: "关于我们",
        icon: "/static/images/profile/icons/info.svg",
        path: "/pages/about/index"
    },
    {
        id: "feedback",
        title: "意见反馈",
        icon: "/static/images/profile/icons/feedback.svg",
        path: "/pages/feedback/index"
    }
];

function handleProfileCard() {
    uni.showToast({
        title: "个人资料开发中",
        icon: "none"
    });
}

function handleOrderStatus(item: OrderStatusItem) {
    uni.navigateTo({
        url: `/pages/order/index?status=${item.id}`
    });
}

function handleGoAllOrders() {
    uni.navigateTo({
        url: "/pages/order/index"
    });
}

function handlePreference(item: PreferenceItem) {
    uni.navigateTo({
        url: `/pages/preference/index?type=${item.id}`
    });
}

function handleInteraction(item: InteractionItem) {
    uni.showToast({
        title: `${item.title}记录开发中`,
        icon: "none"
    });
}

function handleFunction(item: FunctionItem) {
    if (item.id === "role") {
        uni.navigateTo({
            url: "/pages/cook/index"
        });
        return;
    }

    if (!item.path) {
        uni.showToast({
            title: "功能开发中",
            icon: "none"
        });
        return;
    }

    uni.navigateTo({
        url: item.path,
        fail: () => {
            uni.showToast({
                title: "页面开发中",
                icon: "none"
            });
        }
    });
}
</script>

<template>
    <view class="min-h-[calc(100vh-var(--window-bottom))rpx] bg-#fffaf5 pb-180rpx">
        <!-- 顶部 Header -->
        <view class="fixed top-0 w-full overflow-hidden">
            <server-image
                custom-class="block w-full"
                mode="widthFix"
                url="/static/images/profile/profile_header_clean.png"
            />

            <view
                class="pointer-events-none absolute bottom-0 left-0 h-180rpx w-full bg-gradient-to-b from-transparent to-#fffaf5"
            />
        </view>

        <view class="relative z-2 mt-375rpx px-32rpx">
            <!-- 用户信息卡片 -->
            <view
                class="rounded-34rpx bg-white p-28rpx shadow-[0_12rpx_40rpx_rgba(80,45,20,0.08)]"
                @click="handleProfileCard"
            >
                <view class="flex items-center">
                    <server-image
                        custom-class="h-112rpx w-112rpx rounded-full"
                        mode="aspectFill"
                        url="/static/images/profile/profile_avatar_couple.png"
                    />

                    <view class="ml-24rpx min-w-0 flex-1">
                        <view class="flex items-center">
                            <text class="text-34rpx font-bold text-#3a1f12"> 淼淼 </text>

                            <view class="ml-14rpx rounded-999rpx bg-#fff0e8 px-14rpx py-6rpx">
                                <text class="text-22rpx font-bold text-#ff704d"> 伴侣端 </text>
                            </view>
                        </view>

                        <text class="mt-14rpx block text-26rpx text-#7f6658"> 爱吃的饭，慢慢选 💗 </text>
                    </view>

                    <image
                        class="h-42rpx w-42rpx"
                        mode="aspectFit"
                        src="/static/images/profile/icons/chevron_right.svg"
                    />
                </view>

                <view class="mt-34rpx grid grid-cols-4">
                    <view v-for="item in statistics" :key="item.id" class="flex flex-col items-center">
                        <server-image :url="item.icon" custom-class="h-48rpx w-48rpx" mode="aspectFit" />

                        <text class="mt-8rpx text-34rpx font-bold text-#2f241f">
                            {{ item.value }}
                        </text>

                        <text class="mt-8rpx text-23rpx text-#8a7468">
                            {{ item.label }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 点餐记录 -->
            <view class="mt-24rpx rounded-30rpx bg-white p-28rpx shadow-[0_10rpx_32rpx_rgba(80,45,20,0.06)]">
                <view class="mb-30rpx flex items-center justify-between">
                    <text class="text-30rpx font-bold text-#3a1f12"> 点餐记录 </text>

                    <view class="flex items-center" @click="handleGoAllOrders">
                        <text class="text-25rpx text-#7f6658"> 全部订单 </text>
                        <server-image
                            custom-class="ml-2rpx h-34rpx w-34rpx"
                            mode="aspectFit"
                            url="/static/images/profile/icons/chevron_right.svg"
                        />
                    </view>
                </view>

                <view class="grid grid-cols-4">
                    <view
                        v-for="item in orderStatuses"
                        :key="item.id"
                        class="flex flex-col items-center"
                        @click="handleOrderStatus(item)"
                    >
                        <view class="relative">
                            <server-image :url="item.icon" custom-class="h-54rpx w-54rpx" mode="aspectFit" />

                            <view
                                v-if="item.badge"
                                class="absolute -right-12rpx -top-8rpx flex h-30rpx min-w-30rpx items-center justify-center rounded-full bg-#ff704d px-6rpx"
                            >
                                <text class="text-18rpx font-bold text-white">
                                    {{ item.badge }}
                                </text>
                            </view>
                        </view>

                        <text class="mt-16rpx text-25rpx font-bold text-#5f3b2b">
                            {{ item.label }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 口味偏好 -->
            <view class="mt-24rpx rounded-30rpx bg-white p-28rpx shadow-[0_10rpx_32rpx_rgba(80,45,20,0.06)]">
                <view class="mb-28rpx flex items-center">
                    <text class="text-30rpx font-bold text-#3a1f12"> 口味偏好 </text>
                    <text class="ml-8rpx text-22rpx">💗</text>
                </view>

                <view class="grid grid-cols-4">
                    <view
                        v-for="item in preferences"
                        :key="item.id"
                        class="flex flex-col items-center"
                        @click="handlePreference(item)"
                    >
                        <server-image :url="item.icon" custom-class="h-58rpx w-58rpx" mode="aspectFit" />

                        <text class="mt-12rpx text-23rpx font-bold text-#2f241f">
                            {{ item.title }}
                        </text>

                        <text class="mt-6rpx text-21rpx text-#9a8b83">
                            {{ item.desc }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 互动记录 -->
            <view class="mt-24rpx rounded-30rpx bg-white p-28rpx shadow-[0_10rpx_32rpx_rgba(80,45,20,0.06)]">
                <view class="mb-28rpx flex items-center justify-between">
                    <text class="text-30rpx font-bold text-#3a1f12"> 互动记录 </text>

                    <view class="flex items-center">
                        <text class="text-25rpx text-#7f6658"> 查看全部 </text>
                        <server-image
                            custom-class="ml-2rpx h-34rpx w-34rpx"
                            mode="aspectFit"
                            url="/static/images/profile/icons/chevron_right.svg"
                        />
                    </view>
                </view>

                <view class="grid grid-cols-4">
                    <view
                        v-for="item in interactions"
                        :key="item.id"
                        class="flex flex-col items-center"
                        @click="handleInteraction(item)"
                    >
                        <server-image :url="item.icon" custom-class="h-58rpx w-58rpx" mode="aspectFit" />

                        <text class="mt-12rpx text-23rpx font-bold text-#2f241f">
                            {{ item.title }}
                        </text>

                        <text class="mt-6rpx text-21rpx text-#9a8b83">
                            {{ item.desc }}
                        </text>
                    </view>
                </view>
            </view>

            <!-- 更多功能 -->
            <view class="mt-24rpx rounded-30rpx bg-white p-28rpx shadow-[0_10rpx_32rpx_rgba(80,45,20,0.06)]">
                <text class="mb-20rpx block text-30rpx font-bold text-#3a1f12"> 更多功能 </text>

                <view
                    v-for="(item, index) in functionItems"
                    :key="item.id"
                    :class="index !== functionItems.length - 1 ? 'border-b-1rpx border-#f5eee8' : ''"
                    class="flex h-88rpx items-center"
                    @click="handleFunction(item)"
                >
                    <server-image :url="item.icon" custom-class="mr-22rpx h-40rpx w-40rpx" mode="aspectFit" />

                    <text class="flex-1 text-27rpx font-bold text-#2f241f">
                        {{ item.title }}
                    </text>

                    <text v-if="item.desc" class="mr-8rpx text-24rpx text-#9a8b83">
                        {{ item.desc }}
                    </text>

                    <server-image
                        custom-class="h-38rpx w-38rpx"
                        mode="aspectFit"
                        url="/static/images/profile/icons/chevron_right.svg"
                    />
                </view>
            </view>
        </view>
    </view>
</template>
