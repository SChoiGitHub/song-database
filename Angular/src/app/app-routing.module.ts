import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSongFormComponent } from './edit-song-form/edit-song-form.component';
import { IndexComponent } from './index/index.component';
import { CreateSongFormComponent } from './create-song-form/create-song-form.component';

const routes: Routes = [
  { path: 'editSong/:id', component: EditSongFormComponent },
  { path: 'addSong', component: CreateSongFormComponent },
  { path: '', component: IndexComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
