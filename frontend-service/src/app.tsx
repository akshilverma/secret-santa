import Register from "#src/pages/register.tsx";
import { Route, Routes } from "react-router";

import Button from "#src/components/ui/button.tsx";

import "./App.css";

function App() {
    return (
        <Routes>
            <Route
                index
                element={
                    <div>
                        Hello World, APP.
                        <Button>TEST</Button>
                    </div>
                }
            />
            <Route path="register" element={<Register />} />
        </Routes>
    );
}

export default App;
