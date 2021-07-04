import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'cb-modal-header',
  styleUrl: 'modal-header.scss',
  shadow: true,
})
export class ModalHeaderComponent {
  @Event() onClickIconCloseModal: EventEmitter<boolean>;

  private closeModal() {
    this.onClickIconCloseModal.emit(true);
  }
  render() {
    return (
      <header>
        <slot></slot>
        <cb-icon name= 'cb-close' onClick= {this.closeModal.bind(this)}/>
      </header>
    );
  }
}