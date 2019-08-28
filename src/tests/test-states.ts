import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  Admin,
  App,
  Preferences,
  PreferencesToggleDark,
  Session,
  SessionEnd,
  ToDo,
  ToDoAdd,
  AdminSetSuperadmin,
} from './test-symbols';

/**
 * Test AdminState
 */
@State<Admin.State>({
  name: 'admin',
  defaults: {
    role: 'admin',
  },
})
export class AdminState {
  @Selector()
  static role({ role }: Admin.State): string {
    return role;
  }

  @Action(AdminSetSuperadmin)
  setSuperadmin({ getState, patchState }: StateContext<Admin.State>) {
    patchState({
      role: 'superadmin',
    });
  }
}

/**
 * Test ToDoState
 */
@State<ToDo.State>({
  name: 'todos',
  defaults: {
    list: [],
  },
})
export class ToDoState {
  @Selector()
  static list({ list }: ToDo.State): ToDo.Item[] {
    return list;
  }

  @Action(ToDoAdd)
  addNewTodo({ getState, setState }: StateContext<ToDo.State>, { payload }: ToDoAdd) {
    const state = getState();
    setState({
      list: [
        ...state.list,
        {
          description: payload,
          done: false,
        },
      ],
    });
  }
}

/**
 * Test PreferencesState
 */
@State<Preferences.State>({
  name: 'preferences',
  defaults: {
    darkmode: false,
    language: 'en',
  },
})
export class PreferencesState {
  @Action(PreferencesToggleDark)
  toggleDark({ getState, patchState }: StateContext<Preferences.State>) {
    patchState({
      darkmode: !getState().darkmode,
    });
  }
}

/**
 * Test SessionState
 */
@State<Session.State>({
  name: 'session',
})
export class SessionState {
  @Action(SessionEnd)
  updateLastSeen({ patchState }: StateContext<Session.State>, { payload }: SessionEnd) {
    patchState({
      lastseen: payload,
    });
  }
}

/**
 * Test AppState
 */
@State<App.State>({
  name: 'app',
  defaults: {
    status: 'ONLINE',
  },
  children: [PreferencesState, SessionState, ToDoState],
})
export class AppState {}
