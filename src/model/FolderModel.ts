export default interface FolderModel {
  _id: string;
  name: string;
  parentId?: string | null;
}
