# Webpack 4教程指南

- [webpack中文官方网站介绍](https://www.webpackjs.com/concepts/)



## 一、Webpack基本介绍

### 1.1 什么是webpack?

**本节参考和引用**：

- [webpack系列之基本概念和使用](https://segmentfault.com/a/1190000013761990)



webpack是一个现代JavaScript应用程序的静态模块打包器(module bundler)。当webpack处理应用程序时，它会递归地构建一个依赖关系图(dependency graph),其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个bundle.

> 从webpack v4.0.0开始，可以不用引入一个配置文件。直接使用webpack命令就可进行打包。然而，webpack仍然还是高度可配置的。

webpack可以看做是模块打包工具:它将各种静态资源(比如js文件、图片、样式等)视为模块，能够对这些模块进行解析优化和转换等操作，最后将它们打包在一起，打包后的文件可用于在浏览器中使用。

![图片描述](https://segmentfault.com/img/bV5Uhs?w=2002&h=1054)



### 1.2 为什么使用webpack?

**本节参考和引用:**

- [What os Webpack and Why should I care[Part][Introcuction]](https://medium.com/the-self-taught-programmer/what-is-webpack-and-why-should-i-care-part-1-introduction-ca4da7d0d8dc)

#### 1.2.1 自动化

由于在过去，一个html常常需要引入一大堆的js引用，且越发难以管理。webpack可以通过npm自动构建工具帮助我们自动处理在js中请求的其他脚本，自动在模块中包含所需的库。

#### 1.2.2 加载速度

如果我们要创建一个web应用程序，在网页中加载单个脚本的成本非常高。webpack通过将所需的要javascript模块打包在一起，然后只需要从web服务器获取一次，这样能非常有效的提高页面加载速度。

#### 1.2.3 仅在需要时加载必要的脚本

在正常页面加载情况下，无论当前是否需要页面引入这些模块，都会被加载出来。webpack提供了一个**代码拆分**功能，这样可以仅在应用程序需要时才通过”按需“或”异步“加载单个脚本。

有关代码拆分的更多，请访问：[webpack代码拆分](https://webpack.docschina.org/guides/code-splitting/)

#### 1.2.4 依赖问题

webpack之所以如此受欢迎的另一个原因是，它解决了构建javascript应用程序时常见问题：依赖性问题。

webpack会通过使用ECMAScript模块(ESM)提前知道在构建起见缺少哪些依赖关系，如下：

```js
//helper.js
export const sqrt = Math.sqrt;
export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}

//main.js
import { square, diag } from 'helper';
console.log(square(11)); // 121
console.log(diag(4, 3)); // 5
```

这些import/export模块讲呗webpack自动检测到，并作为指示符将在捆绑包中自动包含哪些javascript模块。者有效地消除了以正确的顺序安排进行引用，使所有脚本都必须正确依赖的问题。



### 1.3 为什么要学webpack?



#### 1.3.1 了解现代前端生态系统

由于近年来Angular,React和Vue已经依靠webpack来构建样板或现成的应用程序，供开发人员使用这些主要框架来进行开发。

框架依赖webpack的原因是它像Angular一样涉及很多模块/库。如上述，webpack自动执行了downloading/including 模块的过程，因此它经常在框架/库中使用。

学习webpack不仅可以让你获得前面提到的好处，而且还让你了解前端框架底层运行原理，因此，你可以了解现代前端生态系统。



#### 1.3.2 提高开发速度和效率

由于webpack的**“Hot Module Replacement”**功能，开发时间也得到改善。事实证明，这可以提高工作效率，因为你的页面无需触发完全重新加载即可仅将你的更改直接看到效果。

这不仅适用于javascript，而且css代码也可以通过webpack配置中添加css加载程序来进行热更新。



#### 1.3.3 单页面应用程序开发

实际上，在开发单页面应用程序时，webpack有非常大的优势。学习webpack可以让你非常轻松设置单页面应用程序



#### 1.3.4 全面控制构建系统

如果有任何需要的话，可以选择webpack所需的各种构建系统，例如通过webpack加载器使用babel活traceur,如果你需要在找钱版本中转换es6+代码以使javascript代码与旧版浏览器贱人