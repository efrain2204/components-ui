import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { ComboboxComponent, ComboOption } from './combobox.component';

const meta: Meta<ComboboxComponent> = {
    title: 'Atoms/Combo',
    component: ComboboxComponent,
    decorators: [
        moduleMetadata({
            imports: [ReactiveFormsModule]
        })
    ]
};

export default meta;

type Story = StoryObj<ComboboxComponent>;

const options: ComboOption[] = [
    { value: 'Perú', id: 'pe' },
    { value: 'México', id: 'mx' },
    { value: 'Chile', id: 'cl' },
    { value: 'Argentina', id: 'ar' }
];

export const Default: Story = {
    render: () => ({
        props: {
            control: new FormControl<ComboOption | null>(null),
            options
        }
    })
};

export const WithValue: Story = {
    render: () => ({
        props: {
            control: new FormControl<ComboOption | null>(options[0]),
            options
        }
    })
};

export const Disabled: Story = {
    render: () => ({
        props: {
            control: new FormControl<ComboOption | null>({
                value: options[1],
                disabled: true
            }),
            options
        }
    })
};