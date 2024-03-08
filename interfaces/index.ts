import { ParamListBase, RouteProp } from '@react-navigation/native';

export interface INavigationParams {
    _id?: string;
}
export interface IRoute extends RouteProp<ParamListBase> {
    params?: INavigationParams;
}
