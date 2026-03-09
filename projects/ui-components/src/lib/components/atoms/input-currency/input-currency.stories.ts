import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputCurrencyComponent } from "./input-currency.component";
import { Meta, StoryObj } from "@storybook/angular";

const meta: Meta<InputCurrencyComponent> = {
    title: 'Atoms/InputCurrency',
    component: InputCurrencyComponent,
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

type Story = StoryObj<InputCurrencyComponent>;

export const Default: Story = {
    render: () => {
        const control = new FormControl<number | null>(null);

        return {
            props: { control },
            template: `
        <div style="max-width: 400px;">
          <input-currency
            currencySymbol="S/"
            [formControl]="control">
          </input-currency>

          <p style="margin-top:16px;">
            Valor numérico: {{ control.value }}
          </p>
        </div>
      `,
        };
    },
};

export const WithInitialValue: Story = {
    render: () => {
        const control = new FormControl<number | null>(1500.5);

        return {
            props: { control },
            template: `
        <div style="max-width: 400px;">
          <input-currency
            currencySymbol="$"
            [formControl]="control">
          </input-currency>

          <p style="margin-top:16px;">
            Valor numérico: {{ control.value }}
          </p>
        </div>
      `,
        };
    },
};

export const RequiredValidation: Story = {
    render: () => {
        const control = new FormControl<number | null>(null, Validators.required);

        return {
            props: { control },
            template: `
        <div style="max-width: 400px;">
          <input-currency
            currencySymbol="S/"
            [formControl]="control">
          </input-currency>

          <p *ngIf="control.invalid && control.touched"
             style="color:#c62828; margin-top:8px;">
            Este campo es obligatorio
          </p>
        </div>
      `,
        };
    },
};