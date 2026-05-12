# 淼有所食 - 菜单页静态资源

建议放到：

```txt
apps/miniapp/src/static/images/menu/
```

包含：
- `menu_reference.png`：菜单页 UI 参考图
- `menu_header_couple.png`：顶部情侣插画裁切图
- `dish_*.png`：菜品图片
- `icon_empty_order_plate.png`：底部空菜单提示图标
- `icons/*.svg`：分类、搜索、筛选、收藏、加号等图标

引用示例：

```vue
<image src="/static/images/menu/dish_tomato_egg.png" mode="aspectFill" />
```
