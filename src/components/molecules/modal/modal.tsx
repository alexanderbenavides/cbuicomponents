import { Component, h, Listen, Method, Prop } from '@stencil/core';

@Component({
  tag: 'cb-modal',
  styleUrl: 'modal.scss',
  shadow: true,
})
export class ModalComponent {
    @Prop({ reflect: true, mutable: true }) modalOpen: boolean;
    @Prop({ reflect: true, mutable: true }) ignoreBackDrop: boolean;
    

  @Method() async open() {
    this.modalOpen = true;
    document.querySelector('body').setAttribute('style', 'overflow: hidden');    
  }

  @Method() async close() {
    this.modalOpen = false;
    document.querySelector('body').removeAttribute('style');
  }
  @Listen('onClickIconCloseModal')
  onClickIconCloseModalHandler(event: CustomEvent<boolean>) {
    if (!event.detail) return;
      this.close();
  }
  render() {      
    return [
      <div id="backdrop"></div>,
      <div class="modal-container" onClick={this.ignoreBackDrop? null : this.close.bind(this)}>
        <div id="modal">
            <slot />
        </div>
      </div>,
    ];
  }
}