<template>
  <div>
    <div class="page-header page-header-inverse">

      <div class="navbar navbar-inverse navbar-transparent">
        <div class="navbar-boxed">
          <div class="navbar-header">
            <slot name="brand">
              <a class="navbar-brand" href="/">
                {{mainTitle}}
              </a>
            </slot>
          </div>

          <div class="navbar-collapse collapse visible-xs-block" id="navbar-mobile">
            <ul class="nav navbar-nav navbar-right" v-if="user">
              <li class="dropdown dropdown-user">
                <a class="dropdown-toggle" data-toggle="dropdown">
                  <span>{{user.name}}</span>
                  <i class="caret"></i>
                </a>

                <ul class="dropdown-menu dropdown-menu-right">
                  <li>
                    <a @click.prevent="$emit('logout')"><i class="icon-switch2"></i> Déconnexion</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        <slot name="page-header-content">
          <div class="page-header-content hidden-xs">
            <div class="page-title">
              <slot name="page-title"></slot>
            </div>

            <div class="heading-elements">
              <slot name="breadcrumb"></slot>
            </div>
          </div>
        </slot>

        <slot name="navbar-second">
          <div class="navbar navbar-inverse navbar-transparent" id="navbar-second">
            <div class="navbar-boxed">
              <ul class="nav navbar-nav no-border visible-xs-block">
                <li><a class="text-center" :class="{collapsed: !viewSecondaryNavbar}" @click="toggleSecondaryNavbar"><i
                  class="icon-menu7"></i></a></li>
              </ul>

              <div class="navbar-collapse collapse" :class="{in: viewSecondaryNavbar}" id="navbar-second-toggle">
                <ul class="nav navbar-nav navbar-nav-material">
                  <template v-for="item in menuFiltered">
                    <li v-if="item.children && item.children.length" :key="item.path" class="dropdown" :class="{active: item.active}">
                      <a href="#" class="dropdown-toggle" data-toggle="dropdown">{{item.title}} <span class="caret"></span></a>

                      <ul class="dropdown-menu width-200">
                        <router-link v-for="child in item.children" :key="child.path" :to="child.path"
                                     tag="li" active-class="active" :exact="child.exact">
                          <a href="#">{{child.title}}</a>
                        </router-link>
                      </ul>
                    </li>
                    <router-link v-else :to="item.path" :key="item.path"
                                 tag="li" active-class="active" :exact="item.exact">
                      <a href="#">{{item.title}}</a>
                    </router-link>
                  </template>
                </ul>
              </div>
            </div>
          </div>
        </slot>

      </div>

    </div>

    <div class="page-container">

      <div class="page-content">

        <div class="content-wrapper">
          <slot></slot>
        </div>

      </div>

    </div>

    <div class="navbar navbar-default navbar-fixed-bottom footer">
      <slot name="footer">
        <div class="navbar-boxed">
          <ul class="nav navbar-nav visible-xs-block">
            <li><a class="text-center collapsed" data-toggle="collapse" data-target="#footer"><i
              class="icon-circle-up2"></i></a></li>
          </ul>

          <div class="navbar-collapse collapse" id="footer">
            <slot name="footer-left">
              <div class="navbar-text">
                &copy;{{(new Date()).getFullYear()}}. <span class="text-semibold">{{mainTitle}}</span>
              </div>
            </slot>

            <div class="navbar-right">
              <slot name="footer-right"></slot>
            </div>
          </div>
        </div>
      </slot>
    </div>
    <!-- /footer -->

  </div>
</template>

<script>
  import $ from 'jquery';
  import 'bootstrap';
  import 'jquery.nicescroll';

  export default {
    name: 'standard-layout',
    props: {
      mainTitle: {type: String, default: 'Administration'},
      user: {type: Object, required: true},
      menu: {type: Array, default: () => []},
    },
    computed: {
      menuFiltered() {
        return this.filterMenu(this.menu);
      },
    },
    mounted() {
      require('../vendor/app.js');

      // When affixed
      $('#navbar-second').on('affixed.bs.affix', function () {
        $(this)
          .parent()
          .children('.page-header-content')
          .css('padding-bottom', $(this).outerHeight());
        $('body').addClass('navbar-affixed-top');
      });

      // When on top
      $('#navbar-second').on('affixed-top.bs.affix', function () {
        $(this)
          .parent()
          .children('.page-header-content')
          .css('padding-bottom', '');
        $('body').removeClass('navbar-affixed-top');
      });

      // init
      $('#navbar-second, .page-header > .fab-menu').affix({
        offset: {
          top: $('#navbar-second').offset().top,
        },
      });

    },
    data() {
      return {
        viewSecondaryNavbar: false,
      };
    },
    methods: {
      filterMenu(items = [], root = '') {
        return items
          .filter(({path, name, meta = {}}) => (typeof path !== 'undefined') && ((meta.menu !== false) || name))
          .map(
            ({path = '', meta = {}, name = '', children}) => {
              const fullPath = `${root}/${path}`;
              const realChildren = (meta.children || children);
              return {
                path: fullPath,
                exact: !!meta.exact,
                title: meta.menu || meta.title || name,
                active: this.$route.fullPath.startsWith(fullPath),
                children: (meta.children !== false && (realChildren && realChildren.length)) ? this.filterMenu(realChildren, fullPath) : null,
              };
            }
          );
      },
      isRouteActive(route) {
        return this.$route.fullPath.startsWith('/' + route.path);
      },
      toggleSecondaryNavbar() {
        this.viewSecondaryNavbar = !this.viewSecondaryNavbar;
      },
    },
  }
</script>

<style type="text/less" lang="less">

  .table.align-top {
    > thead,
    > tbody,
    > tfoot {
      > tr {
        > th,
        > td {
          vertical-align: top;
          &.align-middle {
            vertical-align: middle;
          }
          &.align-bottom {
            vertical-align: bottom;
          }
        }
      }
    }
  }

</style>
