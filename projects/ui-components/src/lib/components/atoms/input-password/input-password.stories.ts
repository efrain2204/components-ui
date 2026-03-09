import { Meta, StoryObj } from "@storybook/angular";
import { InputPasswordComponent } from "./input-password.component";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

const meta: Meta<InputPasswordComponent> = {
    title: 'Atoms/InputPassword',
    component: InputPasswordComponent,
    decorators: [
        (story) => ({
            moduleMetadata: {
                imports: [ReactiveFormsModule],
            },
            ...story(),
        }),
    ],
};

export default meta;

type Story = StoryObj<InputPasswordComponent>;

export const Default: Story = {
    render: () => {
        const control = new FormControl('');

        return {
            props: {
                control,
            },
            template: `
        <div style="max-width: 400px;">
          <input-password [formControl]="control"></input-password>

          <p style="margin-top:16px;">
            Valor actual: {{ control.value }}
          </p>
        </div>
      `,
        };
    },
};

export const WithInitialValue: Story = {
    render: () => {
        const control = new FormControl('123456');

        return {
            props: {
                control,
            },
            template: `
        <div style="max-width: 400px;">
          <ft-input-password [formControl]="control"></ft-input-password>

          <p style="margin-top:16px;">
            Valor actual: {{ control.value }}
          </p>
        </div>
      `,
        };
    },
};