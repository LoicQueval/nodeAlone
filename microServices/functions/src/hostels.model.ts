export interface HostelsModel {
  name : string,
  director : string,
  stars: number,
  roomNumber : number,
  pool : boolean,
  uId: string,
  created: any
}

export interface RoomsModel {
  name : string,
  peopleName : string,
  size: number,
  uid : string,
  created : any,
}