import { Outlet } from "react-router-dom";
import { RenderNavigation } from "../../components/Navigation";
import { RenderFooter } from "../../components/RenderFooter";

export function PublicLayout() {

    return(

        <>
            <RenderNavigation />
            <Outlet />
            <RenderFooter />
        </>
    )
}