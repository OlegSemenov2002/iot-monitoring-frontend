import { StateSchema } from 'app/providers/StoreProvider';
import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> =
    (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>;

    getState: () => StateSchema;

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

    api: jest.MockedFunctionDeep<AxiosStatic>;

    navigate: jest.MockedFn<any>;

    private _state: DeepPartial<StateSchema>;

    constructor(
        actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
        initialState: DeepPartial<StateSchema> = {},
    ) {
        this.actionCreator = actionCreator;
        this.dispatch = jest.fn();
        this._state = initialState;
        this.getState = jest.fn(() => this._state as StateSchema);
        this.api = mockedAxios;
        this.navigate = jest.fn();
    }

    setState(next: DeepPartial<StateSchema>) {
        this._state = next;
    }

    async callThunk(arg?: Arg) {
        const action = this.actionCreator(arg as Arg);
        return action(this.dispatch, this.getState, { api: this.api, navigate: this.navigate });
    }
}
