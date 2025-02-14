import { Route, Routes } from "react-router";
import "./App.css";
import { Button } from "./components/ui/button";
import Register from "./pages/Register";

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
