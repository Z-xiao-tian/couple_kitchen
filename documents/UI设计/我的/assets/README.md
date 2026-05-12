# 淼有所食 - 我的页面静态资源

建议放到：

```txt
apps/miniapp/src/static/images/profile/
```

包含：
- `profile_reference.png`：我的页面 UI 参考图
- `profile_header_full.png`：完整 Header，含状态栏区域
- `profile_header_clean.png`：干净 Header，推荐用于页面
- `profile_avatar_couple.png`：用户头像图
- `profile_header_couple.png`：顶部情侣插画裁切图
- `icon_*.png`：页面内裁切图标
- `icons/*.svg`：设置、通知、订单、偏好、更多功能等可复用图标

引用示例：

```vue
<image src="/static/images/profile/profile_header_clean.png" mode="widthFix" />
```
