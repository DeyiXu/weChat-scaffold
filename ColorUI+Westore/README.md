
# CoreUI使用

1. ## 页面导航栏

带返回按钮
```html
<cu-custom bgColor="bg-gradual-blue" isBack="{{true}}">
	<view slot="backText">返回</view>
	<view slot="content">导航栏</view>
</cu-custom>
```
不带返回按钮
```html
<cu-custom bgColor="bg-gradual-blue">
  <view slot="content">首页</view>
</cu-custom>
```