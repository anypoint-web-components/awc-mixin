import { createElement } from 'lwc';
import { assert } from 'chai';
// import sinon from 'sinon';
import * as sinon from 'sinon/pkg/sinon-esm.js';
import { HoverableElementLwc } from './HoverableElementLwc.js';
import { aTimeout } from './helper.js';
// import './hoverable-element-native.js';

/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-commented-out-tests */

describe('HoverableMixin', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild);
      }
    });

    describe('LWC element', () => {
      async function hoverableFixture() {
        const element = createElement('hoverable-element-lwc', {
            is: HoverableElementLwc
        });
        document.body.appendChild(element);
        await aTimeout();
        return element;
      }

      async function hoverableChildFixture() {
        const element = createElement('hoverable-element-lwc', {
            is: HoverableElementLwc
        });
        document.body.appendChild(element);
        await aTimeout();
        return element;
      }

      describe('Setters and getters', () => {
        it('Hovered if false by default', async () => {
          const element = await hoverableFixture();
          assert.isFalse(element.hovered);
        });

        it('_hovered if false by default', async () => {
          const element = await hoverableFixture();
          assert.isFalse(element._hovered);
        });

        it('Calls requestUpdate() on LitElement', async () => {
          const element = await hoverableFixture();
          const spy = sinon.spy(element, 'requestUpdate');
          element._hovered = true;
          assert.isTrue(spy.called);
        });

        it('Ignores _hoverable setter when no change', async () => {
          const element = await hoverableFixture();
          element._hovered = true;
          const spy = sinon.spy(element, 'requestUpdate');
          element._hovered = true;
          assert.isFalse(spy.called);
        });

        it('Dispatches hovered-changed event', async () => {
          const element = await hoverableFixture();
          const spy = sinon.spy();
          element.addEventListener('hovered-changed', spy);
          element._hovered = true;
          assert.isTrue(spy.args[0][0].detail.value);
        });
      });

      describe('Entering hover state', () => {
        it('Adds hover state when mouseover event detected - LitElement', async () => {
          const element = await hoverableFixture();
          element.dispatchEvent(new CustomEvent('mouseover'));
          assert.isTrue(element.hovered);
        });

        it('Adds hovered attribute', async () => {
          const element = await hoverableFixture();
          element.dispatchEvent(new CustomEvent('mouseover'));
          assert.isTrue(element.hasAttribute('hovered'));
        });
      });

      describe('Leaving hover state', () => {
        it('Removes hover state when mouseleave event detected - LitElement', async () => {
          const element = await hoverableFixture();
          element._hovered = true;
          element.dispatchEvent(new CustomEvent('mouseleave'));
          assert.isFalse(element.hovered);
        });

        it('Adds hovered attribute', async () => {
          const element = await hoverableFixture();
          element._hovered = true;
          element.dispatchEvent(new CustomEvent('mouseleave'));
          assert.isFalse(element.hasAttribute('hovered'));
        });

        it('Handles light DOM mouseleave', async () => {
          const element = await hoverableChildFixture();
          element._hovered = true;
          const input = element.querySelector('input');
          input.dispatchEvent(new CustomEvent('mouseleave', {
            // mouseover event bubbles per spec
            bubbles: true
          }));
          assert.isFalse(element.hovered);
        });
      });
    });

    // describe('Native element', () => {
    //   async function basicFixture() {
    //     const elm = document.createElement('hoverable-element-native');
    //     document.body.appendChild(elm);
    //     await aTimeout();
    //     return elm;
    //   }
    //
    //   it('tests.', async () => {
    //       const element = await basicFixture();
    //
    //       assert.ok(element);
    //   });
    // });
});
