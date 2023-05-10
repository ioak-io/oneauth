import NoteModel from './NoteModel';

export default interface NotelinkDetailModel {
  _id: string;
  sourceNoteRef: string;
  linkedNoteRef: string;
  sourceNote: NoteModel;
  linkedNote: NoteModel;
}
