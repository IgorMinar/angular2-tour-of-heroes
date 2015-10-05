import {HeroService} from './hero.service';

describe('HereService', () => {

  it('should pass', () => {
    expect(true).toBe(true);
  });


  it('should fail', () => {
    expect(true).toBe(false);
  });


  it('should import HeroService', () => {
    expect(HeroService).not.toBeUndefined();
  });

});
