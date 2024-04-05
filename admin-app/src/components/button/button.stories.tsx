import type { Meta, StoryObj } from '@storybook/react'
import { PencilIcon } from '@heroicons/react/24/outline'

import { Button } from './button'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Common: Story = {
  args: {
    label: 'Common',
  },
}

export const Solid: Story = {
  args: {
    label: 'Solid',
    variant: 'solid',
  },
}

export const Outline: Story = {
  args: {
    label: 'Outline',
    variant: 'outline',
  },
}

export const SizeXs = {
  args: {
    label: 'Button',
    size: 'xs',
  },
}

export const SizeSm = {
  args: {
    label: 'Button',
    size: 'sm',
  },
}

export const SizeMd = {
  args: {
    label: 'Button',
    size: 'md',
  },
}

export const SizeLg = {
  args: {
    label: 'Button',
    size: 'lg',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Common',
  },
}

export const Loading: Story = {
  args: {
    label: 'Common',
    loading: true,
  },
}

export const Icon: Story = {
  args: {
    icon: PencilIcon,
    label: 'Common',
  },
}
