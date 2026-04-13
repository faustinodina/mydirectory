

export type Note = {
  id: string;
  title: string;
  alias: string;
  description: string;
};

// export type AddEditNoteFormData = {
//   title: string;
//   alias: string;
//   description: string;
// };

export interface IAddEditNoteFormData {
  title: string;
  alias: string;
  description: string;
};
