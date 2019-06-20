export interface RoomsModel {
  name : string,
  peopleName : string,
  size: number,
  id : string,
}

export interface HostelsModel {
  id : number,
  name : string,
  director : string,
  stars: number,
  roomNumber : number,
  pool : boolean,
}
