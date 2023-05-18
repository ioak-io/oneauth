export default interface NotelinkModel {
  _id: string;
  sourceNoteRef: string;
  linkedNoteRef: string;
  keywords?: string[];
}
