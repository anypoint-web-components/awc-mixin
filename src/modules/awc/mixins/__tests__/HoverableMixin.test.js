// These tests are examples to get you started on how how to test
// Lightning Web Components using the Jest testing framework.
//
// See the LWC Recipes Open Source sample application for many other
// test scenarios and best practices.
//
// https://github.com/trailheadapps/lwc-recipes-oss

import './hoverable-element-native.js';
import { aTimeout } from './helper.js';

describe('HoverableMixin', () => {
    afterEach(() => {
      // The jsdom instance is shared across test cases in a single file so reset the DOM
      while (document.body.firstChild) {
          document.body.removeChild(document.body.firstChild);
      }
    });

    describe('Native element', () => {
      async function basicFixture() {
        const elm = document.createElement('hoverable-element-native');
        document.body.appendChild(elm);
        await aTimeout();
        return elm;
      }

      it('tests.', async () => {
          const element = await basicFixture();

          assert.ok(element);
      });
    });
});
