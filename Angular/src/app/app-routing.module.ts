import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditSongFormComponent } from './edit-song-form/edit-song-form.component';
import { IndexComponent } from './index/index.component';
import { CreateSongFormComponent } from './create-song-form/create-song-form.component';
import { EditTagComponent } from './edit-tag/edit-tag.component';

const routes: Routes = [
  { path: 'editSong/:id', component: EditSongFormComponent },
  { path: 'editTag/:id', component: EditTagComponent },
  { path: 'addSong', component: CreateSongFormComponent },
  { path: '', component: IndexComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
