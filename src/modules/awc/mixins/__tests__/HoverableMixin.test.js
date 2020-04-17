import { createElement } from 'lwc';
import { assert } from 'chai';
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
        const input = document.createElement('input');
        element.appendChild(input);
        document.body.appendChild(element);
        await aTimeout();
        return element;
      }

      describe('Setters and getters', () => {
        it('Hovered if false by default', async () => {
          const element = await hoverableFixture();
          assert.isFalse(element.hovered);
        });

        it('hovered if false by default', async () => {
          const element = await hoverableFixture();
          assert.isFalse(element.hovered);
        });

        it('Dispatches hoveredchange event', async () => {
          const element = await hoverableFixture();
          // const spy = jest.spyOn(element, 'requestUpdate');
          const spy = jest.fn();
          element.addEventListener('hoveredchange', spy);
          element.hovered = true;
          assert.isTrue(spy.mock.calls[0][0].detail.value);
        });
      });

      describe('Entering hover state', () => {
        it('adds hover state when mouseover event detected', async () => {
          const element = await hoverableFixture();
          element.dispatchEvent(new CustomEvent('mouseover'));
          assert.isTrue(element.hovered);
        });

        it('adds hovered attribute', async () => {
          const element = await hoverableFixture();
          element.dispatchEvent(new CustomEvent('mouseover'));
          assert.isTrue(element.hasAttribute('hovered'));
        });
      });

      describe('Leaving hover state', () => {
        it('removes hover state when mouseleave event detected - LitElement', async () => {
          const element = await hoverableFixture();
          element.hovered = true;
          element.dispatchEvent(new CustomEvent('mouseleave'));
          assert.isFalse(element.hovered);
        });

        it('adds hovered attribute', async () => {
          const element = await hoverableFixture();
          element.hovered = true;
          element.dispatchEvent(new CustomEvent('mouseleave'));
          assert.isFalse(element.hasAttribute('hovered'));
        });

        it('handles light DOM mouseleave', async () => {
          const element = await hoverableChildFixture();
          element.hovered = true;
          const input = element.querySelector('input');
          input.dispatchEvent(new CustomEvent('mouseleave', {
            // mouseover event bubbles per spec
            bubbles: true,
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
    //       console.log();
    //       assert.ok(element);
    //   });
    // });
});
