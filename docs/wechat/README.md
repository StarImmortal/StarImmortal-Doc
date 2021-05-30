---
title: 微信小程序
---

<template>
    <div class="container">
        <swiper :options="swiperOptions">
            <swiper-slide>
                <div class="picture">
                    <img src="/assets/img/cool-wallpaper.png" alt="">
                </div>
                <div class="detail">
                    <h3>库壁啦</h3>
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="picture">
                    <img src="/assets/img/leave-manager.png" alt="">
                </div>
                <div class="detail">
                    <h3>人员工时管理</h3>
                </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
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
        methods:{
            
        }
    }
</script>

<style>
.container{
  display: flex;
  justify-content: center;
  align-items: center;
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