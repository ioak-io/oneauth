export default interface AttributedefModel {
  _id?: string | null;
  name: string;
  group: string;
  reference: string;
  linkable: boolean;
  type: 'short-text' | 'long-text';
}
