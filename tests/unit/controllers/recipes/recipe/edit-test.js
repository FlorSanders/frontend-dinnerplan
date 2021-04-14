import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | recipes/recipe/edit', function(hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:recipes/recipe/edit');
    assert.ok(controller);
  });
});
