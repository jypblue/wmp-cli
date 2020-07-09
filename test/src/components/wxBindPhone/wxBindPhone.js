import { VantComponent } from '../vant/common/component';

VantComponent({
  props: {
    show: Boolean,
    zIndex: {
      type: Number,
      value: 100
    },
    overlay: {
      type: Boolean,
      value: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    handleCancel() {
      this.$emit('cancel');
    },
    handleConfirm(event) {
      this.$emit('confirm', event.detail);
    }
  }
});
