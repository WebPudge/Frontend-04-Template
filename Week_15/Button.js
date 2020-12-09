import Yang, { Component } from './yang';

export { STATE, ATTRIBUTES } from './yang';

export default class Button extends Component {
  constructor() {
    super();
  }

  render() {
    this.childContainer = <span />;
    this.root = (<div>{this.childContainer}</div>).render();
    return this.root;
  }

  appendChild(child){
    if(!this.childContainer){
      this.render();
    }
    this.childContainer.appendChild(child);
  }
}
