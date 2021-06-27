import { Component, h } from '@stencil/core';

@Component({
  tag: 'cb-modal-body',
  styleUrl: 'modal-body.scss',
  shadow: true,
})
export class ModalBodyComponent {
  render() {
    return (
      <section id="main">
        <slot></slot>
      </section>
    );
  }
}