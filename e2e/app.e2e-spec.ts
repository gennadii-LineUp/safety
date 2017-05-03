import { SafetyPage } from './app.po';

describe('safety App', () => {
  let page: SafetyPage;

  beforeEach(() => {
    page = new SafetyPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
