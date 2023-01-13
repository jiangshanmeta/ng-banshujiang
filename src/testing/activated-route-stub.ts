import { convertToParamMap, ParamMap, Params } from '@angular/router'
import { ReplaySubject } from 'rxjs'

/**
 * An ActivateRoute test double with a `paramMap` observable.
 * Use the `setParamMap()` method to add the next `paramMap` value.
 */
export class ActivatedRouteStub {
    // Use a ReplaySubject to share previous values with subscribers
    // and pump new values into the `paramMap` observable
    private subject = new ReplaySubject<ParamMap>()

    readonly snapshot = {} as {
        paramMap: ParamMap
    }


    constructor(initialParams: Params = {}) {
        this.setParamMap(initialParams)
        // TODO better stub
        this.snapshot.paramMap = {
            get(name){
                return initialParams[name] || null
            },
            has(name){
                return name in initialParams
            },
            keys: Object.keys(initialParams),
            getAll(){
                return []
            }
        }
    }

    /** The mock paramMap observable */
    readonly paramMap = this.subject.asObservable()




    /** Set the paramMap observable's next value */
    setParamMap(params: Params = {}) {
        this.subject.next(convertToParamMap(params))
    }
}