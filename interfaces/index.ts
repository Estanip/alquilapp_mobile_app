import { ParamListBase, RouteProp } from '@react-navigation/native';

export interface INavigationParams {
    _id?: string;
    _password_reset?: string;
}
export interface IRoute extends RouteProp<ParamListBase> {
    params?: INavigationParams;
}
