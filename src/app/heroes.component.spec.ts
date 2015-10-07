import {bind, DebugElement, By} from 'angular2/angular2';
import {XHR} from 'angular2/src/core/compiler/xhr';
import {XHRImpl} from 'angular2/src/core/compiler/xhr_impl';
import {HeroService} from './hero.service';
import {AppComponent} from './app.component';
import {routerBindings, APP_BASE_HREF} from 'angular2/router';

import {
  beforeEach, xdescribe, describe, it, iit, xit, // Jasmine wrappers
  beforeEachBindings,
  RootTestComponent,
  TestComponentBuilder, inject, AsyncTestCompleter
} from 'angular2/test_lib';

import {HeroesComponent} from './heroes.component';

describe('HeroesComponent (with Angular)', () => {

  beforeEachBindings(() => {
    return [bind(XHR).toClass(XHRImpl),         //TODO: https://github.com/angular/angular/issues/4539
            HeroService,                        //TODO: this is here because the binding is defined in bootstrap.ts which is not loaded during testing
            routerBindings(AppComponent),       //TODO: mock out routing
            bind(APP_BASE_HREF).toValue('/')];  //TODO:     -||-
  });

  // Set up DI bindings required by component (and its nested components?)

  it('can be created and has userName', inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async: AsyncTestCompleter) => {

    tcb.createAsync(HeroesComponent)
        .then((rootTestComponent: RootTestComponent) => {
          rootTestComponent.detectChanges();
          expect(rootTestComponent.debugElement.nativeElement.textContent)
              .toMatch(/My Heroes/);
          async.done()
        }).then(null, function(e) { console.log(e); async.done();}); // TODO: this is super-lame, we need to print errors by default without tagging stuff onto promises
                                                                     // TODO: AsyncTestCompleter doesn't support fail() method in a way jasmine does via done.fail(e);
  }));
});

