import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import Header from '~/components/molecules/header'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
 title: 'Example/Header',
 component: Header,
 // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
 argTypes: {
  variant: {
   options: ['text', 'contained', 'outlined'],
   control: { type: 'select' },
  },
 },
} as ComponentMeta<typeof Header>

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = () => <Header />

export const Primary = Template.bind({})
