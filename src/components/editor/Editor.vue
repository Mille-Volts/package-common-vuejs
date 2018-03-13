<template>
  <section class="editor" :class="{disabled}">
    <div ref="toolbar">
      <slot name="toolbar">
        <span class="ql-formats" v-if="advanced">
          <select class="ql-header">
            <option value="2">Titre principal</option>
            <option value="3">Titre secondaire</option>
            <option selected>Paragraphe</option>
          </select>
        </span>

        <span class="ql-formats">
          <button class="ql-bold"></button>
          <button class="ql-italic"></button>
          <button class="ql-underline"></button>
          <button class="ql-strike" v-if="advanced"></button>
          <button class="ql-link" v-if="advanced"></button>
        </span>

        <template v-if="advanced">
          <span class="ql-formats">
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
          </span>

          <span class="ql-formats">
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
          </span>
        </template>

        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </slot>
    </div>
    <div ref="editor" :style="stylesDyn"></div>
  </section>
</template>

<style type="text/css" lang="css">
  @import "~/node_modules/quill/dist/quill.snow.css";
</style>

<style type="text/less" lang="less" scoped>
  .ql-container {
  }

  .ql-snow .ql-picker.ql-header {
    width: 140px;
  }

  .ql-toolbar.ql-snow {
    background: #eee;
  }

  .ql-container.ql-snow {
    background: #fff;
  }

  .editor.disabled {
    .ql-container.ql-snow {
      background: #eee;
      opacity: 0.67;
    }
    .ql-toolbar {
      opacity: 0.67;
      pointer-events: none;
    }
  }
</style>

<script>
  import $ from 'jquery';
  import _omit from 'lodash/omit';
  import Quill from 'quill';

  export default {
    props: {
      value: String,
      height: [String, Number],
      disabled: Boolean,
      placeholder: String,
      advanced: Boolean, // Éditeur simple ou avancé
      toolbar: [Array, Object, Boolean],
    },
    computed: {
      stylesDyn() {
        let height;
        let lines = this.height || 8;
        const lineHeight = '1.42em';
        const paddingHInPx = '(12px * 2)';
        if (typeof(this.height) === 'string') {
          switch (this.height) {
            case 'line':
            case 'one':
            case 'single':
              lines = 1;
              break;
            case 'mini':
              lines = 2;
              break;
            case 'small':
              lines = 4;
              break;
            case 'default':
            case 'medium':
            case 'normal':
            case 'standard':
              lines = 8;
              break;
            case 'big':
            case 'tall':
              lines = 16;
              break;
            default:
              height = this.height;
          }
        }
        if (!height) {
          height = `calc(${lines}*${lineHeight} + ${paddingHInPx})`;
        }
        return {
          height,
        };
      },
      opts() {
        return {
          modules: {
            toolbar: this.toolbar ? this.toolbar : this.$refs.toolbar,
          },
          placeholder: this.placeholder,
        }
      },
    },
    watch: {
      disabled() {
        this.updateEditor();
      },
    },
    mounted() {
      // Set value outside of render so this is not updated every time
      $(this.$refs.editor).html(this.value || '');

      this._editor = new Quill(this.$refs.editor, {
        theme: 'snow',
        ...this.opts,
      });
      const listeners = _omit(this.$listeners, ['input', 'change']);
      this._editor.on('text-change', () => {
        const value = $('.ql-editor', this.$refs.editor).html();
        this.$emit('input', value);
        this.$emit('change', value);
      });
      for (const event in listeners) {
        this._editor.on(event, this.$listeners[event])
      }
      this.updateEditor();
    },
    updated() {
      this.updateEditor();
    },
    methods: {
      updateEditor() {
        this._editor.enable(!this.disabled);
      },
    },
  };
</script>
