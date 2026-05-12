<script lang="ts" setup>
import { computed, ref } from "vue";
import ServerImage from "@/components/server-image.vue";

type OrderStepStatus = "submitted" | "cooking" | "done" | "delivered";

type MenuItem = {
    id: number;
    name: string;
    desc: string;
    image: string;
    category: string;
    taste: string;
    quantity: number;
};

const orderStatus = ref<OrderStepStatus>("cooking");

const menuItems = ref<MenuItem[]>([
    {
        id: 1,
        name: "可乐鸡翅",
        desc: "甜咸适中，软嫩入味",
        image: "/static/images/cart/dish_cola_chicken_wings.png",
        category: "家常菜",
        taste: "微辣",
        quantity: 1
    },
    {
        id: 2,
        name: "番茄炒蛋",
        desc: "酸甜可口，汤汁拌饭绝了",
        image: "/static/images/cart/dish_tomato_egg.png",
        category: "家常菜",
        taste: "不辣",
        quantity: 1
    },
    {
        id: 3,
        name: "玉米排骨汤",
        desc: "清甜滋补，暖心暖胃",
        image: "/static/images/cart/dish_corn_rib_soup.png",
        category: "汤羹",
        taste: "清淡",
        quantity: 1
    }
]);

const note = ref("少放辣，多放葱花～");

const steps = computed(() => {
    return [
        {
            id: "submitted",
            name: "已提交",
            time: "12:20",
            icon: "/static/images/cart/icons/status_submitted.svg"
        },
        {
            id: "cooking",
            name: "制作中",
            time: "",
            icon: "/static/images/cart/icons/status_cooking.svg"
        },
        {
            id: "done",
            name: "已完成",
            time: "",
            icon: "/static/images/cart/icons/status_done.svg"
        },
        {
            id: "delivered",
            name: "已送达",
            time: "",
            icon: "/static/images/cart/icons/status_delivered.svg"
        }
    ];
});

const currentStepIndex = computed(() => {
    return steps.value.findIndex((item) => item.id === orderStatus.value);
});

const statusText = computed(() => {
    const statusMap: Record<OrderStepStatus, string> = {
        submitted: "已提交",
        cooking: "制作中",
        done: "已完成",
        delivered: "已送达"
    };

    return statusMap[orderStatus.value];
});

const estimatedTimeText = computed(() => {
    return "今天 18:30 左右";
});

function isStepActive(index: number) {
    return index <= currentStepIndex.value;
}

function handleAddDish() {
    uni.switchTab({
        url: "/pages/menu/index"
    });
}

function handleEditMenu() {
    uni.switchTab({
        url: "/pages/menu/index"
    });
}

function handleEditNote() {
    uni.showModal({
        title: "备注",
        editable: true,
        placeholderText: "比如：少放辣，多放葱花～",
        content: note.value,
        success: (res) => {
            if (res.confirm && res.content) {
                note.value = res.content;
            }
        }
    });
}

function handleMore(item: MenuItem) {
    uni.showActionSheet({
        itemList: ["修改数量", "移出今日菜单"],
        success: (res) => {
            if (res.tapIndex === 0) {
                uni.showToast({
                    title: `修改 ${item.name} 数量`,
                    icon: "none"
                });
            }

            if (res.tapIndex === 1) {
                menuItems.value = menuItems.value.filter((dish) => dish.id !== item.id);
                uni.showToast({
                    title: "已移出今日菜单",
                    icon: "none"
                });
            }
        }
    });
}

function handleUrge() {
    uni.showToast({
        title: "已经帮你催一催啦～",
        icon: "none"
    });
}
</script>

<template>
    <view class="min-h-[calc(100vh-var(--window-bottom))rpx] bg-#fffaf5 pb-180rpx">
        <!-- 顶部 Header 图片 -->
        <view class="fixed top-0 w-full overflow-hidden">
            <server-image
                custom-class="block w-full"
                mode="widthFix"
                url="/static/images/cart/today_menu_header_clean.png"
            />

            <view
                class="pointer-events-none absolute bottom-0 left-0 h-180rpx w-full bg-gradient-to-b from-transparent to-#fffaf5"
            />
        </view>

        <!-- 主体内容 -->
        <view class="relative z-2 mt-375rpx px-30rpx">
            <!-- 点餐状态 -->
            <view class="rounded-32rpx bg-white p-30rpx shadow-[0_12rpx_40rpx_rgba(80,45,20,0.08)]">
                <view class="flex items-center">
                    <!-- 左侧状态 -->
                    <view class="w-210rpx border-r-1rpx border-#f1e7de pr-24rpx">
                        <text class="block text-28rpx font-bold text-#3a1f12"> 点餐状态 </text>

                        <text class="mt-18rpx block text-38rpx font-bold text-#ff704d">
                            {{ statusText }}
                        </text>

                        <text class="mt-14rpx block text-24rpx text-#9a8b83"> 预计完成 18:30 </text>
                    </view>

                    <!-- 中间锅图标 -->
                    <view class="flex w-128rpx justify-center">
                        <server-image
                            custom-class="h-92rpx w-92rpx"
                            mode="aspectFit"
                            url="/static/images/cart/status_cooking_pot.png"
                        />
                    </view>

                    <!-- 进度步骤 -->
                    <view class="flex min-w-0 flex-1 items-center justify-between">
                        <view
                            v-for="(step, index) in steps"
                            :key="step.id"
                            class="relative flex flex-1 flex-col items-center"
                        >
                            <view
                                v-if="index !== 0"
                                :class="isStepActive(index) ? 'bg-#ffd0bf' : 'bg-#ececec'"
                                class="absolute right-1/2 top-26rpx h-4rpx w-full -translate-x-26rpx"
                            />

                            <view
                                :class="isStepActive(index) ? 'bg-#fff1e9' : 'bg-#f7f7f7'"
                                class="relative z-1 flex h-54rpx w-54rpx items-center justify-center rounded-full"
                            >
                                <server-image :url="step.icon" custom-class="h-44rpx w-44rpx" mode="aspectFit" />
                            </view>

                            <text
                                :class="
                                    step.id === orderStatus
                                        ? 'text-#ff704d'
                                        : isStepActive(index)
                                          ? 'text-#3a1f12'
                                          : 'text-#a8a8a8'
                                "
                                class="mt-12rpx text-23rpx font-bold"
                            >
                                {{ step.name }}
                            </text>

                            <text v-if="step.time" class="mt-6rpx text-21rpx text-#9a8b83">
                                {{ step.time }}
                            </text>
                        </view>
                    </view>
                </view>
            </view>

            <!-- 今日菜单列表 -->
            <view class="mt-28rpx rounded-32rpx bg-white p-28rpx shadow-[0_12rpx_40rpx_rgba(80,45,20,0.07)]">
                <view class="mb-28rpx flex items-center justify-between">
                    <view class="flex items-center">
                        <text class="text-36rpx font-bold text-#3a1f12"> 今日菜单（{{ menuItems.length }}） </text>
                        <text class="ml-10rpx text-24rpx">💗</text>
                    </view>

                    <view
                        class="flex h-58rpx items-center rounded-999rpx border-2rpx border-#ff704d px-22rpx"
                        @click="handleAddDish"
                    >
                        <server-image
                            custom-class="mr-4rpx h-28rpx w-28rpx"
                            mode="aspectFit"
                            url="/static/images/cart/icons/add.svg"
                        />

                        <text class="text-25rpx font-bold text-#ff704d"> 添加菜品 </text>
                    </view>
                </view>

                <view
                    v-for="(item, index) in menuItems"
                    :key="item.id"
                    :class="index !== menuItems.length - 1 ? 'border-b-1rpx border-#f2ede8' : ''"
                    class="flex py-22rpx"
                >
                    <server-image
                        :url="item.image"
                        custom-class="h-130rpx w-210rpx shrink-0 rounded-18rpx"
                        mode="aspectFill"
                    />

                    <view class="ml-24rpx flex min-w-0 flex-1 flex-col justify-between">
                        <view>
                            <view class="flex items-start justify-between">
                                <view class="min-w-0 flex-1">
                                    <view class="flex items-center">
                                        <text class="max-w-190rpx truncate text-30rpx font-bold text-#2f241f">
                                            {{ item.name }}
                                        </text>

                                        <view class="ml-12rpx rounded-999rpx bg-#fff4ea px-14rpx py-6rpx">
                                            <text class="text-21rpx text-#a4643d">
                                                {{ item.category }}
                                            </text>
                                        </view>
                                    </view>

                                    <text class="mt-12rpx block truncate text-24rpx text-#8a7468">
                                        {{ item.desc }}
                                    </text>
                                </view>

                                <text class="ml-16rpx text-25rpx text-#6f625b"> x{{ item.quantity }}份 </text>
                            </view>
                        </view>

                        <view class="flex items-end justify-between">
                            <view
                                :class="
                                    item.taste === '清淡'
                                        ? 'bg-#eef8eb'
                                        : item.taste === '不辣'
                                          ? 'bg-#f1f8ee'
                                          : 'bg-#fff0e8'
                                "
                                class="rounded-999rpx px-14rpx py-6rpx"
                            >
                                <text
                                    :class="
                                        item.taste === '清淡'
                                            ? 'text-#5b9d52'
                                            : item.taste === '不辣'
                                              ? 'text-#5b9d52'
                                              : 'text-#ff704d'
                                    "
                                    class="text-21rpx"
                                >
                                    {{ item.taste === "微辣" ? "🌶 " : "" }}{{ item.taste }}
                                </text>
                            </view>

                            <view
                                class="flex h-42rpx w-42rpx items-center justify-center"
                                @click.stop="handleMore(item)"
                            >
                                <server-image
                                    custom-class="h-36rpx w-36rpx"
                                    mode="aspectFit"
                                    url="/static/images/cart/icons/more.svg"
                                />
                            </view>
                        </view>
                    </view>
                </view>

                <view v-if="menuItems.length === 0" class="flex flex-col items-center justify-center py-80rpx">
                    <server-image
                        custom-class="h-140rpx w-140rpx"
                        mode="aspectFit"
                        url="/static/images/cart/icons/bowl.svg"
                    />

                    <text class="mt-18rpx text-30rpx font-bold text-#3a1f12"> 今日还没有菜品 </text>

                    <text class="mt-10rpx text-24rpx text-#9a8b83"> 去菜单里选点想吃的吧～ </text>
                </view>
            </view>

            <!-- 备注 -->
            <view
                class="mt-24rpx flex h-108rpx items-center rounded-28rpx bg-white px-28rpx shadow-[0_10rpx_32rpx_rgba(80,45,20,0.06)]"
            >
                <server-image
                    custom-class="mr-20rpx h-64rpx w-64rpx"
                    mode="aspectFit"
                    url="/static/images/cart/icons/note.svg"
                />

                <view class="min-w-0 flex-1">
                    <view class="flex items-center">
                        <text class="text-30rpx font-bold text-#3a1f12"> 备注 </text>
                        <text class="ml-8rpx text-22rpx">💗</text>
                    </view>

                    <text class="mt-8rpx block truncate text-24rpx text-#8a7468">
                        {{ note || "还没有备注哦～" }}
                    </text>
                </view>

                <view class="flex h-56rpx items-center rounded-999rpx bg-#fff5ed px-24rpx" @click="handleEditNote">
                    <server-image
                        custom-class="mr-8rpx h-28rpx w-28rpx"
                        mode="aspectFit"
                        url="/static/images/cart/icons/edit.svg"
                    />

                    <text class="text-25rpx font-bold text-#ff704d"> 编辑备注 </text>
                </view>
            </view>

            <!-- 统计信息 -->
            <view
                class="mt-24rpx flex h-142rpx items-center rounded-30rpx bg-white px-28rpx shadow-[0_10rpx_32rpx_rgba(80,45,20,0.06)]"
            >
                <view class="flex flex-1 items-center">
                    <server-image
                        custom-class="mr-22rpx h-74rpx w-74rpx"
                        mode="aspectFit"
                        url="/static/images/cart/icons/bowl.svg"
                    />

                    <view>
                        <view class="flex items-end">
                            <text class="text-30rpx font-bold text-#3a1f12"> 今日共 </text>
                            <text class="mx-6rpx text-34rpx font-bold text-#ff704d">
                                {{ menuItems.length }}
                            </text>
                            <text class="text-30rpx font-bold text-#3a1f12"> 道菜 </text>
                        </view>

                        <text class="mt-8rpx block text-23rpx text-#8a7468"> 等待你大展身手哦～ </text>

                        <view class="mt-8rpx flex gap-6rpx">
                            <text class="text-20rpx text-#ffb3a3">♥</text>
                            <text class="text-20rpx text-#ffb3a3">♥</text>
                            <text class="text-20rpx text-#ffb3a3">♥</text>
                        </view>
                    </view>
                </view>

                <view class="h-82rpx w-1rpx bg-#f1e7de" />

                <view class="ml-28rpx flex flex-1 items-center">
                    <view class="mr-22rpx flex h-74rpx w-74rpx items-center justify-center rounded-full bg-#fff2e8">
                        <text class="text-42rpx">🕘</text>
                    </view>

                    <view>
                        <text class="block text-28rpx font-bold text-#3a1f12"> 预计完成时间 </text>

                        <text class="mt-8rpx block text-23rpx text-#8a7468">
                            {{ estimatedTimeText }}
                        </text>

                        <text class="mt-6rpx block text-22rpx text-#8a7468"> 一切辛苦啦～ 💗 </text>
                    </view>
                </view>
            </view>

            <!-- 底部操作按钮 -->
            <view class="mt-32rpx grid grid-cols-2 gap-22rpx">
                <button
                    class="m-0 h-88rpx rounded-28rpx border-#ff704d bg-white text-30rpx font-bold leading-88rpx text-#c26a47 shadow-none"
                    hover-class="opacity-85"
                    @click="handleEditMenu"
                >
                    ✎ 修改菜单
                </button>

                <button
                    class="m-0 h-88rpx rounded-28rpx bg-#ff704d text-30rpx font-bold leading-88rpx text-white shadow-none"
                    hover-class="opacity-85"
                    @click="handleUrge"
                >
                    𖠋 催一催
                </button>
            </view>
        </view>
    </view>
</template>
