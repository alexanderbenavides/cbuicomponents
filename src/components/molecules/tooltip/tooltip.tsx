import { Component, h, Prop, Host, Listen, State, Element } from "@stencil/core";

@Component({
    tag: 'cb-tooltip',
    styleUrl: 'tooltip.scss'
})

export class Tooltip {
@Prop({mutable: true, reflect: true}) text: string;
@Prop({mutable: true, reflect: true}) trigger: string = 'hover';
@Prop({mutable: true, reflect: true}) position: string = 'bottom';
@State() tooltipContainerClass = `tooltip-hidden `;
@State() defaultContainerClass = 'tooltip-hidden ';
@State() ignoreClasses = ['tooltip-hidden', 'tooltip-container', 'toltip-content'];
@Element() hostElement: HTMLElement;
@State() isOverContainer = false;
private tooltipContainer?: HTMLDivElement;

private onMouseOverContainer() {
   this.isOverContainer = true;
    
}
@Listen('click', { target: 'window' })
_clickHandler(event: MouseEvent) {
    const targetEl = (event.target as HTMLElement);    
    const checkTooltipClass = this.tooltipContainerClass.includes('tooltip-container');         
    if (checkTooltipClass) {
        this.tooltipContainerClass = this.defaultContainerClass;
    } else {
        if (this.hostElement.querySelector(targetEl.tagName) !== targetEl) return;
        this.tooltipContainerClass = 'tooltip-container';
    }

}

@Listen('mouseover')
_mouseoverHandler(event: MouseEvent) {
    if (!event) return;
    if (this.trigger === 'hover') {        
        this.tooltipContainerClass = 'tooltip-container';
    }
    
}
@Listen('mouseleave')
_mouseleaveHandler(event: MouseEvent) {
    if (!event) return;
    if (this.trigger === 'hover') {
        this.tooltipContainerClass = this.defaultContainerClass;
    }
}

@Listen('resize', { target: 'window' })
_resizeHandler(event: MouseEvent) {
    if (!event) return;
    this.setTooltipStyle();
}

private marginLeftTooltip() {
    const childElement = this.hostElement.children[0] as HTMLElement;
    const offsetWidth = childElement.offsetWidth / 2;
    const halftWidthTooltip = 240 / 2;
    const paddLeftTooltip = 24;
    

    const subtract = halftWidthTooltip - offsetWidth + paddLeftTooltip;
    
    const coords = childElement.getBoundingClientRect()as DOMRect;
    return coords.left - subtract;
}

private setTooltipStyle() {
    const mlTooltip = this.marginLeftTooltip();  
    this.tooltipContainer.style.marginLeft = mlTooltip + 'px';
}

componentDidLoad() {
  this.setTooltipStyle();
}
render() {    
    return (
        <Host>
        <div class={this.tooltipContainerClass}  ref= {el => this.tooltipContainer = el} onMouseOver= {this.onMouseOverContainer.bind(this)}>
            <span class="toltip-content" innerHTML= {this.text}></span>
        </div>
        </Host>
    
    )
}
}