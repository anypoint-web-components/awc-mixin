import { LightningElement } from 'lwc';
import { HoverableMixin } from '../HoverableMixin.js';
import tpl from './HoverableElementLwc.html';

export class HoverableElementLwc extends HoverableMixin(LightningElement) {
  render() {
    return tpl;
  }
}
