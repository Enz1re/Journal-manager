import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    MatAutocompleteModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltipModule
} from "@angular/material";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        MatAutocompleteModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatDividerModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatMenuModule,
        MatSidenavModule, 
        MatToolbarModule, 
        MatExpansionModule,
        MatListModule,
        MatTabsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTooltipModule
    ]
})
export class AngularMaterialModule {

}