import { Meta, StoryObj } from "@storybook/angular";
import { InputTextComponent } from "./input-text.component";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";

export default {
    title: 'Atoms/InputText',
    component: InputTextComponent,
    decorators: [
        (story) => ({
            moduleMetadata: {
                imports: [ReactiveFormsModule]
            },
            ...story()
        })
    ]
} as Meta<InputTextComponent>;

export const Default = {
    render: () => ({
        props: {
            formControl: new FormControl('')
        },
        template: `<input-text [formControl]="formControl"></input-text>`
    })
};