import { Component, h } from '@stencil/core';

@Component({
  tag: 'cb-modal-header',
  styleUrl: 'modal-header.scss',
  shadow: true,
})
export class ModalHeaderComponent {
  render() {
    return (
      <header>
        <slot></slot>
      </header>
    );
  }
}