import type { Meta, StoryObj } from '@storybook/react'

import { Alert } from './alert'

const meta = {
  component: Alert,
  tags: ['autodocs'],
  title: 'Alert',
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    title: 'Ocorreu um erro',
    description: 'Talvez você deve tentar mais tarde',
    type: 'error'
  },
}
