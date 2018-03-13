<template>
  <div class="input-group">
    <span class="input-group-addon"><i class="icon icon-calendar"></i></span>
    <input ref="date" type="text" :value="formattedValue.join(separator)" @change="onChange" class="form-control" :placeholder="placeholder" :required="required" v-bind="$attrs">
    <span class="input-group-btn" v-if="!required && value && value.length">
      <button type="button" class="btn btn-default" @click="clear" title="Effacer la sélection"><i class="icon icon-backspace2"></i></button>
    </span>
  </div>
</template>

<script>
  import $ from 'jquery';
  import moment from 'moment';
  import dateRangePicker from '../../vendor/jquery.daterangepicker.js'; // Direct reference to module doesn't work :'(

  export default {
    props: {
      value: Array, // [from: Date, to: Date]
      placeholder: String,
      required: Boolean,
      maxDate: Date,
      format: {type: String, default: 'DD/MM/YYYY'},
      language: {type: String, default: 'fr'},
      separator: {type: String, default: ' -> '},
      ranges: {
        type: [Boolean, Array], default() {
          return [
            {name: 'Cette semaine', dates: () => [moment().startOf('week').toDate(), moment().endOf('week').toDate()]},
            {name: 'La semaine dernière', dates: () => [moment().add(-1, 'week').startOf('week').toDate(), moment().add(-1, 'week').endOf('week').toDate()]},
            {name: 'Ce mois-ci', dates: () => [moment().startOf('month').toDate(), moment().endOf('month').toDate()]},
            {name: 'Le mois dernier', dates: () => [moment().add(-1, 'month').startOf('month').toDate(), moment().add(-1, 'month').endOf('month').toDate()]},
            {name: 'Cette année', dates: () => [moment().startOf('year').toDate(), moment().endOf('year').toDate()]},
            {name: 'L\'année dernière', dates: () => [moment().add(-1, 'year').startOf('year').toDate(), moment().add(-1, 'year').endOf('year').toDate()]},
          ];
        }
      },
      options: Object,
    },
    computed: {
      formattedValue() {
        return (this.value || []).map(date => moment(date).format(this.format));
      },
      startDate() {
        return this.value && this.value.length && this.value[0];
      },
      endDate() {
        return this.value && this.value.length && (this.value[1] || this.value[0]);
      },
    },
    created() {
      dateRangePicker($, moment);
    },
    mounted() {
      const thisComponent = this;
      this._opts = {
        autoClose: true,
        format: this.format,
        separator: this.separator,
        language: this.language,
        startOfWeek: 'monday',
        startDate: false,
        endDate: this.maxDate,
        time: {
          enabled: false
        },
        minDays: 0,
        maxDays: 0,
        showShortcuts: !!this.ranges,
        shortcuts: null,
        customShortcuts: this.ranges || null,
        inline: false,
        container: 'body',
        alwaysOpen: false,
        singleDate: false,
        lookBehind: false,
        batchMode: false,
        duration: 200,
        stickyMonths: false,
        dayDivAttrs: [],
        dayTdAttrs: [],
        applyBtnClass: 'bg-slate-600',
        singleMonth: 'auto',
        showTopbar: false,
        swapTime: false,
        selectForward: false,
        selectBackward: false,
        showWeekNumbers: false,
        customTopBar: this.placeholder,
        customArrowPrevSymbol: '&lsaquo;',
        customArrowNextSymbol: '&rsaquo;',
        ...this.options,
      };
      this._picker = $(this.$refs.date).dateRangePicker(this._opts)
        .bind('datepicker-change', (evt, {date1: start, date2: end}) => {
          const value = [start, end];
          thisComponent.$emit('input', value);
        })
        .bind('datepicker-apply', (evt, {date1: start, date2: end}) => {
          const value = [start, end];
          thisComponent.$emit('input', value);
        });
      this.updateDateRange();
    },
    updated() {
      this.updateDateRange();
    },
    beforeDestroy() {
      $(this.$refs.date).data('dateRangePicker').destroy();
    },
    methods: {
      updateDateRange() {
        const daterange = $(this.$refs.date).data('dateRangePicker');
        if (!this.startDate && !this.endDate) {
          daterange.clear();
          this.$emit('input', null);
          return;
        }
        daterange.setDateRange(this.startDate, this.endDate, true);
      },
      getValidValue(date, format, locale) {
        if (moment(date, format, locale).isValid()) {
          return moment(date, format, locale).toDate();
        } else {
          return moment().toDate();
        }
      },
      clear() {
        const daterange = $(this.$refs.date).data('dateRangePicker');
        daterange.clear();
        this.$emit('input', null);
      },
      onChange(evt) {
        const valueStr = evt.currentTarget.value;
        const defaults = valueStr ? valueStr.split(this.separator) : '';

        if (defaults && defaults.length >= 2) {
          let format = this.format;
          if (format.match(/Do/)) {

            format = format.replace(/Do/, 'D');
            defaults[0] = defaults[0].replace(/(\d+)(th|nd|st)/, '$1');
            if (defaults.length >= 2) {
              defaults[1] = defaults[1].replace(/(\d+)(th|nd|st)/, '$1');
            }
          }
          const value = [
            this.getValidValue(defaults[0], format, moment.locale(this.language)),
            this.getValidValue(defaults[1], format, moment.locale(this.language)),
          ];
          this.$emit('input', value);
        }
      },
    }
  };
</script>


<style type="text/less" lang="less">

  @import "../../less/colors.less";

  /* Date picker */

  .date-picker {
    width: 170px;
    height: 25px;
    padding: 0 0 0 10px;
    border: 0;
    line-height: 25px;
    font-weight: 700;
    cursor: pointer;
    color: @text-color;
    position: relative;
    z-index: 2;
  }

  .date-picker-wrapper {
    background-color: @dropdown-bg;
    border: 1px solid @dropdown-border;
    border-radius: @border-radius-base;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    box-sizing: initial;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .1);
    color: @text-color;
    font-size: @font-size-base;
    font-family: @font-family-base;
    line-height: @line-height-base;
    margin-top: -5px;
    padding: (@list-spacing * 2);
    position: absolute;
    z-index: @zindex-modal;
    .drp_top-bar {
      .error-top {
        display: none;
      }
      .normal-top {
        display: none;
      }
      line-height: 1.4;
      position: relative;
      padding: 10px 40px 10px 0;
      text-align: center;
      .default-top {
        display: block;
      }
      .apply-btn {
        position: absolute;
        right: 0;
        top: 6px;
        padding: 3px 5px;
        margin: 0;
        font-size: 12px;
        border-radius: 4px;
        cursor: pointer;
        border: 1px solid #0076a3;
        background: #0095cd;
        background: -webkit-gradient(linear, left top, left bottom, from(#00adee), to(#0078a5));
        background: -moz-linear-gradient(top, #00adee, #0078a5);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00adee', endColorstr='#0078a5');
        color: @btn-success-color;
        line-height: initial;
      }
      .apply-btn.disabled {
        cursor: pointer;
        color: @btn-link-disabled-color;
        border: 1px solid #b7b7b7;
        background: #fff;
        background: -webkit-gradient(linear, left top, left bottom, from(#fff), to(#ededed));
        background: -moz-linear-gradient(top, #fff, #ededed);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ededed');
      }
    }
    .month-wrapper {
      table {
        .day.lastMonth {
          display: none;
        }
        .day.nextMonth {
          display: none;
        }
        width: 210px;
        float: left;
        td {
          vertical-align: middle;
          text-align: center;
          margin: 0;
          padding: 0;
          width: 30px;
        }
        th {
          color: @text-muted;
          font-weight: normal;
          font-size: @font-size-small;
          margin: 0;
          padding: 0;
          text-align: center;
          vertical-align: middle;
        }
        .day {
          color: @text-muted;
          cursor: default;
          font-size: @font-size-small;
          line-height: 1;
          padding: 7px 0;
          &:hover {
            color: darken(@text-color, 50%);
          }
        }
        div.day.lastMonth {
          color: @text-muted;
          cursor: default;
        }
        div.day.nextMonth {
          color: @text-muted;
          cursor: default;
        }
        .day.checked {
          background-color: @color-teal-50;
        }
        .week-name {
          height: 20px;
          line-height: 20px;
          font-weight: 100;
          text-transform: uppercase;
          th {
            font-size: 10px;
          }
        }
        .day.has-tooltip {
          cursor: help !important;
        }
        .day.toMonth.valid {
          color: @text-color;
          cursor: pointer;
        }
        .day.toMonth.hovering {
          background-color: @dropdown-link-hover-bg;
        }
        .day.real-today {
          border: 1px solid @color-teal-400;
          border-radius: @border-radius-base;
          font-weight: bold;
          padding: 6px 0;
        }
        .day.real-today.checked {
          background-color: @color-teal-50;
        }
        .day.first-date-selected {
          border-bottom-left-radius: @border-radius-base;
          border-top-left-radius: @border-radius-base;
        }
        .day.last-date-selected {
          border-bottom-right-radius: @border-radius-base;
          border-top-right-radius: @border-radius-base;
        }
        .day.real-today.hovering {
          background-color: @dropdown-link-hover-bg;
        }
      }
      background-color: #fff;
      cursor: default;
      display: inline;
      float: right;
      position: relative;
      table.month2 {
        width: 210px;
        float: left;
      }
    }
    .selected-days {
      display: none;
    }
    .footer {
      bottom: auto;
      display: inline !important;
      float: left;
      font-size: @font-size-small;
      line-height: @line-height-small;
      position: static;
      .shortcuts {
        margin-right: @list-spacing * 2;
        width: 160px;
        b {
          color: @text-muted;
          display: block;
          font-size: @font-size-mini;
          font-weight: normal;
          line-height: 20px;
          text-align: center;
          text-transform: uppercase;
        }
        .custom-shortcut {
          display: block;
          margin-top: -(@line-height-small * @font-size-small) + 2px;
          a {
            border: 1px solid transparent;
            color: @text-color;
            cursor: pointer;
            display: block;
            font-size: @font-size-mini;
            line-height: 1;
            margin: 0;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            white-space: nowrap;
            padding: 6px 0;

            &:hover,
            &:focus,
            &.focus {
              background-color: @dropdown-link-hover-bg;
              text-decoration: none;
            }

            &:active,
            &.active {
              color: @dropdown-link-active-color;
              background-color: @color-teal-400;
            }
          }
        }
      }
    }
    b {
      color: @text-color;
      font-weight: 700;
    }
    a {
      color: @link-color;
      text-decoration: underline;
    }
    .month-name {
      text-transform: capitalize;
      .month-element {
        display: inline;
        padding: 0 3px;
        &:first-child {
          color: @text-color;
          font-size: @font-size-base;
          font-weight: 500;
        }
      }
    }
    .time {
      label {
        white-space: nowrap;
      }
      position: relative;
      input[type=range] {
        vertical-align: middle;
        width: 129px;
        padding: 0;
        margin: 0;
        height: 20px;
      }
    }
    table {
      .caption {
        height: 30px;
        .prev, .next {
          border-radius: @btn-border-radius-base;
          color: @text-muted;
          cursor: pointer;
          display: block;
          font-size: 30px;
          font-weight: 100;
          line-height: 25px;
          padding-bottom: 5px; // Better visual alignment
          &:hover {
            background-color: @gray-lighter;
            color: @text-color;
          }
        }
      }
    }

    @gapWidth: 10px;
    @gapHeight: 15px;
    @gapLineWidth: @gapWidth / 2;
    @gapLineHeight: @gapHeight / 2;
    .gap {
      position: relative;
      z-index: 1;
      width: @gapWidth;
      background-color: #fff;
      bottom: 0;
      font-size: 0;
      line-height: 0;
      float: left;
      top: 0px;
      margin: auto @list-spacing;
      visibility: hidden;
      height: 0;
      .gap-lines {
        height: 100%;
        overflow: hidden;
      }
      .gap-line {
        height: @gapHeight;
        width: @gapWidth;
        position: relative;
        .gap-1 {
          z-index: 1;
          height: 0;
          border-left: @gapLineWidth solid #fff;
          border-top: @gapLineHeight solid @gray-lighter;
          border-bottom: @gapLineHeight solid @gray-lighter;
        }
        .gap-2 {
          position: absolute;
          right: 0;
          top: 0;
          z-index: 2;
          height: 0;
          border-left: @gapLineWidth solid transparent;
          border-top: @gapLineHeight solid #fff;
        }
        .gap-3 {
          position: absolute;
          right: 0;
          top: @gapLineHeight;
          z-index: 2;
          height: 0;
          border-left: @gapLineWidth solid transparent;
          border-bottom: @gapLineHeight solid #fff;
        }
      }
      .gap-top-mask {
        width: 6px;
        height: 1px;
        position: absolute;
        top: -1px;
        left: 1px;
        background-color: @panel-bg;
        z-index: 3;
      }
      .gap-bottom-mask {
        width: 6px;
        height: 1px;
        position: absolute;
        bottom: -1px;
        left: 7px;
        background-color: @panel-bg;
        z-index: 3;
      }
    }
    .drp_top-bar.error {
      .default-top {
        display: none;
      }
      .error-top {
        display: block;
        color: @alert-warning-text;
      }
    }
    .drp_top-bar.normal {
      .default-top {
        display: none;
      }
      .normal-top {
        display: block;
      }
    }
    .hide {
      display: none;
    }
    .time1 {
      width: 180px;
      padding: 0 5px;
      text-align: center;
      float: left;
    }
    .time2 {
      float: right;
    }
    .hour {
      text-align: right;
    }
    .first-date-selected {
      background-color: @color-teal-400 !important;
      color: #fff !important;
    }
    .last-date-selected {
      background-color: @color-teal-400 !important;
      color: #fff !important;
    }
    .date-range-length-tip {
      background-color: @tooltip-bg;
      border-radius: @border-radius-base;
      color: @tooltip-color;
      display: none;
      font-size: @font-size-small;
      line-height: @line-height-small;
      margin-left: -9px;
      margin-top: -12px;
      padding: 4px 8px;
      position: absolute;
      text-transform: lowercase;
      &:after {
        content: '';
        position: absolute;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid @tooltip-bg;
        left: 50%;
        margin-left: -4px;
        bottom: -4px;
      }
    }
    .week-number {
      padding: 5px 0;
      line-height: 1;
      font-size: 12px;
      margin-bottom: 1px;
      color: @text-muted;
      cursor: pointer;
    }
    .week-number.week-number-selected {
      color: @color-teal-400;
      font-weight: 700;
    }
  }

  .date-picker-wrapper.inline-wrapper {
    position: relative;
    box-shadow: none;
    display: inline-block;
  }

  .date-picker-wrapper.single-date {
    width: auto;
  }

  .date-picker-wrapper.single-month {
    .time {
      display: block;
    }
    .time2 {
      display: none;
    }
  }

  .date-picker-wrapper.two-months.no-gap {
    .month1 {
      .next {
        display: none;
      }
    }
    .month2 {
      .prev {
        display: none;
      }
    }
  }

  .time2 {
    width: 180px;
    padding: 0 5px;
    text-align: center;
  }

  .minute {
    text-align: right;
  }

  @media (max-width: @screen-sm) {
    .date-picker-wrapper {
      .footer,
      .month1,
      .month2 {
        clear: both !important;;
        float: none !important;;
        display: block !important;
      }
      .footer {
        overflow: hidden;
      }
      .footer .shortcuts {
        border-top: 1px solid @gray-lighter;
        margin-right: 0;
        margin-top: @list-spacing;
        padding-top: @list-spacing;
        width: 100%;
      }
    }
  }

</style>
