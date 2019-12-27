export default class Character {
  constructor(...{
    id,
    name = '',
    dynasty = ''
  }) {
    this.name = name
    this.dynasty = dynasty
  }
}