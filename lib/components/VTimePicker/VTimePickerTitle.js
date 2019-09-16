import "../../../src/components/VTimePicker/VTimePickerTitle.sass"; // Mixins

import PickerButton from '../../mixins/picker-button'; // Utils

import { pad } from '../VDatePicker/util';
import mixins from '../../util/mixins';
import { SelectingTimes } from './VTimePicker';
export default mixins(PickerButton
/* @vue/component */
).extend({
  name: 'v-time-picker-title',
  props: {
    ampm: Boolean,
    disabled: Boolean,
    hour: Number,
    minute: Number,
    second: Number,
    period: {
      type: String,
      validator: period => period === 'am' || period === 'pm'
    },
    readonly: Boolean,
    useSeconds: Boolean,
    selecting: Number
  },
  methods: {
    genTime() {
      let hour = this.hour;

      if (this.ampm) {
        hour = hour ? (hour - 1) % 12 + 1 : 12;
      }

      const displayedHour = this.hour == null ? '--' : this.ampm ? String(hour) : pad(hour);
      const displayedMinute = this.minute == null ? '--' : pad(this.minute);
      const titleContent = [this.genPickerButton('selecting', SelectingTimes.Hour, displayedHour, this.disabled), this.$createElement('span', ':'), this.genPickerButton('selecting', SelectingTimes.Minute, displayedMinute, this.disabled)];

      if (this.useSeconds) {
        const displayedSecond = this.second == null ? '--' : pad(this.second);
        titleContent.push(this.$createElement('span', ':'));
        titleContent.push(this.genPickerButton('selecting', SelectingTimes.Second, displayedSecond, this.disabled));
      }

      return this.$createElement('div', {
        class: 'v-time-picker-title__time'
      }, titleContent);
    },

    genAmPm() {
      return this.$createElement('div', {
        staticClass: 'v-time-picker-title__ampm'
      }, [this.genPickerButton('period', 'am', 'am', this.disabled || this.readonly), this.genPickerButton('period', 'pm', 'pm', this.disabled || this.readonly)]);
    }

  },

  render(h) {
    const children = [this.genTime()];
    this.ampm && children.push(this.genAmPm());
    return h('div', {
      staticClass: 'v-time-picker-title'
    }, children);
  }

});
//# sourceMappingURL=VTimePickerTitle.js.map