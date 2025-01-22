import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'menu-global',
  imports: [RouterModule, MatToolbarModule, MatIconModule, MatButtonModule, MatCardModule],
  templateUrl: './menu-global.component.html',
  styleUrls: ['./menu-global.component.scss'],
})
export class MenuGlobalComponent {}
