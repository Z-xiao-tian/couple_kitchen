<script lang="ts" setup>
import { computed, ref } from "vue";
import ServerImage from "@/components/server-image.vue";

type Category = {
    id: string;
    name: string;
    icon: string;
};

type Dish = {
    id: number;
    name: string;
    desc: string;
    image: string;
    category: string;
    categoryText: string;
    liked: boolean;
};

const searchKeyword = ref("");
const activeCategory = ref("all");

const categories: Category[] = [
    {
        id: "all",
        name: "全部",
        icon: "/static/images/menu/icons/category_all.svg"
    },
    {
        id: "home",
        name: "家常菜",
        icon: "/static/images/menu/icons/category_home_cooking.svg"
    },
    {
        id: "rice",
        name: "下饭菜",
        icon: "/static/images/menu/icons/category_rice.svg"
    },
    {
        id: "soup",
        name: "汤羹",
        icon: "/static/images/menu/icons/category_soup.svg"
    },
    {
        id: "noodles",
        name: "面食",
        icon: "/static/images/menu/icons/category_noodles.svg"
    },
    {
        id: "snack",
        name: "小吃",
        icon: "/static/images/menu/icons/category_snack.svg"
    },
    {
        id: "dessert",
        name: "甜品",
        icon: "/static/images/menu/icons/category_dessert.svg"
    },
    {
        id: "drink",
        name: "饮品",
        icon: "/static/images/menu/icons/category_drink.svg"
    }
];

const dishes = ref<Dish[]>([
    {
        id: 1,
        name: "可乐鸡翅",
        desc: "甜咸适中，软嫩入味",
        image: "/static/images/menu/dish_cola_chicken_wings.png",
        category: "home",
        categoryText: "家常菜",
        liked: false
    },
    {
        id: 2,
        name: "青椒炒肉",
        desc: "简单下饭，香辣开胃",
        image: "/static/images/menu/dish_green_pepper_pork.png",
        category: "rice",
        categoryText: "下饭菜",
        liked: false
    },
    {
        id: 3,
        name: "番茄炒蛋",
        desc: "酸甜可口，汤汁拌饭绝了",
        image: "/static/images/menu/dish_tomato_egg.png",
        category: "home",
        categoryText: "家常菜",
        liked: false
    },
    {
        id: 4,
        name: "麻婆豆腐",
        desc: "麻辣鲜香，超级下饭",
        image: "/static/images/menu/dish_mapo_tofu.png",
        category: "rice",
        categoryText: "下饭菜",
        liked: false
    },
    {
        id: 5,
        name: "玉米排骨汤",
        desc: "清甜滋补，暖心暖胃",
        image: "/static/images/menu/dish_corn_rib_soup.png",
        category: "soup",
        categoryText: "汤羹",
        liked: false
    },
    {
        id: 6,
        name: "酸辣土豆丝",
        desc: "酸辣脆爽，开胃小菜",
        image: "/static/images/menu/dish_potato_shreds.png",
        category: "rice",
        categoryText: "下饭菜",
        liked: false
    }
]);

const currentCategoryName = computed(() => {
    return categories.find((item) => item.id === activeCategory.value)?.name ?? "全部";
});

const filteredDishes = computed(() => {
    const keyword = searchKeyword.value.trim();

    return dishes.value.filter((dish) => {
        const matchCategory = activeCategory.value === "all" || dish.category === activeCategory.value;

        const matchKeyword =
            !keyword ||
            dish.name.includes(keyword) ||
            dish.desc.includes(keyword) ||
            dish.categoryText.includes(keyword);

        return matchCategory && matchKeyword;
    });
});

function handleChangeCategory(categoryId: string) {
    activeCategory.value = categoryId;
}

function handleFilter() {
    uni.showToast({
        title: "筛选功能开发中",
        icon: "none"
    });
}

function handleAddDish(dish: Dish) {
    uni.showToast({
        title: `已加入：${dish.name}`,
        icon: "success"
    });
}

function handleToggleLike(dish: Dish) {
    dish.liked = !dish.liked;

    uni.showToast({
        title: dish.liked ? "已收藏" : "已取消收藏",
        icon: "none"
    });
}

function handleDishDetail(dish: Dish) {
    uni.navigateTo({
        url: `/pages/dish/detail?id=${dish.id}`
    });
}
</script>

<template>
    <view class="flex h-[calc(100vh-var(--window-bottom))] flex-col bg-#fffaf5">
        <!-- 顶部区域 -->
        <view class="relative shrink-0 overflow-hidden bg-[#fff3e5] px-32rpx pt-70rpx pb-[20rpx]">
            <view class="relative z-1 flex min-h-280rpx">
                <server-image
                    custom-class="absolute right-0 top-10rpx h-full w-full"
                    mode="aspectFit"
                    url="/static/images/menu/menu_header_couple.png"
                />
            </view>

            <!-- 搜索栏 -->
            <view
                class="relative z-2 mt-12rpx flex h-86rpx items-center rounded-999rpx bg-white px-28rpx shadow-[0_12rpx_36rpx_rgba(80,45,20,0.08)]"
            >
                <server-image
                    custom-class="mr-18rpx h-38rpx w-38rpx"
                    mode="aspectFit"
                    url="/static/images/menu/icons/search.svg"
                />

                <input
                    v-model="searchKeyword"
                    class="min-w-0 flex-1 text-28rpx text-#3a1f12"
                    confirm-type="search"
                    placeholder="搜索菜名、食材、口味"
                    placeholder-class="text-#b7aaa2"
                />

                <view
                    class="ml-18rpx flex h-64rpx items-center rounded-999rpx bg-#fff5ed px-26rpx"
                    @click="handleFilter"
                >
                    <server-image
                        custom-class="mr-8rpx h-30rpx w-30rpx"
                        mode="aspectFit"
                        url="/static/images/menu/icons/filter.svg"
                    />
                    <text class="text-28rpx font-bold text-#8a573b">筛选</text>
                </view>
            </view>
        </view>

        <!-- 分类横向滚动 -->
        <view class="shrink-0 mt-34rpx">
            <scroll-view class="w-full whitespace-nowrap" scroll-x show-scrollbar="false">
                <view class="inline-flex gap-18rpx px-32rpx">
                    <view
                        v-for="category in categories"
                        :key="category.id"
                        :class="
                            activeCategory === category.id
                                ? 'bg-#ffe8da shadow-[0_10rpx_28rpx_rgba(255,112,77,0.12)]'
                                : 'bg-white'
                        "
                        class="inline-flex h-124rpx w-90rpx flex-col items-center justify-center rounded-28rpx"
                        @click="handleChangeCategory(category.id)"
                    >
                        <server-image :url="category.icon" custom-class="h-42rpx w-42rpx" mode="aspectFit" />

                        <text
                            :class="activeCategory === category.id ? 'text-#3a1f12' : 'text-#4b3a32'"
                            class="mt-12rpx text-24rpx font-bold"
                        >
                            {{ category.name }}
                        </text>
                    </view>
                </view>
            </scroll-view>
        </view>

        <view class="mt-34rpx px-32rpx">
            <view class="mb-24rpx flex items-center justify-between">
                <text class="text-34rpx font-bold text-#3a1f12"> {{ currentCategoryName }}菜品 </text>

                <text class="text-24rpx text-#9a8b83"> 共 {{ filteredDishes.length }} 道 </text>
            </view>
        </view>
        <!-- 菜品列表滚动区域 -->
        <scroll-view class="min-h-0 flex-1" enhanced scroll-y show-scrollbar="false">
            <view class="px-32rpx pb-32rpx">
                <view class="grid grid-cols-2 gap-22rpx">
                    <view
                        v-for="dish in filteredDishes"
                        :key="dish.id"
                        class="relative overflow-hidden rounded-26rpx bg-white shadow-[0_10rpx_32rpx_rgba(80,45,20,0.08)]"
                        @click="handleDishDetail(dish)"
                    >
                        <view class="relative">
                            <server-image :url="dish.image" custom-class="h-160rpx w-full" mode="aspectFill" />

                            <view
                                class="absolute right-12rpx top-12rpx flex h-46rpx w-46rpx items-center justify-center rounded-full bg-white/90"
                                @click.stop="handleToggleLike(dish)"
                            >
                                <text :class="dish.liked ? 'text-#ff704d' : 'text-#8a8a8a'" class="text-32rpx">
                                    {{ dish.liked ? "♥" : "♡" }}
                                </text>
                            </view>
                        </view>

                        <view class="p-18rpx">
                            <view class="flex items-start justify-between">
                                <text class="max-w-210rpx truncate text-28rpx font-bold text-#2f241f">
                                    {{ dish.name }}
                                </text>

                                <text class="text-30rpx text-#9a9a9a" @click.stop="handleToggleLike(dish)">
                                    {{ dish.liked ? "♥" : "♡" }}
                                </text>
                            </view>

                            <text class="mt-10rpx block truncate text-23rpx text-#8a7468">
                                {{ dish.desc }}
                            </text>

                            <view class="mt-14rpx flex items-center justify-between">
                                <view class="rounded-999rpx bg-#fff4ea px-14rpx py-7rpx">
                                    <text class="text-22rpx text-#b06a3b">
                                        {{ dish.categoryText }}
                                    </text>
                                </view>

                                <view
                                    class="flex h-48rpx w-48rpx items-center justify-center rounded-16rpx bg-#ff7a59"
                                    @click.stop="handleAddDish(dish)"
                                >
                                    <text class="text-36rpx font-bold leading-40rpx text-white">+</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

                <!-- 空状态 -->
                <view v-if="filteredDishes.length === 0" class="mt-80rpx flex flex-col items-center justify-center">
                    <server-image
                        custom-class="h-140rpx w-140rpx"
                        mode="aspectFit"
                        url="/static/images/menu/icons/empty_order.svg"
                    />
                    <text class="mt-20rpx text-28rpx font-bold text-#3a1f12"> 没有找到想吃的 </text>
                    <text class="mt-10rpx text-24rpx text-#9a8b83"> 换个关键词试试吧～ </text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>
