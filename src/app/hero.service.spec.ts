import {HeroService} from './hero.service';

describe('HereService', () => {

  it('should pass', () => {
    expect(true).toBe(true);
  });


  it('should intentionally fail so that we see an error message, stack trace, etc', () => {
    expect(true).toBe(false);
  });


  it('should import HeroService', () => {
    expect(HeroService).not.toBeUndefined();
  });

});
