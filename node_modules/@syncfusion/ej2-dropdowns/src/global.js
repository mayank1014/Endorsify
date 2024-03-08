import * as index from './index';
index.DropDownList.Inject(index.VirtualScroll);
index.ComboBox.Inject(index.VirtualScroll);
index.AutoComplete.Inject(index.VirtualScroll);
index.MultiSelect.Inject(index.CheckBoxSelection);
index.ListBox.Inject(index.CheckBoxSelection);
export * from './index';
