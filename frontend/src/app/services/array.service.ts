import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Freelancer } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class ArrayService {
  constructor(private formBuilder: FormBuilder) {}

  // get the form array for easy access based on a dynamic path
  getFormArray(formGroup: FormGroup, arrayPath: string): FormArray {
    return formGroup.get(arrayPath) as FormArray;
  }

  // load existing items into the form array
  loadItems<T>(
    items: T[],
    formArray: FormArray,
    createItemFormGroup: (item: T) => FormGroup
  ): void {
    formArray.clear();
    items.forEach((item) => {
      formArray.push(createItemFormGroup(item));
    });
  }

  // create a new form group for any item
  createItemFormGroup<T extends object>(item: T): FormGroup {
    const group: { [key: string]: any } = {};
    Object.keys(item).forEach((key) => {
      group[key] = [item[key as keyof T]];
    });
    return this.formBuilder.group(group);
  }

  // add a new item to the form array
  addItem<T>(
    formArray: FormArray,
    newItem: T,
    createItemFormGroup: (item: T) => FormGroup
  ): void {
    formArray.push(createItemFormGroup(newItem));
  }

  // remove an item from the form array
  removeItem(formArray: FormArray, index: number): void {
    formArray.removeAt(index);
  }
}
