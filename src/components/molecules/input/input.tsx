import { Component, h } from '@stencil/core';

@Component({
  tag: 'cb-input',
  styleUrl: 'input.scss',
  shadow: true,
})
export class Input {
  render() {      
    return (
        <div class="field">
            <input type="email" name="email" id="email" placeholder="jane.appleseed@example.com" />
            <label>Email</label>
        </div>
    );
  }
}