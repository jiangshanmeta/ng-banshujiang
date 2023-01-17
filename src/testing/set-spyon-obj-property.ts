

export function setSpyonObjProperty<T,K extends keyof T>( obj: jasmine.SpyObj<T>,key: K,value: T[K] ){
    ( Object.getOwnPropertyDescriptor( obj, key )?.get as jasmine.Spy<() => T[K]  > ).and.returnValue( value )
}