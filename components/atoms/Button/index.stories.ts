import Button from './index.vue'

export default {
  title: 'Atoms/Button',
  component: Button,
}

export const Primary = {
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">{{ args.label }}</Button>',
  }),
  args: { label: 'Primary Button', light: false },
}

export const Light = {
  render: (args: any) => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">{{ args.label }}</Button>',
  }),
  args: { label: 'Light Button', light: true },
}
