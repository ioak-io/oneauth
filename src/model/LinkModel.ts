export default interface LinkModel {
  source: string;
  target: string;
  type: 'tag' | 'link' | 'auto-link'
}
