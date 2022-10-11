---
title: 微信小程序
---

<template>
  <div class="wrapper">
    <div class="module-team">
      <div class="team">
        <h2 class="title">作 品 展 示</h2>
        <div class="team-cards">
          <div class="swiper">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
              <div :class="['swiper-slide']">
                <div class="card">
                  <span class="background"></span>
                  <figure class="photo"><img src="/assets/images/cool-wallpaper.png" /></figure>
                  <article class="text">
                    <p class="name">库壁啦</p>
                    <p class="description">壁纸小程序</p>
                  </article>
                </div>
              </div>
              <div :class="['swiper-slide']">
                <div class="card">
                  <span class="background"></span>
                  <figure class="photo"><img src="/assets/images/time-sheet.png" /></figure>
                  <article class="text">
                    <p class="name">TimeSheet</p>
                    <p class="description">请假小程序</p>
                  </article>
                </div>
              </div>
              <div :class="['swiper-slide']">
                <div class="card">
                  <span class="background"></span>
                  <figure class="photo"><img src="/assets/images/serein.png" /></figure>
                  <article class="text">
                    <p class="name">茶椀</p>
                    <p class="description">电商小程序</p>
                  </article>
                </div>
              </div>
            </div>
          </div>
          <!-- If we need navigation buttons -->
          <div class="navigation">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper/swiper-bundle.min.js';
import 'swiper/swiper-bundle.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    new Swiper('.swiper', {
      loop: true,
      direction: 'horizontal',
      slidesPerView: 3,
      centeredSlides: false,
      speed: 800,
      spaceBetween: 40,
      threshold: 5,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import '/assets/font/font.css';

@mixin lg {
  @media screen and (max-width: 1180px) {
    @content;
  }
}

@mixin md {
  @media screen and (max-width: 1023px) {
    @content;
  }
}

@mixin sm {
  @media screen and (max-width: 799px) {
    @content;
  }
}

@mixin xs {
  @media screen and (max-width: 511px) {
    @content;
  }
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
li,
button,
a,
i,
input,
figure,
img {
  margin: 0;
  padding: 0;
  list-style: none;
  border: 0;
  -webkit-tap-highlight-color: transparent;
  text-decoration: none;
  color: inherit;

  &:focus {
    outline: 0;
  }
}

div {
  -webkit-tap-highlight-color: transparent;
}

body {
  margin: 0;
  padding: 0;
  height: auto;
  background: white;
}

.wrapper {
  --swiper-navigation-size: 0;

  .module-team {
    position: relative;

    &:before {
      width: 100%;
      height: 380px;
      background-color: #eaeaea;
      content: '';
      position: absolute;
      z-index: -1;

      @include sm {
        height: 250px;
      }
    }

    .team {
      max-width: 1440px;
      margin: 0 auto;

      .title {
        text-align: center;
        margin-bottom: 80px;
        color: #6f7073;
        font-size: 40px !important;
        line-height: normal;
        text-transform: uppercase;
        font-weight: bold;
        letter-spacing: 1.3px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        height: 100px;
        font-family: 'Drinking';

        &:before {
          content: '';
          position: absolute;
          width: 80px;
          height: 10px;
          background: #6f7073;
          border-radius: 50px;
          bottom: 0;
          opacity: 0.2;

          @include sm {
            width: 60px;
            height: 5px;
          }
        }

        @include sm {
          font-size: 32px;
          height: 60px;
          margin-bottom: 40px;
        }
      }

      .team-cards {
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .swiper {
          width: 100%;
          max-width: 910px;
          height: 360px;
          padding: 0 20px;
          cursor: default;

          /* Card */
          .swiper-slide {
            background-color: white;
            width: 280px !important;
            height: 320px;
            border-radius: 4px;
            box-shadow: inset 0px 0px 0px 1px #edeef4;
            position: relative;
            transition: all 0.4s ease;

            &:before {
              content: '';
              position: absolute;
              width: 100%;
              height: 100%;
              box-shadow: 0px 20px 40px -20px #eaeaea;
              top: 0px;
              z-index: -1;
              transition: all 0.4s ease;
            }

            .card {
              width: 100%;
              height: 100%;
              overflow: hidden;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              position: relative;

              .background {
                position: absolute;
                width: 100%;
                height: 100px;
                top: 0;
                border-radius: 4px 4px 0px 0px;
                transition: all 0.4s ease;
                background: linear-gradient(140deg, #d45b7a, #fda576);
                z-index: 1;
              }

              .photo {
                width: 120px;
                height: 120px;
                border-radius: 100%;
                overflow: hidden;
                z-index: 1;
                position: absolute;
                top: 40px;
                border: 3px solid #ffffff;
                transition: all 0.4s ease;
                box-shadow: 0px 4px 10px rgba(#6f7073, 0.3);

                &:before,
                &:after {
                  width: 100%;
                  height: 100px;
                  border-radius: 4px;
                  content: '';
                  position: absolute;
                  transition: all 0.4s ease;
                  opacity: 0;
                  left: 0;
                  top: 0;
                }

                &:before {
                  background: #403e3e;
                  z-index: 1;
                }

                &:after {
                  background: linear-gradient(140deg, #d45b7a, #fda576);
                  z-index: 2;
                }

                img {
                  width: 100%;
                  height: 100%;
                  object-fit: cover;
                }
              }

              .text {
                z-index: 3;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: absolute;
                transform: translateY(50px);
                transition: all 0.3s ease;

                .name {
                  font-size: 20px;
                  color: #6f7073;
                  font-weight: 300;
                }

                .description {
                  font-size: 14px;
                  font-weight: 600;
                  color: #cbcbcb;
                  letter-spacing: 0.8px;
                  margin-top: 5px;
                }
              }
            }

            &:hover {
              transform: translateY(3px);

              &:before {
                box-shadow: 0px 10px 10px -10px #eaeaea;
              }

              @include sm {
                transform: translateY(0px);

                &:before {
                  box-shadow: 0px 20px 40px -20px #eaeaea;
                }
              }

              .card {
                .photo {
                  transform: translateY(-5px);
                  box-shadow: 0px 6px 20px rgba(#6f7073, 0.3);

                  @include sm {
                    transform: translateY(0px);
                    box-shadow: 0px 4px 10px rgba(#6f7073, 0.3);
                  }
                }
              }
            }
          }
        }

        .navigation {
          width: 1098px;
          height: 28px;
          position: absolute;
          margin: 0 auto;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;

          @include lg {
            width: 750px;
          }

          .swiper-button-prev,
          .swiper-button-next {
            width: 28px;
            height: 28px;
            background-position: center;
            transition: all 0.4s ease;
            top: 0;
            margin-top: 0;

            &:focus {
              outline: none;
            }

            @include sm {
              display: none;
            }
          }

          .swiper-button-prev {
            background-image: url(/assets/icons/arrow-prev.svg);
            background-position-x: 5px;
            transform: translateX(5px);

            &:hover {
              transform: translateX(0px);
            }
          }

          .swiper-button-next {
            background-image: url(/assets/icons/arrow-next.svg);
            background-position-x: -5px;
            transform: translateX(-5px);

            &:hover {
              transform: translateX(0px);
            }
          }
        }
      }
    }
  }
}
</style>