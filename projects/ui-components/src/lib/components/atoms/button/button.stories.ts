import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
    title: 'Atoms/Button',
    component: ButtonComponent
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
    args: { type: 'primary' },
    render: (args) => ({
        props: args,
        template: `<app-button type="primary">Primary Button</app-button>`
    })
};

export const Secondary: Story = {
    render: () => ({
        template: `<app-button type="secondary">Secondary Button</app-button>`
    })
};

export const Danger: Story = {
    render: () => ({
        template: `<app-button type="danger">Danger Button</app-button>`
    })
};