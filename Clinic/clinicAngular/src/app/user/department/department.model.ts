export interface Department {
    id: number;
    depName: string;
}

export interface DepartmentComponentState {
    departments: Department[];
}

export enum DepartmentComponentAction {
    FETCH_DEPARTMENTS = '[Department Component] Fetch Departments',
    SET_DEPARTMENTS = '[Department Component] Set Departments',
    SAVE_DEPARTMENT = '[Department Component] Save Department',
    UPDATE_DEPARTMENT = '[Department Component] Update Department'
}

export enum DepartmentComponentUrl {
    FETCH_DEPARTMENTS = '/departments',
    SAVE_DEPARTMENT = '/departments',
    UPDATE_DEPARTMENT = '/departments'
}
