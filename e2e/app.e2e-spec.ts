import { SivasagiPage } from './app.po';

describe('sivasagi App', () => {
  let page: SivasagiPage;

  beforeEach(() => {
    page = new SivasagiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
