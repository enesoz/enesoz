import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CursorEffectComponent } from './components/cursor-effect/cursor-effect.component';

/**
 * Root application component - serves as shell for routed components
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CursorEffectComponent],
  template: `
    <app-cursor-effect></app-cursor-effect>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'my-cv';
}
