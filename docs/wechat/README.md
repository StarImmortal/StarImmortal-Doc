---
title: 微信小程序
---

<template>
    <div class="container">
        <div class="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div class="swiper-info">
                        <div class="picture">
                            <img src="/assets/img/cool-wallpaper.png" alt="">
                        </div>
                        <div class="detail">
                            <h3>库壁啦</h3>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="swiper-info">
                        <div class="picture">
                            <img src="/assets/img/leave-manager.png" alt="">
                        </div>
                        <div class="detail">
                            <h3>人员工时管理</h3>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
            <!-- 如果需要导航按钮 -->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
        </div>
    </div>
</template>

<script>
    import Swiper from "swiper/swiper-bundle.min.js"
    import "swiper/swiper-bundle.min.css"
    
    export default {
        data() {
            return {
                swiperOptions: {
                    effect: "coverflow",
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: "auto",
                    coverflowEffect: {
                        rotate: 20,
                        stretch: 0,
                        depth: 350,
                        modifier: 1,
                        slideShadows: true
                    },
                    pagination: {
                        el: ".swiper-pagination"
                    },
                    // 箭头实现切换效果
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
            }
        },
        created(){

        },
        mounted(){
            new Swiper ('.swiper', {
                loop: true, // 循环模式选项
                effect: "coverflow",
                slidesPerView: 3,
                centeredSlides: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // 如果需要滚动条
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
            })
        },
        methods:{
            
        }
    }
</script>

<style>
.container {
  background: #fff;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #000;
  margin: 0;
  padding: 0;
}

.swiper-container {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-info {
  background-position: center;
  background-size: cover;
  width: 320px;
  background-color: #f4f4f4;
  overflow: hidden;
  border-radius: 8px;
}

.picture {
  width: 320px;
  height: 320px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.detail {
  padding: 25px 20px;
  font-weight: 600;
  text-align: center;
  
  h3 {
    margin: 0;
    font-size: 20px;
  }
}
</style>