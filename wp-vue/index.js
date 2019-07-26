import Vue from 'vue/dist/vue.common.js';
import template from './template.html';
import $ from 'jquery';

export default Vue.component('page-history-bee',{
  template: template,
  props:['page'],

  data() {
    return {
      currentIndex: 0,
    };
  },

  mounted(){
    this.smoothScroll();
  },

  computed: {
    activeResource(){
      return this.page.acf.for_teachers_section.resources[this.currentIndex];
    },
  },

  methods: {
      smoothScroll() {
          $(document).on('click', 'a[href^="#"]', function (event) {
              event.preventDefault();

          $('html, body').animate({
              scrollTop: $($.attr(this, 'href')).offset().top - 150
          }, 500);
        });
    },
  },

});
