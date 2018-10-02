import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div id="client-c">
      <div class="card">
        <div class="content">
          <a routerLink="page1">Flight Search</a> | <a routerLink="page2">Advanced</a>
        </div>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    #client-c { border: darkred dashed 5px; padding: 10px }
  `],
})
export class CoreComponent {
}
