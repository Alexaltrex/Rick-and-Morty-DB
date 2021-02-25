import {useDispatch, useSelector} from "react-redux";
import {NumberParam, useQueryParam} from "use-query-params";
import {useEffect} from "react";
import {StateType} from "../store/store";
import {sidebarAC} from "../store/sidebar-reducer";

const useCommonQueryParams = () => {
    const dispatch = useDispatch();
    const currentItem = useSelector((state: StateType) => state.sidebar.currentItem);
    const [sidebarItemQuery, setSidebarItemQuery] = useQueryParam('sidebarItem', NumberParam);

    // URL => STATE
    useEffect(() => {
        dispatch(sidebarAC.setCurrentSidebarMenuItem(sidebarItemQuery ? sidebarItemQuery : currentItem));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setSidebarItemQuery(currentItem !== 0 ? currentItem : undefined);
    }, [
        currentItem,
    ]);
}
export default useCommonQueryParams;