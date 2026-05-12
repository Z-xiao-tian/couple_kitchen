# 淼有所食 - 今日菜单页静态资源

建议放到：

```txt
apps/miniapp/src/static/images/today-menu/
```

包含：
- `today_menu_reference.png`：今日菜单页 UI 参考图
- `today_menu_header_full.png`：完整 Header，含状态栏区域
- `today_menu_header_clean.png`：干净 Header，推荐用于页面
- `status_cooking_pot.png`：点餐状态锅图标
- `dish_*.png`：今日菜单菜品图片
- `summary_order_icon.png`：底部统计卡图标
- `icons/*.svg`：状态、备注、编辑、更多、底部导航等图标

引用示例：

```vue
<image src="/static/images/today-menu/dish_tomato_egg.png" mode="aspectFill" />
```
