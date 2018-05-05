import React from 'react';
import { shallow } from 'enzyme';
import NoticeDialog from './';
import 'testConfig';

describe('NoticeDialog', () => {
  it('should render correctly', () => {
    shallow(
      <NoticeDialog
        open
        title="title"
        onClose={() => {}}
        text="text"
        onConfirm={() => {}}
      />
    );
  });
});
