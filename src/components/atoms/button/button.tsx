import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'cb-button',
  styleUrl: 'button.scss'
})
export class Button {
    @Prop({reflect: true}) size: string = 'md';
    @Prop({reflect: true}) tier: string = 'primary';
    @Prop({reflect: true}) disabled: boolean;
    render() {    
    return (
      <button class= {`btn-${this.size} ${this.tier} ${this.disabled ? 'btn-disabled': ''}`}>
          <slot>Text button</slot>
      </button>
    );
  }
}