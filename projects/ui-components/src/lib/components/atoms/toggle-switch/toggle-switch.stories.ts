import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ToggleSwitchComponent } from "./toggle-switch.component";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";

const meta: Meta<ToggleSwitchComponent> = {
    title: 'Atoms/ToggleSwitch',
    component: ToggleSwitchComponent,
    decorators: [
        moduleMetadata({
            imports: [ReactiveFormsModule]
        })
    ]
};

export default meta;

type Story = StoryObj<ToggleSwitchComponent>;

export const Default: Story = {
    render: () => ({
        props: {
            control: new FormControl<boolean>(false),
            disabled: true
        }
    })
};

export const Checked: Story = {
    render: () => ({
        props: {
            control: new FormControl<boolean>(true),
            disabled: false
        }
    })
};

export const Disabled: Story = {
    render: () => ({
        props: {
            control: new FormControl<boolean>(false),
            disabled: true
        }
    })
};

export const DisabledChecked: Story = {
    render: () => ({
        props: {
            control: new FormControl<boolean>(true),
            disabled: true
        }
    })
};