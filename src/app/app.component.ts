import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application component - serves as shell for routed components
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent {
  title = 'my-cv';
}
