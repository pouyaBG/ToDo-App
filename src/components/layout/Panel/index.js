import React from "react"

import { Route, Routes, useNavigate } from "react-router-dom"

// pages
import Profile from "../../../view/panel/Profile/Profile";
import RenderTodos from "../../../view/panel/Todos/RenderTodos";
import RenderWorkSpase from "../../../view/panel/WorkSpase/RenderWorkSpase";

// layout
import PanelLayout from "../../common/Dashboard/Panel"

function Panel() {
    const redirect = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem('token') == null) {
            redirect('/');
        }
    }, []);

    return (
        <PanelLayout>
            <Routes>
                <Route path="todos" element={<RenderTodos />} />
                <Route path="workspase" element={<RenderWorkSpase />} />
                <Route path="profile" element={<Profile />} />
            </Routes>
        </PanelLayout>
    )
}

export default Panel;