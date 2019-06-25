export interface RoomsModel {
  name : string,
  peopleName : string,
  size: number,
  uid : string,
  created : any,
  parent : string
}

export interface HostelsModel {
  name : string,
  director : string,
  stars: number,
  roomNumber : number,
  pool : boolean,
  uid: string,
  created: any
}
