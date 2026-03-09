import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ModalComponent } from "./modal.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

const meta: Meta<ModalComponent> = {
    title: 'Atoms/Modal',
    component: ModalComponent,
    decorators: [
        moduleMetadata({
            imports: [CommonModule]
        })
    ],
    argTypes: {
        close: { action: 'closed' }
    }
};

export default meta;

type Story = StoryObj<ModalComponent>;
export const Default: Story = {
    render: (args) => {
        let isOpen = true;

        return {
            props: {
                ...args,
                isOpen,
                open: () => {
                    isOpen = true;
                },
                onClose: () => {
                    isOpen = false;
                }
            },
            template: `
        <button (click)="isOpen = true">Open Modal</button>

        <app-modal
          *ngIf="isOpen"
          [title]="title"
          [size]="size"
          (close)="isOpen = false"
        >
          <p>Contenido del modal</p>
        </app-modal>
      `
        };
    },
    args: {
        title: 'Modal Title',
        size: 'md'
    }
};

export const Large: Story = {
    args: {
        title: 'Large Modal',
        size: 'lg'
    },
    render: (args) => ({
        props: {
            ...args,
            isOpen: true
        },
        template: `
      <button (click)="isOpen = true">Open Modal</button>

      <app-modal
        *ngIf="isOpen"
        [title]="title"
        [size]="size"
        (close)="isOpen = false"
      >
        <p>Modal tamaño grande</p>
      </app-modal>
    `
    })
};

export const Small: Story = {
    args: {
        title: 'Small Modal',
        size: 'sm'
    },
    render: (args) => ({
        props: {
            ...args,
            isOpen: true
        },
        template: `
      <button (click)="isOpen = true">Open Modal</button>

      <app-modal
        *ngIf="isOpen"
        [title]="title"
        [size]="size"
        (close)="isOpen = false"
      >
        <p>Modal pequeño</p>
      </app-modal>
    `
    })
};