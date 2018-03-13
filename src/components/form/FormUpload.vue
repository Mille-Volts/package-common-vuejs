<template>
  <div class="file-input">
    <slot name="preview"></slot>
    <div class="input-group">
      <div class="form-control file-caption">
        <div class="file-caption-name" v-if="value">
          <i class="glyphicon glyphicon-file"></i> {{(file && file.name) || value}}
        </div>
        <div class="file-caption-name" v-else-if="uploading">
          <i class="icon-spinner spinner position-left"></i> {{uploadingLabel}}
        </div>
        <div class="file-caption-name text-muted" v-else>{{emptyLabel}}</div>
      </div>
      <div class="input-group-btn">
        <button type="button" v-if="value" title="Effacer ce fichier" class="btn btn-default fileinput-remove fileinput-remove-button" @click.prevent="remove">
          <i class="icon-cross3"></i> <span class="hidden-xs">{{removeLabel}}</span>
        </button>
        <div class="btn btn-primary btn-file" title="Parcourir..." :class="{disabled: uploading}">
          <i class="icon-file-plus"></i> <span class="hidden-xs">{{browseLabel}}</span>
          <input type="file" class="form-control"
                 :required="required && !value" @change="onUpload"
                 v-bind="$attrs"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" type="text/less" scoped>
  .input-group {
    margin: 0 auto;
  }
</style>

<script>
  export default {
    props: {
      processUpload: {type: Function, required: true},
      value: [Number, String, Array],
      required: Boolean,
      browseLabel: {type: String, default: 'Parcourir...'},
      emptyLabel: {type: String, default: 'Aucun fichier sélectionné'},
      removeLabel: {type: String, default: 'Effacer'},
      uploadingLabel: {type: String, default: 'En cours d\'envoi...'},
    },
    data() {
      return {
        uploading: false,
        file: null,
      };
    },
    methods: {
      remove() {
        this.$emit('input', null);
        this.$emit('change', null);
      },
      onUpload({target: {files}}) {
        if (!files || !files.length) return;
        this.uploading = true;
        this.error = null;
        this.processUpload(files)
          .then(() => {
            this.uploading = false;
          })
          .catch(() => {
            this.uploading = false;
          });
      },
    }
  };
</script>
