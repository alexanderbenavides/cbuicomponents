import { Component, h } from '@stencil/core';

@Component({
  tag: 'cb-modal-footer',
  styleUrl: 'modal-footer.scss',
  shadow: true,
})
export class ModalFooterComponent {
  render() {
    // const color = `abc-paragraph ${this.color}`;
    return (
      <section id="actions">
        <slot />
      </section>
    );
  }
}