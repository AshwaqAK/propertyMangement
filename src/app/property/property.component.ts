import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {
  propertyForm!: FormGroup;
  submitted = false;
  properties: any = [];
  selectedProperty: any = [];
  id: number = 0;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.propertyForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      description: ['', Validators.required],
      size: ['', Validators.required]
    });
  }

  get name() {
    return this.propertyForm.get('name')!;
  }

  get description() {
    return this.propertyForm.get('description')!;
  }

  get size() {
    return this.propertyForm.get('size')!;
  }

  // save the property
  saveProperty() {
    if (this.propertyForm.invalid) {
      for (const control of Object.keys(this.propertyForm.controls)) {
        this.propertyForm.controls[control].markAsTouched();
      }
      return;
    }
    if (this.propertyForm.valid) {
      this.id = ++this.id
      this.propertyForm.patchValue({ id: this.id })
      this.properties.push(this.propertyForm.value);
      ($('#property') as any).modal('hide');
      this.propertyForm.reset()
    }
  }

  // delete the property
  deleteProperty(event: any, id: number) {
    if (event.target.checked && !this.selectedProperty.includes(id)) this.selectedProperty.push(id);
    if (!event.target.checked) {
      let index = this.selectedProperty.indexOf(id);
      this.selectedProperty.splice(index, 1)
    }
  }

  // confirm delete
  confirmDelete() {
    this.properties = this.properties.filter((x: any) => this.selectedProperty.indexOf(x.id) == -1);
    ($('#remove') as any).modal('hide');
  }

}
