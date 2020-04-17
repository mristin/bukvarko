import { render } from '@testing-library/react';
import * as React from 'react';
import { Provider } from 'react-redux';

import { Preferences } from '../../components/Preferences';
import * as i18n from '../../i18n';
import * as select from '../../select';
import * as storeFactory from '../../storeFactory';
import * as mockDependency from '../mockDependency';

function setUp() {
  const deps = mockDependency.initializeRegistry();
  const store = storeFactory.produce(deps);
  const selectWithDeps: select.WithDeps = new select.WithDeps(deps);

  const rendered = render(
    <Provider store={store}>
      <select.Context.Provider value={selectWithDeps}>
        <i18n.Context.Provider value={deps.translations}>
          <Preferences />
        </i18n.Context.Provider>
      </select.Context.Provider>
    </Provider>,
  );

  return { store, rendered };
}

it('renders without problems.', () => {
  setUp();
});

// Remark (Marko Ristin, 2020-04-11): I failed to write a more meaningful unit test. Testing against material UI seems
// like an uphill battle.
// See the following resources (none of which worked for me):
// https://stackoverflow.com/questions/59567234/materialui-react-testing-library-unit-test-select-menuitem-breaks-after-upgra
// https://www.polvara.me/posts/testing-a-custom-select-with-react-testing-library/
// https://github.com/testing-library/react-testing-library/issues/322#issuecomment-581650108
// https://dev.to/sama/testing-material-ui-form-components-1cnh
