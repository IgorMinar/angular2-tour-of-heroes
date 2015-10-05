import {bind} from 'angular2/angular2';
import {XHR} from 'angular2/src/core/compiler/xhr';
import {XHRImpl} from 'angular2/src/core/compiler/xhr_impl';

import {
  beforeEach, xdescribe, describe, it, xit, // Jasmine wrappers
  beforeEachBindings, By, DebugElement,
  RootTestComponent,
  TestComponentBuilder, inject, AsyncTestCompleter
} from 'angular2/test';

import {HeroesComponent} from './heroes.component';

describe('HeroesComponent (with Angular)', () => {

  beforeEachBindings(() => {
    return bind(XHR).toClass(XHRImpl);
  });

  // Set up DI bindings required by component (and its nested components?)

  it('can be created and has userName', inject([TestComponentBuilder, AsyncTestCompleter], (tcb: TestComponentBuilder, async) => {

    tcb.createAsync(HeroesComponent)
        .then((rootTestComponent: RootTestComponent) => {
          console.log('component created')
          rootTestComponent.detectChanges();
          expect(rootTestComponent.debugElement.nativeElement)
              .toHaveText('Parent(Original Child(ChildChild Mock))');

        }).then(async.done, async.done.fail);
  }));
});

