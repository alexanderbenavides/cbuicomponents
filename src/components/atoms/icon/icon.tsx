import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'cb-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {
    @Prop({ reflect: true, mutable: true }) name: string;
    @Prop({ reflect: true, mutable: true }) size: string = '32';
    @State() iconStyle = {
        width: this.size + 'px',
        height: this.size + 'px',
        color: 'red'
    }
    render() {
    return (
        <img src={`../../../assets/icons/${this.name}.svg`} alt={this.name} style= {this.iconStyle}/>
    );
  }
}